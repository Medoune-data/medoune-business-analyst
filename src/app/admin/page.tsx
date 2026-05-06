"use client";
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const defaultForm = {
  title: '', category: '', description: '', tech: '',
  status: 'Déployé', content: '', type: 'projet', coverUrl: '',
  analysisNote: '',
  studentName: '',
  courseTitle: "Excel pour l'Analyse de Données",
  issueDate: '',
  projectUrl: '',
  projectDescription: '',
  level: 'Avancé',
  mention: 'Bien',
  duration: '12 heures',
  price: 0,
  fileUrl: '',
  isPremium: false,
};

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(defaultForm);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== "hC63QjWj5tPoS979AUZwln4PVDu2") {
        router.push('/admin/login');
      } else {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const qProjects = query(collection(db, "projects"), orderBy("title", "asc"));
      const snapProjects = await getDocs(qProjects);
      const projects = snapProjects.docs.map(d => ({ id: d.id, ...d.data() }));

      const qCerts = query(collection(db, "certificates"), orderBy("studentName", "asc"));
      const snapCerts = await getDocs(qCerts);
      const certs = snapCerts.docs.map(d => ({ id: d.id, ...d.data(), type: 'certificat' }));

      const qProducts = query(collection(db, "products"), orderBy("title", "asc"));
      const snapProducts = await getDocs(qProducts);
      const products = snapProducts.docs.map(d => ({ id: d.id, ...d.data(), type: 'produit' }));

      setItems([...projects, ...certs, ...products]);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({ ...defaultForm, ...item });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const collectionName =
        form.type === 'certificat' ? "certificates" :
        form.type === 'produit' ? "products" : "projects";
      if (editingId) {
        await updateDoc(doc(db, collectionName, editingId), form);
        alert("Mise à jour réussie !");
      } else {
        await addDoc(collection(db, collectionName), form);
        alert(`${form.type} publié !`);
      }
      resetForm();
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id: string, type: string) => {
    if (confirm(`Supprimer ce ${type} ?`)) {
      let coll = "projects";
      if (type === 'certificat') coll = "certificates";
      if (type === 'produit') coll = "products";
      await deleteDoc(doc(db, coll, id));
      fetchData();
    }
  };

  // ─── GÉNÉRATION PDF ────────────────────────────────────────────────────────
  const handleGeneratePDF = async (item: any) => {
    setGeneratingId(item.id);
    try {
      // Import dynamique pour ne pas alourdir le bundle
      const { generateCertificatePDF } = await import('@/lib/generateCertificate');
      await generateCertificatePDF({
        id: item.id,
        studentName: item.studentName,
        courseTitle: item.courseTitle,
        issueDate: item.issueDate,
        duration: item.duration,
        level: item.level,
        mention: item.mention,
        projectDescription: item.projectDescription,
        projectUrl: item.projectUrl,
      });
    } catch (error) {
      console.error("Erreur génération PDF:", error);
      alert("Erreur lors de la génération du certificat. Vérifiez la console.");
    } finally {
      setGeneratingId(null);
    }
  };

  const f = (field: string, value: any) => setForm((prev: any) => ({ ...prev, [field]: value }));

  if (loading) return (
    <div className="min-h-screen bg-brand-midnight flex items-center justify-center text-white font-mono text-xs animate-pulse tracking-widest uppercase">
      Synchronisation...
    </div>
  );

  return (
    <main className="min-h-screen bg-brand-midnight pt-32 pb-20 px-6 lg:px-24 text-white">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif">
            Console <span className="italic text-gray-500">{editingId ? 'Modification' : 'Stratégique'}</span>
          </h1>
          <button
            onClick={() => signOut(auth)}
            className="text-[10px] text-red-500 border border-red-500/20 px-4 py-2 hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
          >
            Déconnexion
          </button>
        </div>

        {/* ─── FORMULAIRE ─────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 bg-white/5 p-8 border border-white/10 backdrop-blur-sm">

          <div className="md:col-span-2 flex gap-4 mb-4 p-1 bg-black/20 w-fit rounded">
            {['projet', 'analyse', 'certificat', 'produit'].map((t) => (
              <button
                key={t} type="button"
                onClick={() => f('type', t)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all ${form.type === t ? 'bg-white text-black font-bold' : 'text-gray-500'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CERTIFICAT */}
          {form.type === 'certificat' ? (
            <>
              <input placeholder="Nom de l'étudiant" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.studentName} onChange={e => f('studentName', e.target.value)} required />
              <select className="bg-black border-b border-white/20 p-2 outline-none focus:border-accent-primary text-white w-full cursor-pointer" value={form.courseTitle} onChange={e => f('courseTitle', e.target.value)} required>
                <option value="Excel pour l'Analyse de Données">Excel pour l'Analyse de Données</option>
                <option value="Maîtrise de SQL pour le Business">Maîtrise de SQL pour le Business</option>
                <option value="Data Science & Stratégie avec R">Data Science & Stratégie avec R</option>
              </select>
              <input placeholder="Date (ex: Mars 2026)" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.issueDate} onChange={e => f('issueDate', e.target.value)} required />
              <input placeholder="Durée (ex: 12 heures)" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.duration} onChange={e => f('duration', e.target.value)} />
              <select className="bg-black border-b border-white/20 p-2 outline-none focus:border-accent-primary text-white cursor-pointer" value={form.level} onChange={e => f('level', e.target.value)}>
                <option value="Fondamental">Niveau : Fondamental</option>
                <option value="Intermédiaire">Niveau : Intermédiaire</option>
                <option value="Avancé">Niveau : Avancé</option>
                <option value="Expert">Niveau : Expert</option>
              </select>
              <select className="bg-black border-b border-white/20 p-2 outline-none focus:border-accent-primary text-white cursor-pointer" value={form.mention} onChange={e => f('mention', e.target.value)}>
                <option value="Passable">Mention : Passable</option>
                <option value="Bien">Mention : Bien</option>
                <option value="Très Bien">Mention : Très Bien</option>
                <option value="Excellence">Mention : Excellence</option>
              </select>
              <input placeholder="Lien GitHub Projet (optionnel)" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary md:col-span-2" value={form.projectUrl} onChange={e => f('projectUrl', e.target.value)} />
              <textarea placeholder="Description du projet final..." className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary font-light min-h-[80px]" value={form.projectDescription} onChange={e => f('projectDescription', e.target.value)} />
            </>

          ) : form.type === 'produit' ? (
            <>
              <input placeholder="Titre du produit" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.title} onChange={e => f('title', e.target.value)} required />
              <input placeholder="Prix (FCFA)" type="number" value={form.price} onChange={e => f('price', Number(e.target.value))} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" />
              <input placeholder="Lien du fichier" value={form.fileUrl} onChange={e => f('fileUrl', e.target.value)} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" />
              <textarea placeholder="Description" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.description} onChange={e => f('description', e.target.value)} />
              <input placeholder="URL image de couverture" value={form.coverUrl} onChange={e => f('coverUrl', e.target.value)} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary md:col-span-2" />
              <textarea placeholder={"Sommaire / Aperçu du contenu (une ligne par point)\nEx:\n- Introduction à Power Query\n- Nettoyage des doublons"} value={form.content} onChange={e => f('content', e.target.value)} className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary font-light min-h-[120px]" />
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <input type="checkbox" checked={form.isPremium} onChange={e => f('isPremium', e.target.checked)} />
                Article Premium (WhatsApp)
              </label>
            </>

          ) : (
            <>
              <input placeholder="Titre" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.title} onChange={e => f('title', e.target.value)} required />
              <input placeholder="Catégorie" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.category} onChange={e => f('category', e.target.value)} required />
              <textarea placeholder="Accroche / Description courte" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.description} onChange={e => f('description', e.target.value)} required />
              <textarea placeholder="Contenu détaillé (Markdown)" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary min-h-[250px] font-light" value={form.content} onChange={e => f('content', e.target.value)} required />
              <input placeholder="URL de l'image de couverture" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.coverUrl} onChange={e => f('coverUrl', e.target.value)} />
              <input placeholder="Stack technique" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.tech} onChange={e => f('tech', e.target.value)} required />
              <select className="bg-brand-midnight border-b border-white/20 p-2 outline-none" value={form.status} onChange={e => f('status', e.target.value)}>
                <option value="Déployé">Statut: Publié</option>
                <option value="En cours">Statut: En cours</option>
                <option value="Beta">Statut: Brouillon</option>
              </select>
              <textarea placeholder="Note de l'analyste" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary italic text-sm" value={form.analysisNote} onChange={e => f('analysisNote', e.target.value)} />
            </>
          )}

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-primary hover:text-white transition-all">
              {editingId ? "Mettre à jour" : "Lancer la publication"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-8 border border-white/10 text-gray-500 text-[10px] uppercase tracking-widest">
                Annuler
              </button>
            )}
          </div>
        </form>

        {/* ─── LISTE DES ITEMS ────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-gray-500 uppercase tracking-widest text-[10px] mb-8 font-mono border-b border-white/10 pb-2">
            Archives de l'Empire
          </h2>

          {items.map(item => (
            <div
              key={item.id}
              className="bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
            >
              {/* Ligne principale */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <span className={`text-[7px] px-2 py-1 uppercase font-bold tracking-tighter flex-shrink-0 ${
                    item.type === 'certificat' ? 'bg-accent-primary text-white' :
                    item.type === 'produit' ? 'bg-green-700 text-green-100' :
                    item.type === 'analyse' ? 'bg-blue-900 text-blue-100' :
                    'bg-gray-700 text-gray-300'
                  }`}>{item.type}</span>
                  <div>
                    <h4 className="text-white text-sm font-medium">
                      {item.type === 'certificat' ? item.studentName : item.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                      {item.type === 'certificat'
                        ? `${item.courseTitle}${item.mention ? ` — ${item.mention}` : ''}`
                        : item.category}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  {/* Bouton Modifier */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[10px] uppercase text-accent-primary hover:text-white transition-colors tracking-widest"
                  >
                    Modifier
                  </button>

                  {/* Bouton Générer PDF — uniquement pour les certificats */}
                  {item.type === 'certificat' && (
                    <button
                      onClick={() => handleGeneratePDF(item)}
                      disabled={generatingId === item.id}
                      className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border px-4 py-2 transition-all ${
                        generatingId === item.id
                          ? 'border-white/10 text-gray-600 cursor-not-allowed'
                          : 'border-accent-primary/30 text-accent-primary hover:bg-accent-primary hover:text-white hover:border-accent-primary'
                      }`}
                    >
                      {generatingId === item.id ? (
                        <>
                          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          ↓ Certificat PDF
                        </>
                      )}
                    </button>
                  )}

                  {/* Bouton Supprimer */}
                  <button
                    onClick={() => handleDelete(item.id, item.type)}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 text-[10px] uppercase tracking-widest transition-all"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              {/* Détails certificat dépliés */}
              {item.type === 'certificat' && (
                <div className="border-t border-white/5 px-4 py-3 flex flex-wrap gap-6">
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 block mb-1">Date</span>
                    <span className="text-[10px] text-gray-400">{item.issueDate || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 block mb-1">Niveau</span>
                    <span className="text-[10px] text-gray-400">{item.level || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 block mb-1">Durée</span>
                    <span className="text-[10px] text-gray-400">{item.duration || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 block mb-1">Mention</span>
                    <span className={`text-[10px] font-bold ${
                      item.mention === 'Excellence' ? 'text-yellow-400' :
                      item.mention === 'Très Bien' ? 'text-emerald-400' :
                      item.mention === 'Bien' ? 'text-blue-400' : 'text-gray-400'
                    }`}>{item.mention || '—'}</span>
                  </div>
                  {item.projectUrl && (
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 block mb-1">GitHub</span>
                      <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-accent-primary hover:underline truncate max-w-[160px] block">
                        {item.projectUrl.replace('https://github.com/', '')}
                      </a>
                    </div>
                  )}
                  <div className="ml-auto">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gray-600 block mb-1">Lien vérification</span>
                    <a
                      href={`/verify/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-gray-500 hover:text-accent-primary transition-colors font-mono"
                    >
                      /verify/{item.id.slice(0, 12)}...
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
