import React from 'react';
import { motion } from 'motion/react';
import { Play, TrendingUp } from 'lucide-react';

export default function InventorySection({ fullSortedCatalog, isLoading, openVideo }: { fullSortedCatalog: any[], isLoading: boolean, openVideo: (track: any, e?: React.MouseEvent) => void }) {
  return (
    <section id="estrenos" className="py-24 md:py-40 px-4 md:px-6 max-w-[1800px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 ${isLoading ? 'bg-white' : 'bg-gold'} animate-pulse`} />
            <span className="font-black text-gold uppercase tracking-[0.4em] text-[10px]">
              {isLoading ? 'Syncing Network...' : 'Database Secured & Online'}
            </span>
          </div>
          <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic leading-none">
            Digital <br /> <span className="gold-text">Inventory</span>
          </h3>
        </div>
        <div className="max-w-sm text-left md:text-right">
          <p className="text-white/40 uppercase tracking-widest text-[10px] font-black mb-4">614 Protocol // Music Extraction</p>
          <p className="text-sm italic font-serif text-white/60">Cada pista es un activo digital único, forjado con la esencia de Chihuahua y el ritmo del 614.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Main Featured Asset */}
        {fullSortedCatalog.length > 0 && (
          <motion.div 
            whileHover={{ scale: 0.995 }}
            className="md:col-span-8 relative aspect-square md:aspect-auto md:h-[700px] overflow-hidden group cursor-pointer industrial-border bg-ranch-charcoal"
            onClick={(e) => openVideo(fullSortedCatalog[0], e)}
          >
            <img src={fullSortedCatalog[0].cover} alt={fullSortedCatalog[0].title} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
            
            <div className="absolute top-10 left-10 hidden md:block">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 font-black">
                <p className="text-[8px] text-gold tracking-[0.3em] uppercase mb-1">Asset ID</p>
                <p className="text-xl font-display text-white gold-shimmer">{fullSortedCatalog[0].assetId}</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex justify-between items-end">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-gold text-black px-3 py-1 text-[8px] font-black uppercase">ULTRA-HIGH FREQUENCY</span>
                  <span className="text-white/40 text-[8px] font-black">{(fullSortedCatalog[0] as any).year || '2026'} // MASTERED</span>
                </div>
                <h4 className="text-5xl md:text-8xl font-display uppercase italic leading-none text-glow">{fullSortedCatalog[0].title}</h4>
                <div className="flex gap-8 mt-6">
                  <div>
                    <p className="text-[8px] text-white/30 uppercase font-black">BPM</p>
                    <p className="text-xs font-black text-gold">145</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/30 uppercase font-black">Key</p>
                    <p className="text-xs font-black text-gold">G Minor</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-white/30 uppercase font-black">Duration</p>
                    <p className="text-xs font-black text-gold">{(fullSortedCatalog[0] as any).duration || '3:30'}</p>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-black flex items-center justify-center rounded-full group-hover:bg-gold transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <Play fill="black" size={32} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Side Grid Assets */}
        <div className="md:col-span-4 grid grid-cols-1 gap-6 md:gap-8">
          {fullSortedCatalog.slice(1, 4).map((track, i) => (
            <motion.div 
              key={track.title}
              whileHover={{ x: 10 }}
              className="relative h-[215px] overflow-hidden group cursor-pointer industrial-border bg-ranch-charcoal flex"
              onClick={() => openVideo(track)}
            >
              <div className="w-1/3 h-full overflow-hidden border-r border-white/10">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[8px] text-gold font-black uppercase tracking-widest">Asset {track.assetId}</span>
                    <Play size={12} className="text-white/20 group-hover:text-gold transition-colors" />
                  </div>
                  <h4 className="text-2xl font-display uppercase italic leading-tight group-hover:text-gold transition-colors">{track.title}</h4>
                  <p className="text-[10px] text-white/30 mt-1 uppercase font-black">{(track as any).year || (track as any).album || '2026'}</p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8px] font-black text-white/40 uppercase">Encrypted // {(track as any).duration || '3:30'}</span>
                  <button className="text-[8px] font-black text-gold uppercase hover:text-white transition-colors">ACCESS FILE</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Grid Assets */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {fullSortedCatalog.slice(4, 12).map((track, i) => (
            <motion.div 
              key={track.title}
              whileHover={{ y: -10 }}
              className="relative aspect-square overflow-hidden group cursor-pointer industrial-border bg-ranch-charcoal"
              onClick={() => openVideo(track)}
            >
              <img src={track.cover} alt={track.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 flex flex-col justify-end">
                <p className="text-[8px] text-gold font-black mb-1">TRACK // DATA // {track.assetId}</p>
                <h4 className="text-xl md:text-2xl font-display uppercase italic">{track.title}</h4>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                <div className="w-10 h-10 bg-gold text-black flex items-center justify-center rounded-full">
                  <Play fill="black" size={16} />
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Tech Specs / CTA */}
          <div className="md:col-span-3 glass-card p-8 md:p-12 border border-gold/30 flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="w-full md:w-1/2 space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="text-gold" size={24} />
                  <h4 className="text-3xl font-display uppercase italic gold-text leading-none">High-End Sound</h4>
                </div>
                <p className="text-white/40 text-xs md:text-sm italic font-serif">Experimenta la definición técnica total de cada producción 614.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 text-center">
                  <p className="text-[8px] text-white/40 font-black uppercase mb-1">Peak Level</p>
                  <p className="text-lg font-display text-gold">+3.2dB</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 text-center">
                  <p className="text-[8px] text-white/40 font-black uppercase mb-1">Bit Rate</p>
                  <p className="text-lg font-display text-gold">24-BIT</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <button 
                onClick={() => openVideo(fullSortedCatalog[0])}
                className="w-full py-5 bg-gold text-black hover:bg-white transition-all uppercase font-black tracking-widest text-[10px]"
              >
                LOAD ALL ASSETS
              </button>
              <button className="w-full py-5 border border-white hover:bg-white hover:text-black transition-all uppercase font-black tracking-widest text-[10px]">
                DOWNLOAD DATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
