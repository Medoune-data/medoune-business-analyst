"use client";
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [form, setForm] = useState({ 
  title: '', category: '', description: '', tech: '', 
  status: 'Déployé', content: '', type: 'projet', coverUrl: '', 
  analysisNote: '',
  studentName: '', courseTitle: "Excel pour l'Analyse de Données", issueDate: '', projectUrl: '',
  price: 0, fileUrl: '', isPremium: false // <--- AJOUTE CES 3 LIGNES
});
  
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
      const projects = snapProjects.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const qCerts = query(collection(db, "certificates"), orderBy("studentName", "asc"));
      const snapCerts = await getDocs(qCerts);
      const certs = snapCerts.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'certificat' }));


// --- AJOUTE CE BLOC ICI ---
      const qProducts = query(collection(db, "products"), orderBy("title", "asc"));
      const snapProducts = await getDocs(qProducts);
      const products = snapProducts.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'produit' }));

      setItems([...projects, ...certs, ...products]);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  // VERS LA LIGNE 56
const resetForm = () => {
  setForm({ 
    title: '', category: '', description: '', tech: '', 
    status: 'Déployé', content: '', coverUrl: '', type: 'projet',
    analysisNote: '', studentName: '', courseTitle: "Excel pour l'Analyse de Données", 
    issueDate: '', projectUrl: '',
    // AJOUTE CES 3 LIGNES ICI POUR CORRIGER L'ERREUR :
    price: 0, 
    fileUrl: '', 
    isPremium: false
  });
  setEditingId(null);
};

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({ ...form, ...item });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const collectionName = 
  form.type === 'certificat' ? "certificates" : 
  form.type === 'produit' ? "products" : "projects"; // <--- AJOUTE LA CONDITION PRODUIT
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
      // On choisit la bonne collection dans Firebase
      let coll = "projects"; 
      if (type === 'certificat') coll = "certificates";
      if (type === 'produit') coll = "products"; // <--- C'est cette ligne qui permet de gérer le Shop !
      
      await deleteDoc(doc(db, coll, id));
      fetchData(); // Rafraîchit la liste pour faire disparaître l'élément
    }
  };

  if (loading) return <div className="min-h-screen bg-brand-midnight flex items-center justify-center text-white font-mono text-xs animate-pulse tracking-widest uppercase">Synchronisation...</div>;

  return (
    <main className="min-h-screen bg-brand-midnight pt-32 pb-20 px-6 lg:px-24 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif">Console <span className="italic text-gray-500">{editingId ? 'Modification' : 'Stratégique'}</span></h1>
          <button onClick={() => signOut(auth)} className="text-[10px] text-red-500 border border-red-500/20 px-4 py-2 hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">Déconnexion</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 bg-white/5 p-8 border border-white/10 backdrop-blur-sm relative">
          
          {form.type === 'produit' && (
  <>
    <input placeholder="Prix" type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" />
    <input placeholder="Lien du fichier" value={form.fileUrl} onChange={e => setForm({...form, fileUrl: e.target.value})} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" />
    <label className="flex items-center gap-2 text-xs text-gray-500">
      <input type="checkbox" checked={form.isPremium} onChange={e => setForm({...form, isPremium: e.target.checked})} />
      Article Premium (WhatsApp)
    </label>
  </>
)}

<div className="md:col-span-2 flex gap-4 mb-4 p-1 bg-black/20 w-fit rounded">
            {['projet', 'analyse', 'certificat', 'produit'].map((t) => (
              <button key={t} type="button" onClick={() => setForm({...form, type: t as any})} className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all ${form.type === t ? 'bg-white text-black font-bold' : 'text-gray-500'}`}>{t}</button>
            ))}
          </div>

          {form.type === 'certificat' ? (
            <>
              <input placeholder="Nom de l'étudiant" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} required />
              <select 
  className="bg-black border-b border-white/20 p-2 outline-none focus:border-accent-primary text-white w-full cursor-pointer appearance-none" 
  value={form.courseTitle} 
  onChange={e => setForm({...form, courseTitle: e.target.value})} 
  required
>
  <option value="Excel pour l'Analyse de Données">Excel pour l'Analyse de Données</option>
  <option value="Maîtrise de SQL pour le Business">Maîtrise de SQL pour le Business</option>
  <option value="Data Science & Stratégie avec R">Data Science & Stratégie avec R</option>
</select>
              <input placeholder="Date (ex: Mars 2026)" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} required />
              <input placeholder="Lien GitHub Projet" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.projectUrl} onChange={e => setForm({...form, projectUrl: e.target.value})} />
            </>
          ) : (
            <>
              <input placeholder="Titre" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              <input placeholder="Catégorie" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
              <textarea placeholder="Accroche / Description courte" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              <textarea placeholder="Contenu détaillé (Markdown)" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary min-h-[250px] font-light" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
              <input placeholder="URL de l'image de couverture" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.coverUrl} onChange={e => setForm({...form, coverUrl: e.target.value})} />
              <input placeholder="Stack technique" className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})} required />
              <select className="bg-brand-midnight border-b border-white/20 p-2 outline-none" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option value="Déployé">Statut: Publié</option>
                <option value="En cours">Statut: En cours</option>
                <option value="Beta">Statut: Brouillon</option>
              </select>
              <textarea placeholder="Note de l'analyste" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 outline-none focus:border-accent-primary italic text-sm" value={form.analysisNote} onChange={e => setForm({...form, analysisNote: e.target.value})} />
            </>
          )}

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-primary hover:text-white transition-all">{editingId ? "Mettre à jour" : "Lancer la publication"}</button>
            {editingId && <button type="button" onClick={resetForm} className="px-8 border border-white/10 text-gray-500 text-[10px] uppercase tracking-widest">Annuler</button>}
          </div>
        </form>

        <div className="space-y-6">
          <h2 className="text-gray-500 uppercase tracking-widest text-[10px] mb-8 font-mono border-b border-white/10 pb-2">Archives de l'Empire</h2>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-4 hover:border-white/20 transition-all group">
              <div className="flex items-center gap-4">
                <span className={`text-[7px] px-2 py-1 uppercase font-bold tracking-tighter ${
  item.type === 'certificat' ? 'bg-accent-primary text-white' : 
  item.type === 'produit' ? 'bg-green-700 text-green-100' : // <--- AJOUTE CETTE LIGNE
  item.type === 'analyse' ? 'bg-blue-900 text-blue-100' : 'bg-gray-700 text-gray-300'
}`}>{item.type}</span>
                <div>
                  <h4 className="text-white text-sm font-medium">{item.type === 'certificat' ? item.studentName : item.title}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.type === 'certificat' ? item.courseTitle : item.category}</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <button onClick={() => handleEdit(item)} className="text-[10px] uppercase text-accent-primary hover:text-white transition-colors tracking-widest">Modifier</button>
                <button onClick={() => handleDelete(item.id, item.type)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 text-[10px] uppercase tracking-widest transition-all">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
