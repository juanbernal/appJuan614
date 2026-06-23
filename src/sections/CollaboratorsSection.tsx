import React from 'react';
import { motion } from 'motion/react';

export default function CollaboratorsSection({ collaborators }: { collaborators: any[] }) {
  if (collaborators.length === 0) return null;

  return (
    <section className="py-24 md:py-40 px-4 md:px-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 md:mb-24">
          <h3 className="font-display text-6xl md:text-9xl tracking-tighter uppercase italic leading-none">
            Colaboradores <br /> <span className="gold-text">Destacados</span>
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {collaborators.map((collab, idx) => (
            <motion.div
              key={collab.id}
              whileHover={{ scale: 1.05 }}
              className="group text-center"
            >
              <div className="w-full aspect-square overflow-hidden border-2 border-white/10 group-hover:border-gold transition-all mb-4">
                <img src={collab.image} alt={collab.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h4 className="font-display text-lg uppercase italic">{collab.name}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">{collab.genre}</p>
              {collab.socialLink && (
                <a href={collab.socialLink} target="_blank" rel="noopener noreferrer" className="text-[8px] text-gold uppercase tracking-widest hover:text-white transition-colors">
                  Ver perfil
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
