"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Navbar from '@/components/Navbar'; // Ton composant de menu

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("price", "asc"));
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAction = (item: any) => {
    if (item.price === 0) {
      // Téléchargement direct pour les gratuit
      window.open(item.fileUrl, '_blank');
    } else {
      // Tunnel WhatsApp pour les Premium (Sans RCCM)
      const message = `Bonjour Medoune, je souhaite acquérir le produit "${item.title}" (${item.price} FCFA). Voici ma capture de dépôt.`;
      window.location.href = `https://wa.me/225XXXXXXXX?text=${encodeURIComponent(message)}`;
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
    </main>
  );
}
