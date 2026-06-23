import React from 'react';
import { motion } from 'motion/react';

export default function TimelineSection({ featuredTracks }: { featuredTracks: any[] }) {
  return (
    <section className="py-24 md:py-40 px-4 md:px-6 bg-[#080808]">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 md:mb-24">
          <h3 className="font-display text-6xl md:text-9xl tracking-tighter uppercase italic leading-none">
            Línea de <br /> <span className="gold-text">Tiempo</span>
          </h3>
        </div>
        
        <div className="relative border-l-2 border-gold/30 pl-8 md:pl-16 space-y-16">
          {featuredTracks.slice(0, 5).map((track: any, idx: number) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-0 w-6 h-6 bg-gold border-4 border-black" />
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <img src={track.cover} alt={track.title} loading="lazy" className="w-full md:w-48 aspect-square object-cover border border-white/10" />
                <div>
                  <p className="text-gold font-black text-[10px] uppercase tracking-widest mb-2">
                    {new Date(track.releaseDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h4 className="text-3xl font-display uppercase italic mb-4">{track.title}</h4>
                  <p className="text-white/60">{track.album}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
