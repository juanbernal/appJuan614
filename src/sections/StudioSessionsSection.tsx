import React from 'react';
import { motion } from 'motion/react';

export default function StudioSessionsSection({ studioSessions }: { studioSessions: any[] }) {
  if (studioSessions.length === 0) return null;

  return (
    <section className="py-24 md:py-40 px-4 md:px-6 bg-ranch-charcoal">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 md:mb-24">
          <h3 className="font-display text-6xl md:text-9xl tracking-tighter uppercase italic leading-none">
            Studio <br /> <span className="gold-text">Sessions</span>
          </h3>
          <p className="text-white/40 uppercase tracking-widest text-[10px] font-black mt-4">Demos • Acústicos • Detrás de cámaras</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studioSessions.map((session, idx) => (
            <motion.div 
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden border border-white/10 hover:border-gold transition-all"
            >
              {session.cover && (
                <img src={session.cover} alt={session.title} loading="lazy" className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              )}
              <div className="p-6">
                <h4 className="text-2xl font-display uppercase italic mb-2">{session.title}</h4>
                <p className="text-white/60 text-sm mb-4">{session.description}</p>
                {session.videoUrl && (
                  <a 
                    href={session.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gold text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all"
                  >
                    Ver Sesión
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
