import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

export default function UpcomingSection({ artistData }: { artistData: any }) {
  return (
    <section id="upcoming" className="py-20 md:py-32 px-4 md:px-6 bg-ranch-charcoal">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-12 md:mb-20">
          <span className="font-gothic text-gold text-4xl md:text-5xl mb-2 block">Estrenos Próximos</span>
          <h3 className="font-display text-6xl md:text-9xl tracking-tighter uppercase italic leading-none">
            Lo Que <br /> <span className="gold-text">Viene</span>
          </h3>
        </div>

        {(artistData.upcoming.length > 0) ? (
          /* Group Upcoming by Artist */
          Object.entries(
            artistData.upcoming.reduce((acc: any, item: any) => {
              const artist = item.artist || 'Juan 614';
              if (!acc[artist]) acc[artist] = [];
              acc[artist].push(item);
              return acc;
            }, {})
          ).map(([artistName, tracks]: [string, any]) => (
            <div key={artistName} className="space-y-12">
              <div className="flex items-center gap-4 border-b border-gold/20 pb-4">
                 <div className="w-2 h-2 bg-gold" />
                 <h4 className="text-xl md:text-2xl font-black uppercase tracking-[0.4em] text-white/60">
                   Apartado: <span className="text-gold">{artistName}</span>
                 </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {tracks.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white/5 p-6 md:p-10 border border-white/10 hover:border-gold transition-all"
                  >
                    <div className="w-full md:w-1/2 aspect-square overflow-hidden border-2 border-white/10">
                      <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <Calendar size={16} className="text-gold" />
                        <span className="text-gold font-black uppercase tracking-widest text-[10px]">{item.displayDate || item.date}</span>
                        <div className="h-4 w-[1px] bg-white/10 mx-2" />
                        <CountdownTimer targetDate={item.date} />
                      </div>
                      <h4 className="text-3xl md:text-5xl font-display uppercase italic leading-none mb-4">{item.title}</h4>
                      <p className="text-white/40 uppercase tracking-widest text-xs mb-8">Artista: {item.artist}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full md:w-auto bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-gold transition-all text-center"
                      >
                        Pre-Save Now
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          /* Show sample data when no upcoming releases */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { title: "Lo Mejor Que Puedo Darte", date: "2026-05-15", cover: "https://i.ytimg.com/vi/YQmozpauppM/hqdefault.jpg" },
              { title: "Familia Pirata", date: "2026-06-01", cover: "https://i.ytimg.com/vi/Z0lMPVUYKnQ/hqdefault.jpg" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white/5 p-6 md:p-10 border border-white/10"
              >
                <div className="w-full md:w-1/2 aspect-square overflow-hidden border-2 border-white/10">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <Calendar size={16} className="text-gold" />
                    <span className="text-gold font-black uppercase tracking-widest text-[10px]">{item.date}</span>
                  </div>
                  <h4 className="text-3xl md:text-5xl font-display uppercase italic leading-none mb-4">{item.title}</h4>
                  <p className="text-white/40 uppercase tracking-widest text-xs mb-8">Próximamente</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
