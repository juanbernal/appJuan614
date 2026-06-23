import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calendar } from 'lucide-react';

export function MilestonesSection() {
  return (
    <section className="py-24 md:py-40 px-4 md:px-6 bg-ranch-black relative border-y border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <p className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4">Transmission History</p>
            <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic leading-none">
              Key <br /> <span className="gold-text">Milestones</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
          {[
            { year: "2023", title: "CÓDIGO 614", desc: "Forjando el sonido urbano regional en las calles de Chihuahua." },
            { year: "2024", title: "VIRAL IMPACT", desc: "Lanzamientos virales que capturaron la escena nacional." },
            { year: "2025", title: "DIOSMASGYM ERA", desc: "Alianza estratégica y profesionalización total de la marca." },
            { year: "2026", title: "GLOBAL HUB", desc: "Lanzamiento de plataforma oficial y expansión internacional." }
          ].map((milestone, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative p-8 md:p-12 border border-white/5 bg-black/40 group hover:bg-gold transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={64} />
              </div>
              <p className="font-display text-4xl md:text-6xl text-gold group-hover:text-black transition-colors mb-4">{milestone.year}</p>
              <h4 className="font-black text-xl md:text-2xl uppercase tracking-tighter mb-4 group-hover:text-black transition-colors">{milestone.title}</h4>
              <p className="text-white/40 text-xs md:text-sm italic font-serif group-hover:text-black/60 transition-colors">{milestone.desc}</p>
              <div className="mt-8 h-[2px] w-12 bg-gold group-hover:bg-black transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TourSection({ tour }: { tour: any[] }) {
  return (
    <section id="tour" className="py-24 md:py-40 px-4 md:px-6 bg-gold text-black overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="mb-16 md:mb-24">
          <p className="text-black/40 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Live Protocol</p>
          <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic leading-none">
            Tour <br /> <span className="text-white drop-shadow-lg">Dates</span>
          </h3>
        </div>
        <div className="space-y-4">
          {tour.map((show: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center p-8 border-4 border-black bg-white/10 hover:bg-black hover:text-white transition-all"
            >
              <div>
                <p className="font-display text-3xl md:text-5xl uppercase italic">{show.city}</p>
                <p className="font-black uppercase tracking-[0.3em] text-[10px] mt-2 opacity-40">{show.venue}</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <Calendar size={20} />
                <span className="font-black text-xl md:text-2xl">{show.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
