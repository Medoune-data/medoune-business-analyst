"use client";
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore'; // updateDoc ajouté
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NOUVEAU : On garde l'ID de l'élément qu'on est en train de modifier
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [form, setForm] = useState({ 
    title: '', 
    category: '', 
    description: '', 
    tech: '', 
    status: 'Déployé',
    content: '',
    type: 'projet',
    coverUrl: '' 
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
    const q = query(collection(db, "projects"), orderBy("title", "asc"));
    const querySnapshot = await getDocs(q);
    setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  // NOUVEAU : Fonction pour réinitialiser le formulaire proprement
  const resetForm = () => {
    setForm({ 
      title: '', category: '', description: '', tech: '', 
      status: 'Déployé', content: '', coverUrl: '', type: 'projet' 
    });
    setEditingId(null);
  };

  // NOUVEAU : Fonction pour charger les données d'un item dans le formulaire
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      tech: item.tech,
      status: item.status,
      content: item.content,
      type: item.type,
      coverUrl: item.coverUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // On remonte pour voir le formulaire
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // MODE MODIFICATION
        const docRef = doc(db, "projects", editingId);
        await updateDoc(docRef, form);
        alert("Mise à jour effectuée avec succès !");
      } else {
        // MODE CRÉATION (Original)
        await addDoc(collection(db, "projects"), form);
        alert(`${form.type === 'projet' ? 'Projet' : 'Analyse'} publié !`);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'opération:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Confirmer la suppression définitive ?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchData();
    }
  };

  if (loading) return <div className="min-h-screen bg-brand-midnight flex items-center justify-center text-white font-mono uppercase text-xs tracking-widest animate-pulse">Synchronisation...</div>;

  return (
    <main className="min-h-screen bg-brand-midnight pt-32 pb-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-white mb-2">
                Console <span className="italic text-gray-500">{editingId ? 'Modification' : 'Stratégique'}</span>
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono italic">
                {editingId ? "→ Vous modifiez un contenu existant" : "→ Prêt pour une nouvelle publication"}
            </p>
          </div>
          <button onClick={() => signOut(auth)} className="text-[10px] uppercase tracking-widest text-red-500 border border-red-500/20 px-4 py-2 hover:bg-red-500 hover:text-white transition-all">Déconnexion</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 bg-white/5 p-8 border border-white/10 backdrop-blur-sm relative">
          
          <div className="md:col-span-2 flex gap-4 mb-4 p-1 bg-black/20 w-fit rounded">
            <button type="button" onClick={() => setForm({...form, type: 'projet'})} className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all ${form.type === 'projet' ? 'bg-white text-black font-bold' : 'text-gray-500'}`}>Nouveau Projet</button>
            <button type="button" onClick={() => setForm({...form, type: 'analyse'})} className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all ${form.type === 'analyse' ? 'bg-white text-black font-bold' : 'text-gray-500'}`}>Nouvelle Analyse</button>
          </div>

          <input placeholder="Titre" className="bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-accent-primary" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input placeholder="Catégorie" className="bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-accent-primary" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
          
          <textarea placeholder="Accroche / Description courte" className="md:col-span-2 bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-accent-primary" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
          
          <textarea 
            placeholder="Contenu détaillé (Markdown)" 
            className="md:col-span-2 bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-accent-primary min-h-[250px] font-light" 
            value={form.content} 
            onChange={e => setForm({...form, content: e.target.value})} 
            required 
          />

          <input 
            placeholder="URL de l'image de couverture" 
            className="md:col-span-2 bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-accent-primary" 
            value={form.coverUrl} 
            onChange={e => setForm({...form, coverUrl: e.target.value})} 
          />

          <input placeholder="Stack technique" className="bg-transparent border-b border-white/20 p-2 text-white outline-none focus:border-accent-primary" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})} required />
          
          <select className="bg-brand-midnight border-b border-white/20 p-2 text-white outline-none" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="Déployé">Statut: Publié</option>
            <option value="En cours">Statut: En cours</option>
            <option value="Beta">Statut: Brouillon</option>
          </select>

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-primary hover:text-white transition-all">
                {editingId ? "Mettre à jour l'entrée" : "Lancer la publication"}
            </button>
            
            {editingId && (
                <button type="button" onClick={resetForm} className="px-8 border border-white/10 text-gray-500 hover:text-white text-[10px] uppercase tracking-widest transition-all">
                    Annuler
                </button>
            )}
          </div>
        </form>

        <div className="space-y-6">
          <h2 className="text-gray-500 uppercase tracking-widest text-[10px] mb-8 font-mono border-b border-white/10 pb-2">Archives de l'Empire</h2>
          <div className="grid grid-cols-1 gap-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-4 hover:border-white/20 transition-all group">
                <div className="flex items-center gap-4">
                  <span className={`text-[7px] px-2 py-1 uppercase font-bold tracking-tighter ${item.type === 'analyse' ? 'bg-accent-primary text-white' : 'bg-gray-700 text-gray-300'}`}>
                    {item.type}
                  </span>
                  <div>
                    <h4 className="text-white text-sm font-medium">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-center">
                    <button onClick={() => handleEdit(item)} className="text-[10px] uppercase tracking-widest text-accent-primary hover:text-white transition-colors">Modifier</button>
                    <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 text-[10px] uppercase tracking-widest transition-all">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
