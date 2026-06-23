import React from 'react';
import { motion } from 'motion/react';

export default function Navigation({ scrolled, artistData }: { scrolled: boolean, artistData: any }) {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden border border-gold/50">
            <img src={artistData.logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl tracking-tighter gold-text leading-none">JUAN 614</h1>
            <p className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-black gold-shimmer bg-clip-text">Official Hub</p>
          </div>
        </motion.div>
        
        <div className="hidden lg:flex gap-12 items-center text-[10px] uppercase tracking-[0.4em] font-black">
          {['Estrenos', 'Próximos', 'Albumes', 'Bio', 'Tour'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href={artistData.socials.spotify} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-10 py-4 hover:bg-gold transition-all border-none font-black"
          >
            STREAM NOW
          </a>
        </div>

        <div className="lg:hidden">
          <a href={artistData.socials.spotify} target="_blank" rel="noopener noreferrer" className="bg-gold text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest">
            STREAM
          </a>
        </div>
      </div>
    </nav>
  );
}
