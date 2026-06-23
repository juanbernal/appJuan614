import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, Minimize2, X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoUrl, playerMode, setPlayerMode }: { 
  isOpen: boolean, 
  onClose: () => void, 
  videoUrl: string,
  playerMode: 'full' | 'mini',
  setPlayerMode: (mode: 'full' | 'mini') => void
}) {
  if (!isOpen) return null;

  const isMini = playerMode === 'mini';

  return (
    <motion.div 
      initial={isMini ? { scale: 0.5, opacity: 0, x: 100, y: 100 } : { opacity: 0 }}
      animate={isMini ? { scale: 1, opacity: 1, x: 0, y: 0 } : { opacity: 1 }}
      exit={isMini ? { scale: 0.5, opacity: 0, x: 100, y: 100 } : { opacity: 0 }}
      className={isMini 
        ? "fixed bottom-24 right-4 md:bottom-32 md:right-10 z-[100] w-72 md:w-[400px] aspect-video bg-black border-2 border-gold shadow-2xl overflow-visible"
        : "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
      }
      onClick={isMini ? undefined : onClose}
    >
      <motion.div 
        layout
        initial={isMini ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={isMini 
          ? "relative w-full h-full"
          : "relative w-full max-w-6xl aspect-video bg-black border-4 border-gold shadow-[0_0_50px_rgba(212,175,55,0.3)]"
        }
        onClick={e => e.stopPropagation()}
      >
        <div className={`absolute ${isMini ? '-top-10 left-0 right-0' : '-top-12 right-0'} flex items-center justify-end gap-4`}>
          <button 
            onClick={() => setPlayerMode(isMini ? 'full' : 'mini')}
            className="text-white hover:text-gold transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
          >
            {isMini ? 'Expandir' : 'Minimizar'} 
            <span className="w-8 h-8 bg-gold text-black flex items-center justify-center">
              {isMini ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </span>
          </button>
          <button 
            onClick={onClose}
            className="text-white hover:text-gold transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
          >
            Cerrar <span className="w-8 h-8 bg-accent-red text-white flex items-center justify-center"><X size={16} /></span>
          </button>
        </div>
        <iframe 
          src={videoUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          allowFullScreen
          referrerPolicy="origin"
        />
      </motion.div>
    </motion.div>
  );
}
