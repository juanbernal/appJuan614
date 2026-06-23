import React from 'react';
import { motion } from 'motion/react';

export default function Visualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-10 px-4">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={isPlaying ? {
            height: [4, Math.random() * 32 + 4, 4],
            opacity: [0.5, 1, 0.5]
          } : { height: 4, opacity: 0.3 }}
          transition={isPlaying ? {
            duration: 0.4 + Math.random() * 0.4,
            repeat: Infinity,
            ease: "easeInOut"
          } : { duration: 0.5 }}
          className="w-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        />
      ))}
    </div>
  );
}
