"use client";
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const defaultForm = {
  title: '', category: '', description: '', tech: '',
  status: 'Déployé', content: '', type: 'projet', coverUrl: '',
  analysisNote: '',
  fileUrl: '', // PDF téléchargeable pour une analyse
};

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(defaultForm);
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

      setItems(projects);
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
      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), form);
        alert("Mise à jour réussie !");
      } else {
        await addDoc(collection(db, "projects"), { ...form, createdAt: serverTimestamp() });
        alert(`${form.type} publié !`);
      }
      resetForm();
      fetchData();
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id: string, type: string) => {
    if (confirm(`Supprimer ce ${type} ?`)) {
      await deleteDoc(doc(db, "projects", id));
      fetchData();
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
            {['projet', 'analyse'].map((t) => (
              <button
                key={t} type="button"
                onClick={() => f('type', t)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all ${form.type === t ? 'bg-white text-black font-bold' : 'text-gray-500'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <input placeholder="Titre" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.title} onChange={e => f('title', e.target.value)} required />
          <input placeholder="Catégorie" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.category} onChange={e => f('category', e.target.value)} required />
          <textarea placeholder="Accroche / Description courte" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.description} onChange={e => f('description', e.target.value)} required />
          <textarea placeholder="Contenu détaillé (Markdown)" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary min-h-[250px] font-light" value={form.content} onChange={e => f('content', e.target.value)} required />
          <input placeholder="URL de l'image de couverture" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.coverUrl} onChange={e => f('coverUrl', e.target.value)} />

          {form.type === 'projet' && (
            <input placeholder="Stack technique" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.tech} onChange={e => f('tech', e.target.value)} required />
          )}

          <select className="bg-brand-midnight border-b border-white/20 p-2 outline-none" value={form.status} onChange={e => f('status', e.target.value)}>
            <option value="Déployé">Statut: Publié</option>
            <option value="En cours">Statut: En cours</option>
            <option value="Beta">Statut: Brouillon</option>
          </select>

          {form.type === 'analyse' && (
            <>
              <textarea placeholder="Note de l'analyste" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary italic text-sm" value={form.analysisNote} onChange={e => f('analysisNote', e.target.value)} />
              <input placeholder="Lien du PDF téléchargeable (optionnel)" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.fileUrl} onChange={e => f('fileUrl', e.target.value)} />
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
                    item.type === 'analyse' ? 'bg-blue-900 text-blue-100' : 'bg-gray-700 text-gray-300'
                  }`}>{item.type}</span>
                  <div>
                    <h4 className="text-white text-sm font-medium">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
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

                  {/* Bouton Supprimer */}
                  <button
                    onClick={() => handleDelete(item.id, item.type)}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 text-[10px] uppercase tracking-widest transition-all"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
