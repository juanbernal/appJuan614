import React from 'react';
import { motion } from 'motion/react';

export default function BioSection({ artistData }: { artistData: any }) {
  return (
    <>
      {/* Featured Quote Section */}
      <section className="py-24 md:py-40 bg-white text-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
          <p className="text-[50vw] md:text-[30vw] font-display leading-none uppercase italic whitespace-nowrap -ml-20">JUAN 614 JUAN 614</p>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="font-gothic text-3xl md:text-4xl mb-6 md:mb-8 block">La Filosofía</span>
          <h2 className="text-4xl md:text-8xl font-display uppercase italic leading-[0.9] tracking-tighter mb-10 md:mb-12">
            "Muerde como <span className="text-gold drop-shadow-sm">serpiente</span>. La cara de pera. Corazones rotos dolidos."
          </h2>
          <div className="w-16 md:w-20 h-1 bg-black mx-auto" />
        </div>
      </section>

      {/* Biography Section */}
      <section id="bio" className="py-24 md:py-40 px-4 md:px-6 bg-black relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-gold" />
              <span className="font-black text-gold uppercase tracking-[0.5em] text-xs">Origin Story</span>
            </div>
            <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic leading-none mb-12">
              Juan <span className="gold-text">614</span>
            </h3>
            <div className="space-y-8 text-white/60 text-lg md:text-xl font-serif italic leading-relaxed border-l border-white/10 pl-8">
              <p>
                Originario de Chihuahua, México (código 614), Juan ha irrumpido en los Corridos Tumbados con una propuesta que fusiona la crudeza urbana con una introspección espiritual profunda.
              </p>
              <p>
                "Muerde como serpiente" y "La cara de pera" son más que frases; son el manifiesto de un artista que redefine el regional mexicano bajo el sello <span className="text-gold">Diosmasgym Records</span>.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-12">
              <div className="industrial-border p-6 bg-white/5">
                <p className="text-gold font-display text-5xl mb-1">614</p>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-40">Local Protocol</p>
              </div>
              <div className="industrial-border p-6 bg-white/5">
                <p className="text-gold font-display text-5xl mb-1">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-40">Authentic Data</p>
              </div>
            </div>
          </motion.div>
          <div className="relative industrial-border p-4 bg-white/5 backdrop-blur-xl">
            <img src={artistData.logo} alt="Juan 614 Bio" className="w-full aspect-[4/5] object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-1000" />
            <div className="absolute -bottom-6 -right-6 bg-gold text-black p-4 font-black text-xs uppercase tracking-widest rotate-3 shadow-xl">
              Verified Artist // 614-SEC
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
