import React from 'react';
import { motion } from 'motion/react';
import { Play, Music2, Youtube } from 'lucide-react';

export default function HeroSection({ heroTrack, artistData, openVideo }: { heroTrack: any, artistData: any, openVideo: (track: any) => void }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-ranch-black via-ranch-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2 }}
          src={heroTrack?.cover || artistData.logo} 
          alt="Juan 614 Hero"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-end justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-gold" />
            <span className="font-black text-gold uppercase tracking-[0.5em] text-xs">Featured Single</span>
          </div>
          <h2 className="font-display text-[15vw] md:text-[12vw] leading-[0.8] mb-8 tracking-tighter uppercase italic gold-text text-glow">
            {heroTrack?.title || artistData.name}
          </h2>
          <div className="flex flex-wrap gap-6 items-center">
            <button 
              onClick={() => heroTrack && openVideo(heroTrack)}
              className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all hover:bg-gold"
            >
              <div className="relative z-10 flex items-center gap-4">
                <Play fill="black" size={20} /> REPRODUCIR AHORA
              </div>
            </button>
            <div className="flex gap-4">
              <a href={artistData.socials.spotify} target="_blank" rel="noopener noreferrer" className="w-16 h-16 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all backdrop-blur-md bg-white/5">
                <Music2 size={24} />
              </a>
              <a href={artistData.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-16 h-16 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all backdrop-blur-md bg-white/5">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="hidden lg:block w-1/3 aspect-square industrial-border p-4 bg-white/5 backdrop-blur-xl"
        >
          <img src={heroTrack?.cover || artistData.logo} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" />
          <div className="absolute top-8 right-8 bg-gold text-black p-3 font-black text-[10px] uppercase tracking-tighter rotate-12">
            DISPONIBLE <br /> {heroTrack?.releaseDate && new Date(heroTrack.releaseDate) > new Date() ? 'PRÓXIMAMENTE' : 'AHORA'}
          </div>
        </motion.div>
      </div>

      {/* Vertical Text */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="text-[10px] uppercase tracking-[1em] font-black text-white/20 rotate-180 [writing-mode:vertical-lr]">
          TEMPORADA 2026 • 614 RECORDS
        </p>
      </div>
    </section>
  );
}
