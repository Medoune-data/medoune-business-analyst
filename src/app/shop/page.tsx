"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/Navbar'; // Ton composant de menu

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("price", "asc"));
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Produits récupérés :", productsData); // Pour vérifier dans la console F12
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setLoading(false); // Arrête le chargement quoi qu'il arrive
      }
    };
    fetchProducts();
  }, []);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = (item: any) => {
    if (item.price === 0) {
      setSelectedProduct(item);
      setShowLeadModal(true);
    } else {
      const message = `Bonjour Medoune, je souhaite acquérir le produit "${item.title}" (${item.price} FCFA). Voici ma capture de dépôt.`;
      window.location.href = `https://wa.me/2250564094530?text=${encodeURIComponent(message)}`;
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "leads_shop"), {
        ...leadForm,
        productTitle: selectedProduct.title,
        timestamp: serverTimestamp()
      });
      window.open(selectedProduct.fileUrl, '_blank');
      setShowLeadModal(false);
      setLeadForm({ name: '', whatsapp: '', email: '' });
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-brand-midnight flex items-center justify-center text-white animate-pulse">CHARGEMENT DE LA BOUTIQUE...</div>;

  return (
    <main className="min-h-screen bg-brand-midnight text-white">
      <Navbar />
      
      <header className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl font-serif mb-4">Bibliothèque & <span className="italic text-accent-primary">Solutions</span></h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm uppercase tracking-widest">
          Ressources stratégiques pour Business Analysts et Managers.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((item) => (
            <div key={item.id} className="group relative bg-white/[0.02] border border-white/10 p-6 hover:border-accent-primary transition-all">
              {/* Badge Prix */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {item.price === 0 ? "Gratuit" : `${item.price} FCFA`}
              </div>

              {/* Cover Image Placeholder */}
              <div className="aspect-[3/4] bg-gray-800 mb-6 overflow-hidden border border-white/5">
                <img src={item.coverUrl || "/api/placeholder/400/600"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-accent-primary mb-2 block">{item.category}</span>
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-6 font-light line-clamp-3">{item.description}</p>

              <button 
                onClick={() => handleAction(item)}
                className="w-full py-4 border border-white/20 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all"
              >
                {item.price === 0 ? "Télécharger" : "Acquérir via Mobile Money"}
              </button>
            </div>
          ))}
        </div>
      </section>
   
{/* MODAL DE CAPTURE DE LEAD */}
      {showLeadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowLeadModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">✕</button>
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 border border-accent-primary/30 text-accent-primary text-[8px] uppercase tracking-[0.3em] font-bold mb-4">Accès Privilégié</div>
              <h3 className="text-2xl font-serif italic text-white mb-2">Dernière étape...</h3>
              <p className="text-gray-500 text-sm font-light">Laisse tes infos pour recevoir ton fichier gratuit.</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input type="text" placeholder="Nom Complet" required className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-accent-primary" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} />
              <input type="text" placeholder="WhatsApp" required className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-accent-primary" value={leadForm.whatsapp} onChange={e => setLeadForm({...leadForm, whatsapp: e.target.value})} />
              <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm outline-none focus:border-accent-primary" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} />
              <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-accent-primary hover:text-white transition-all">
                {isSubmitting ? "Chargement..." : "Télécharger maintenant"}
              </button>
            </form>
          </div>
        </div>
      )}

 </main>
  );
}
