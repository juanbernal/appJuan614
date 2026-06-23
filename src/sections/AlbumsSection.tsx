import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function AlbumsSection({ randomizedAlbums, openVideo }: { randomizedAlbums: any[], openVideo: (album: any) => void }) {
  return (
    <section id="albumes" className="py-24 md:py-40 px-4 md:px-6 bg-[#080808] relative">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic text-glow">Discografía</h3>
          <div className="text-left md:text-right">
            <p className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4">Total Assets Decrypted</p>
            <p className="text-4xl md:text-5xl font-display gold-text">+5.2 BILLONES</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {randomizedAlbums.map((album, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -15 }}
              className="relative aspect-square overflow-hidden group cursor-pointer border border-white/10"
              onClick={() => openVideo(album)}
            >
              <img 
                src={album.cover} 
                alt={album.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Inventory Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-gold text-black flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                    <Play fill="black" size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gold font-black uppercase tracking-widest">{album.year}</p>
                    <p className="text-2xl font-display text-white italic">#{(idx + 1).toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <div className="industrial-border p-4 bg-black/40 backdrop-blur-sm">
                  <h4 className="text-2xl md:text-3xl font-display uppercase italic leading-none">{album.title}</h4>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity">
                 <div className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                    <p className="text-[8px] font-black text-gold uppercase tracking-[0.2em]">{album.title}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
