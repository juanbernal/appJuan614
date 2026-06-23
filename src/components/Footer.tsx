import React from 'react';

export default function Footer({ CATALOG_URL, UPCOMING_URL }: { CATALOG_URL: string | undefined, UPCOMING_URL: string | undefined }) {
  return (
    <footer className="bg-black py-20 md:py-32 px-4 md:px-6 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-20 md:mb-32">
          <div className="lg:col-span-2">
            <h4 className="font-display text-6xl md:text-8xl gold-text mb-6 md:mb-8">614</h4>
            <p className="text-white/40 text-lg md:text-xl font-serif italic max-w-md">
              "Muerde como serpiente. La cara de pera. Corazones rotos dolidos."
            </p>
          </div>
          <div>
            <h5 className="text-gold font-black uppercase tracking-widest text-[10px] mb-6 md:mb-8">Navegación</h5>
            <ul className="space-y-3 md:space-y-4 text-xs uppercase tracking-widest font-bold">
              <li><a href="#" className="hover:text-gold transition-colors">Inicio</a></li>
              <li><a href="#albums" className="hover:text-gold transition-colors">Álbumes</a></li>
              <li><a href="#tour" className="hover:text-gold transition-colors">Gira</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Galería</a></li>
              <li><a href="#bio" className="hover:text-gold transition-colors">Biografía</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-gold font-black uppercase tracking-widest text-[10px] mb-6 md:mb-8">Debug</h5>
            <p className="text-[6px] text-white/20 uppercase tracking-widest">
              Cat: {CATALOG_URL ? 'Linked' : 'Missing'} <br />
              Upc: {UPCOMING_URL ? 'Linked' : 'Missing'} <br />
              Cache: v6
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8 text-center md:text-left">
          <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-white/20">
            © 2026 DIOSMASGYM RECORDS • PRODUCIDO POR EL EQUIPO 614
          </p>
          <div className="flex gap-8 md:gap-12 text-[8px] md:text-[10px] uppercase tracking-widest font-black text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
