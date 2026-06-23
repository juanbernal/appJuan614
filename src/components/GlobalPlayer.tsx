import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Heart, Share2 } from 'lucide-react';
import Visualizer from './Visualizer';

export default function GlobalPlayer({ currentTrack, isPlaying, onTogglePlay }: { currentTrack: any, isPlaying: boolean, onTogglePlay: () => void }) {
  if (!currentTrack) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full z-[80] bg-black/95 backdrop-blur-2xl border-t border-gold/30"
    >
      {/* Visualizer Top Bar */}
      <div className="absolute -top-10 left-0 w-full flex justify-center pointer-events-none">
        <Visualizer isPlaying={isPlaying} />
      </div>

      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-6 p-4 md:p-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden industrial-border">
            <img src={currentTrack?.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop'} alt={currentTrack?.title} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="font-display text-lg md:text-xl uppercase italic gold-text truncate">{currentTrack?.title}</h4>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-black">Juan 614 • {currentTrack?.album}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={onTogglePlay}
            className="w-12 h-12 md:w-16 md:h-16 bg-gold text-black flex items-center justify-center rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="ml-1" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <div className="flex flex-col items-end">
            <div className="flex gap-4 text-white/40">
              <Heart className="hover:text-accent-red cursor-pointer transition-colors" size={20} />
              <Share2 className="hover:text-gold cursor-pointer transition-colors" size={20} />
            </div>
            <p className="text-[8px] uppercase tracking-widest mt-2 font-black text-gold/50">Reproduciendo desde 614 HUB</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
