"use client";
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/Navbar';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [leadForm, setLeadForm] = useState({ name: '', whatsapp: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("price", "asc"));
        const snapshot = await getDocs(q);
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAction = (item: any) => {
    if (item.price === 0) {
      setSelectedProduct(item);
      setShowLeadModal(true);
    } else {
      const message = `Bonjour Medoune, je souhaite acquérir "${item.title}" (${item.price} FCFA). Voici ma capture de dépôt.`;
      window.open(`https://wa.me/2250564094530?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handlePreview = (item: any) => {
    setSelectedProduct(item);
    setShowPreviewModal(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "leads_shop"), {
        ...leadForm,
        productTitle: selectedProduct.title,
        timestamp: serverTimestamp(),
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

  if (loading) return (
    <div className="min-h-screen bg-brand-midnight flex flex-col items-center justify-center gap-4">
      <div className="w-5 h-5 border border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">
        Chargement de la bibliothèque...
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-brand-midnight text-white">
      <Navbar />

      {/* ─── HEADER ─────────────────────────────────────────────────────── */}
      <header className="pt-32 pb-16 px-6 text-center border-b border-white/5">
        <p className="text-accent-primary font-mono uppercase tracking-[0.3em] text-[10px] mb-4">
          // Ressources Stratégiques
        </p>
        <h1 className="text-5xl font-serif mb-4">
          Bibliothèque & <span className="italic text-accent-primary">Solutions</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm font-light leading-relaxed">
          Outils, guides et templates conçus pour Business Analysts, Managers et Entrepreneurs.
          Téléchargement immédiat après paiement.
        </p>
      </header>

      {/* ─── GRILLE PRODUITS ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
              Aucun produit disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-accent-primary/40 transition-all duration-300 flex flex-col"
              >
                {/* Badge prix */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border backdrop-blur-md ${
                    item.price === 0
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                      : 'border-accent-primary/40 text-accent-primary bg-black/60'
                  }`}>
                    {item.price === 0 ? "Gratuit" : `${item.price.toLocaleString()} FCFA`}
                  </span>
                </div>

                {/* Premium badge */}
                {item.isPremium && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border border-yellow-500/40 text-yellow-400 bg-yellow-500/10 backdrop-blur-md">
                      Premium
                    </span>
                  </div>
                )}

                {/* Cover */}
                <div className="aspect-[3/2] bg-gradient-to-br from-white/5 to-white/[0.01] border-b border-white/5 overflow-hidden relative">
                  {item.coverUrl ? (
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl opacity-20">📄</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/60 to-transparent" />
                </div>

                {/* Contenu */}
                <div className="p-8 flex flex-col flex-1">
                  {item.category && (
                    <span className="text-[9px] uppercase tracking-[0.3em] text-accent-primary mb-3 block font-mono font-bold">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-xl font-medium mb-3 text-white leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed line-clamp-2 flex-1">
                    {item.description}
                  </p>

                  {/* Preview du contenu — si description détaillée disponible */}
                  {item.content && (
                    <button
                      onClick={() => handlePreview(item)}
                      className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-accent-primary transition-colors mb-6 text-left flex items-center gap-2"
                    >
                      <span>▸</span> Voir ce que contient ce guide
                    </button>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => handleAction(item)}
                    className={`w-full py-4 text-[10px] uppercase font-bold tracking-widest transition-all rounded-lg ${
                      item.price === 0
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                        : 'bg-white text-black hover:bg-accent-primary hover:text-white'
                    }`}
                  >
                    {item.price === 0
                      ? "↓ Télécharger gratuitement"
                      : item.isPremium
                        ? "Acquérir via WhatsApp →"
                        : "Acquérir via Mobile Money →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── BANNIÈRE RASSURANTE ────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { icon: "⚡", title: "Accès Immédiat", desc: "Téléchargement disponible dès confirmation du paiement." },
            { icon: "🔒", title: "Paiement Sécurisé", desc: "Mobile Money (MTN / Orange / Wave) ou via WhatsApp." },
            { icon: "♾️", title: "Accès à Vie", desc: "Téléchargez vos ressources autant de fois que nécessaire." },
          ].map((g, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-2xl">{g.icon}</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">{g.title}</h4>
              <p className="text-xs text-gray-600 font-light leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MODAL LEAD (téléchargement gratuit) ──────────────────────── */}
      {showLeadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white text-lg"
            >
              ✕
            </button>
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 border border-accent-primary/30 text-accent-primary text-[8px] uppercase tracking-[0.3em] font-bold mb-4">
                Accès Privilégié
              </div>
              <h3 className="text-2xl font-serif italic text-white mb-2">Dernière étape...</h3>
              <p className="text-gray-500 text-sm font-light">
                Laisse tes infos pour recevoir{' '}
                <strong className="text-white">{selectedProduct?.title}</strong> gratuitement.
              </p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input
                type="text" placeholder="Nom Complet" required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-accent-primary transition-colors"
                value={leadForm.name}
                onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
              />
              <input
                type="text" placeholder="WhatsApp (avec indicatif)" required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-accent-primary transition-colors"
                value={leadForm.whatsapp}
                onChange={e => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
              />
              <input
                type="email" placeholder="Email"required
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-accent-primary transition-colors"
                value={leadForm.email}
                onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-[10px] hover:bg-accent-primary hover:text-white transition-all rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? "Chargement..." : "Télécharger maintenant →"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL PREVIEW (aperçu du contenu) ───────────────────────── */}
      {showPreviewModal && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white text-lg"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="text-[9px] font-mono uppercase tracking-widest text-accent-primary mb-2 block">
                Aperçu du contenu
              </span>
              <h3 className="text-2xl font-serif italic text-white">{selectedProduct.title}</h3>
            </div>

            {/* Contenu du guide — affiché comme liste de points */}
            <div className="space-y-3 mb-8">
              {selectedProduct.content?.split('\n').filter(Boolean).map((line: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-accent-primary text-xs mt-0.5 flex-shrink-0">▸</span>
                  <p className="text-gray-400 text-sm font-light leading-snug">{line.replace(/^[-*#]+\s?/, '')}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setShowPreviewModal(false); handleAction(selectedProduct); }}
              className={`w-full py-4 text-[10px] uppercase font-bold tracking-widest transition-all rounded-lg ${
                selectedProduct.price === 0
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                  : 'bg-white text-black hover:bg-accent-primary hover:text-white'
              }`}
            >
              {selectedProduct.price === 0 ? "↓ Télécharger gratuitement" : `Acquérir — ${selectedProduct.price?.toLocaleString()} FCFA →`}
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
