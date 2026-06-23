import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Playera 614 Logo",
    price: "$500 MXN",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    category: "Apparel"
  },
  {
    id: 2,
    name: "Gorra Industrial Gold",
    price: "$450 MXN",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
    category: "Accesorios"
  },
  {
    id: 3,
    name: "Sudadera Tour 2026",
    price: "$950 MXN",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    category: "Apparel"
  }
];

export default function Store() {
  return (
    <section className="py-24 px-6 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <ShoppingBag className="text-gold" size={32} />
              <h2 className="text-4xl md:text-6xl font-display uppercase italic text-white">
                Merch <span className="text-gold">Oficial</span>
              </h2>
            </div>
            <p className="text-white/50 uppercase tracking-[0.2em] font-black text-sm">
              Colección exclusiva de temporada
            </p>
          </div>
          <button className="text-gold hover:text-white transition-colors flex items-center gap-2 uppercase font-black tracking-widest text-xs">
            Ver Toda La Tienda <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-6 overflow-hidden border-2 border-white/10 group-hover:border-gold/50 transition-colors bg-white/5">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-gold/30 px-4 py-2">
                  <span className="text-gold font-display text-sm">{product.price}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-display uppercase tracking-widest text-lg group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/40 text-xs uppercase font-black tracking-wider mt-1">
                    {product.category}
                  </p>
                </div>
                <button className="w-10 h-10 border border-white/20 flex items-center justify-center text-white group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all">
                  +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
