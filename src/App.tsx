/// <reference types="vite/client" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Instagram, 
  Youtube, 
  Music2, 
  ExternalLink, 
  ChevronRight, 
  Disc, 
  TrendingUp,
  Calendar,
  Users,
  Volume2,
  Share2,
  Heart
} from 'lucide-react';

// Artist Data
// Initial data for hydration and fallbacks
const INITIAL_ARTIST = {
  name: "JUAN 614",
  genre: "CORRIDOS TUMBADOS • URBANO",
  bio: "La cara de pera. Lengua larga. Ya basta. Muerde como serpiente. Corazones rotos dolidos. Juan 614 es la nueva voz de las calles, trayendo una energía cruda y única a la escena urbana regional desde Chihuahua.",
  spotifyId: "0vEKa5AOcBkQVXNfGb2FNh",
  logo: "https://image-cdn-ak.spotifycdn.com/image/ab67616100005174ad3895d1abba8e7a7929bca1", 
  socials: {
    instagram: "https://www.instagram.com/juan614oficial",
    youtube: "https://www.youtube.com/@juan614",
    spotify: "https://open.spotify.com/intl-es/artist/0vEKa5AOcBkQVXNfGb2FNh",
    tiktok: "https://tiktok.com/@juan614oficial",
    facebook: "https://www.facebook.com/juan614oficial",
    apple: "https://music.apple.com/artist/juan-614/1725514668"
  },
  featuredTracks: [
    { id: "1", title: "Lo Mejor Que Puedo Darte", album: "Single", duration: "3:45", spotifyUrl: "https://www.youtube.com/embed/YQmozpauppM", cover: "https://i.ytimg.com/vi/YQmozpauppM/hqdefault.jpg", releaseDate: "2026-02-12T10:03:34Z" },
    { id: "2", title: "Familia Pirata", album: "Single", duration: "3:20", spotifyUrl: "https://www.youtube.com/embed/Z0lMPVUYKnQ", cover: "https://i.ytimg.com/vi/Z0lMPVUYKnQ/hqdefault.jpg", releaseDate: "2026-02-10T10:00:00Z" }
  ],
  albums: [],
  upcoming: [],
  tour: [
    { city: "Chihuahua, MX", venue: "Arena Chihuahua", date: "15 Mayo" },
    { city: "Monterrey, MX", venue: "Auditorio Citibanamex", date: "22 Mayo" },
    { city: "CDMX, MX", venue: "Pepsi Center WTC", date: "29 Mayo" },
    { city: "Los Angeles, CA", venue: "The Wiltern", date: "05 Junio" },
    { city: "Phoenix, AZ", venue: "Arizona Financial Theatre", date: "12 Junio" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800&auto=format&fit=crop"
  ]
};

const CATALOG_URL = import.meta.env.VITE_CATALOG_SHEET_URL;
const UPCOMING_URL = import.meta.env.VITE_UPCOMING_SHEET_URL;
const SHEET_URL = CATALOG_URL; // Fallback for any legacy references

// Simple CSV parser that handles quotes and commas
const parseCSV = (csv: string) => {
  const lines = csv.split(/\r?\n/);
  return lines.map(line => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result;
  });
};

// Robust date parser for spreadsheet dates (handles ISO and DD/MM/YYYY)
const parseReleaseDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  
  // Try ISO first
  let date = new Date(dateStr);
  if (!isNaN(date.getTime())) return date;
  
  // Try DD/MM/YYYY
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      if (!isNaN(date.getTime())) return date;
    }
  }
  
  return new Date();
};

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    const calculate = () => {
      const date = parseReleaseDate(targetDate);
      const difference = date.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };

    const timer = setInterval(calculate, 1000);
    calculate();
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <span className="text-gold">ESTRENO INMINENTE</span>;

  return (
    <div className="flex gap-4">
      {[
        { label: 'D', val: timeLeft.days },
        { label: 'H', val: timeLeft.hours },
        { label: 'M', val: timeLeft.minutes },
        { label: 'S', val: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <p className="text-xl md:text-2xl font-display text-white leading-none">{item.val.toString().padStart(2, '0')}</p>
          <p className="text-[6px] text-gold font-black uppercase mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function VideoModal({ isOpen, onClose, videoUrl }: { isOpen: boolean, onClose: () => void, videoUrl: string }) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-6xl aspect-video bg-black border-4 border-gold shadow-[0_0_50px_rgba(212,175,55,0.3)]"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gold transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-xs"
        >
          Cerrar <span className="w-8 h-8 bg-gold text-black flex items-center justify-center">X</span>
        </button>
        <iframe 
          src={`${videoUrl}?autoplay=1`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

function GlobalPlayer({ currentTrack, isPlaying, onTogglePlay }: { currentTrack: any, isPlaying: boolean, onTogglePlay: () => void }) {
  if (!currentTrack) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full z-[80] bg-black/95 backdrop-blur-2xl border-t border-gold/30 p-4 md:p-6"
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-6">
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

export default function App() {
  const [artistData, setArtistData] = useState(INITIAL_ARTIST);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, videoUrl: '' });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        if (!CATALOG_URL || !UPCOMING_URL) {
          console.warn("Spreadsheet URLs missing in environment variables. Using initial data.");
          setIsLoading(false);
          return;
        }

        const [catRes, upRes] = await Promise.all([
          fetch(`${CATALOG_URL}&t=${Date.now()}`),
          fetch(`${UPCOMING_URL}&t=${Date.now()}`)
        ]);

        const [catCsv, upCsv] = await Promise.all([catRes.text(), upRes.text()]);
        const catRows = parseCSV(catCsv);
        const upRows = parseCSV(upCsv);
        
        const allTracks: any[] = [];
        const upcoming: any[] = [];
        const now = new Date();
        const newArtistData = { ...INITIAL_ARTIST };

        // Process Catalog Rows
        if (catRows.length > 1) {
          const dataRows = catRows.slice(1);
          // Row 1 Artist Info
          const artistInfo = dataRows[0];
          if (artistInfo && artistInfo[2]?.startsWith('http')) {
            newArtistData.logo = artistInfo[3] || newArtistData.logo;
            newArtistData.socials.spotify = artistInfo[2] || newArtistData.socials.spotify;
          }

          dataRows.forEach((row, idx) => {
            // idx 0 is artist info, already handled above
            if (idx === 0 || !row[0]) return;
            
            const track = {
              id: `cat-${idx}`,
              title: row[0],
              artist: row[1] || "Juan 614",
              spotifyUrl: row[2],
              cover: row[3],
              album: row[4] || "Single",
              releaseDate: row[5] || ""
            };
            const releaseDate = parseReleaseDate(track.releaseDate);
            allTracks.push({ ...track, releaseDate: releaseDate.toISOString() });
          });
        }

        // Process Upcoming Rows
        if (upRows.length > 1) {
          upRows.forEach((row, idx) => {
            if (!row[0] || (row[0].toLowerCase() === 'name' && idx === 0)) return;
            const track = {
              id: `up-${idx}`,
              title: row[0],
              artist: row[5] || "Juan 614",
              spotifyUrl: row[3], // preSaveLink
              cover: row[2], // coverImageUrl
              album: "Single",
              releaseDate: row[1] || new Date().toISOString()
            };
            const releaseDate = parseReleaseDate(track.releaseDate);
            if (releaseDate > now) {
              upcoming.push({
                ...track,
                displayDate: releaseDate.toLocaleDateString('es-MX'), // For UI Display
                date: releaseDate.toISOString(), // For Countdown and logic
                link: track.spotifyUrl
              });
            } else {
              allTracks.push({ ...track, releaseDate: releaseDate.toISOString() });
            }
          });
        }

        // Final Sort and Update
        allTracks.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

        setArtistData({
          ...newArtistData,
          featuredTracks: allTracks.slice(0, 5),
          albums: allTracks,
          upcoming: upcoming.length > 0 ? upcoming : INITIAL_ARTIST.upcoming
        });
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };
  
  // Create a unified catalog sorted by releaseDate
  const fullSortedCatalog = [
    ...artistData.featuredTracks,
    ...artistData.albums.filter(alb => !artistData.featuredTracks.find(ft => ft.title === alb.title))
  ].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
   .map((item, idx) => ({
      ...item,
      assetId: `#${String(idx + 1).padStart(3, '0')}-614`,
      // Normalize link/spotifyUrl
      playUrl: 'spotifyUrl' in item ? (item as any).spotifyUrl : (item as any).link
   }));

  const [currentTrack, setCurrentTrack] = useState<any>(fullSortedCatalog[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [heroTrack, setHeroTrack] = useState<any>(artistData.featuredTracks[Math.floor(Math.random() * artistData.featuredTracks.length)]);
  const [randomizedAlbums, setRandomizedAlbums] = useState<any[]>(artistData.albums);

  useEffect(() => {
    if (fullSortedCatalog.length > 0) {
      setCurrentTrack(fullSortedCatalog[0]);
    } else if (artistData.upcoming.length > 0) {
      setCurrentTrack(artistData.upcoming[0]);
    }
  }, [artistData]);

  useEffect(() => {
    if (artistData.featuredTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * artistData.featuredTracks.length);
      setHeroTrack(artistData.featuredTracks[randomIndex]);
    } else if (artistData.upcoming.length > 0) {
      setHeroTrack(artistData.upcoming[0]);
    }
    const shuffled = [...artistData.albums].sort(() => Math.random() - 0.5);
    setRandomizedAlbums(shuffled);
  }, [artistData]);

  const openVideo = (track: any, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    // Use normalized playUrl or detect YouTube ID from link
    let videoId = '';
    const urlStr = track.spotifyUrl || track.link || '';
    
    if (urlStr.includes('youtube.com/embed/')) {
      videoId = urlStr.split('/embed/')[1]?.split('?')[0];
    } else if (urlStr.includes('youtube.com/watch?v=')) {
      videoId = new URL(urlStr).searchParams.get('v') || '';
    } else if (urlStr.includes('youtu.be/')) {
      videoId = urlStr.split('youtu.be/')[1]?.split('?')[0];
    }

    const finalUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : urlStr;
    setModal({ isOpen: true, videoUrl: finalUrl });
  };
  
  const closeVideo = () => {
    setModal({ ...modal, isOpen: false });
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (modal.isOpen) {
      setIsPlaying(!isPlaying);
    } else {
      openVideo(currentTrack);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8">
        <div className="w-24 h-24 border-4 border-gold border-t-transparent rounded-full animate-spin shadow-[0_0_50px_rgba(212,175,55,0.3)]"></div>
        <div className="text-center">
          <h2 className="font-display text-4xl gold-text animate-pulse">CARGANDO INVENTARIO 614</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] mt-4 font-black">Syncing with Encryption Protocol // 614-SEC</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ranch-black selection:bg-gold selection:text-black font-sans pb-24 md:pb-32 relative">
      <div className="scanline z-50 fixed pointer-events-none" />
      <AnimatePresence>
        {modal.isOpen && (
          <VideoModal 
            isOpen={modal.isOpen} 
            onClose={closeVideo} 
            videoUrl={modal.videoUrl} 
          />
        )}
      </AnimatePresence>

      <GlobalPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />

      {/* Navigation */}
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
            {['Estrenos', 'Próximos', 'Albumes', 'Bio', 'Contacto'].map((item) => (
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

      {/* Hero Section - Centralizing Music */}
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

      {/* Marquee */}
      <div className="bg-gold py-4 md:py-6 border-y-4 md:border-y-8 border-black overflow-hidden relative z-30 -mt-4 rotate-[-1deg]">
        <div className="marquee">
          <div className="marquee-content">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-black font-display text-3xl md:text-5xl uppercase italic px-8 md:px-12">
                Juan 614 • Familia Pirata • Lo Mejor Que Puedo Darte • Esa Es La Chispa • Te Olvidé • Pega Fuerte • El verdadero arrepentimiento •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid Section - Estrenos Nuevos / Digital Inventory */}
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
            <img src={fullSortedCatalog[0].cover} alt={fullSortedCatalog[0].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
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



      {/* Estrenos Próximos Section */}
      <section id="upcoming" className="py-20 md:py-32 px-4 md:px-6 bg-ranch-charcoal">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-12 md:mb-20">
            <span className="font-gothic text-gold text-4xl md:text-5xl mb-2 block">Estrenos Próximos</span>
            <h3 className="font-display text-6xl md:text-9xl tracking-tighter uppercase italic leading-none">
              Lo Que <br /> <span className="gold-text">Viene</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {artistData.upcoming.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white/5 p-6 md:p-10 border border-white/10 hover:border-gold transition-all"
              >
                <div className="w-full md:w-1/2 aspect-square overflow-hidden border-2 border-white/10">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <Calendar size={16} className="text-gold" />
                    <span className="text-gold font-black uppercase tracking-widest text-[10px]">{(item as any).displayDate || item.date}</span>
                    <div className="h-4 w-[1px] bg-white/10 mx-2" />
                    <CountdownTimer targetDate={item.date} />
                  </div>
                  <h4 className="text-3xl md:text-5xl font-display uppercase italic leading-none mb-4">{item.title}</h4>
                  <p className="text-white/40 uppercase tracking-widest text-xs mb-8">Artista: {item.artist}</p>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block w-full md:w-auto bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-gold transition-all text-center"
                  >
                    Pre-Save Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="py-24 md:py-40 bg-white text-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
          <p className="text-[50vw] md:text-[30vw] font-display leading-none uppercase italic whitespace-nowrap -ml-20">JUAN 614 JUAN 614</p>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="font-gothic text-3xl md:text-4xl mb-6 md:mb-8 block">La Filosofía</span>
          <h2 className="text-4xl md:text-8xl font-display uppercase italic leading-[0.9] tracking-tighter mb-10 md:mb-12">
            "Muerde como <span className="text-gold drop-shadow-sm">serpiente</span>. La cara de pera. Corazones rotos dolidos."
          </h2>
          <div className="w-16 md:w-20 h-1 bg-black mx-auto" />
        </div>
      </section>

      {/* Biography Section */}
      <section id="bio" className="py-24 md:py-40 px-4 md:px-6 bg-black relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-gold" />
              <span className="font-black text-gold uppercase tracking-[0.5em] text-xs">Origin Story</span>
            </div>
            <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic leading-none mb-12">
              Juan <span className="gold-text">614</span>
            </h3>
            <div className="space-y-8 text-white/60 text-lg md:text-xl font-serif italic leading-relaxed border-l border-white/10 pl-8">
              <p>
                Originario de Chihuahua, México (código 614), Juan ha irrumpido en los Corridos Tumbados con una propuesta que fusiona la crudeza urbana con una introspección espiritual profunda.
              </p>
              <p>
                "Muerde como serpiente" y "La cara de pera" son más que frases; son el manifiesto de un artista que redefine el regional mexicano bajo el sello <span className="text-gold">Diosmasgym Records</span>.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-12">
              <div className="industrial-border p-6 bg-white/5">
                <p className="text-gold font-display text-5xl mb-1">614</p>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-40">Local Protocol</p>
              </div>
              <div className="industrial-border p-6 bg-white/5">
                <p className="text-gold font-display text-5xl mb-1">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-40">Authentic Data</p>
              </div>
            </div>
          </motion.div>
          <div className="relative industrial-border p-4 bg-white/5 backdrop-blur-xl">
            <img src={artistData.logo} alt="Juan 614 Bio" className="w-full aspect-[4/5] object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-1000" />
            <div className="absolute -bottom-6 -right-6 bg-gold text-black p-4 font-black text-xs uppercase tracking-widest rotate-3 shadow-xl">
              Verified Artist // 614-SEC
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Booking Section */}
      <section id="contacto" className="py-24 md:py-40 px-4 md:px-6 bg-gold text-black overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="flex flex-col items-center mb-12">
            <Share2 className="mb-6 mb-8 animate-bounce" size={48} />
            <h3 className="font-display text-7xl md:text-9xl tracking-tighter uppercase italic leading-none">
              Transmission <br /> <span className="text-white drop-shadow-lg">Channel</span>
            </h3>
          </div>
          <p className="text-lg md:text-2xl font-black uppercase tracking-[0.3em] mb-20 italic">
            Lleva la energía de Juan 614 a tu sector
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-10 border-4 border-black bg-white/10 backdrop-blur-sm group hover:bg-black transition-all">
              <Users className="mx-auto mb-6 group-hover:text-gold transition-colors" size={40} />
              <h5 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-40">Management Unit</h5>
              <p className="font-serif italic font-black text-xl group-hover:text-white transition-colors">booking@juan614.com</p>
            </div>
            <div className="p-10 border-4 border-black bg-white/10 backdrop-blur-sm group hover:bg-black transition-all">
              <Share2 className="mx-auto mb-6 group-hover:text-gold transition-colors" size={40} />
              <h5 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-40">Press Liaison</h5>
              <p className="font-serif italic font-black text-xl group-hover:text-white transition-colors">press@diosmasgym.com</p>
            </div>
            <div className="p-10 border-4 border-black bg-white/10 backdrop-blur-sm group hover:bg-black transition-all">
              <Volume2 className="mx-auto mb-6 group-hover:text-gold transition-colors" size={40} />
              <h5 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-40">Creative Demos</h5>
              <p className="font-serif italic font-black text-xl group-hover:text-white transition-colors">demos@614records.com</p>
            </div>
          </div>
          
          <div className="mt-24">
            <a 
              href={`mailto:booking@juan614.com`}
              className="group relative inline-block bg-black text-white px-20 py-8 font-black uppercase tracking-[0.4em] text-sm overflow-hidden transition-all hover:bg-white hover:text-black shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                UP-LINK MESSAGE <ChevronRight size={20} />
              </span>
            </a>
          </div>
        </div>
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <p className="text-[40vw] font-display uppercase italic whitespace-nowrap">CONTACT CONTACT</p>
        </div>
      </section>

      {/* Albums Section */}
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
                onClick={() => {
                  const url = new URL(album.link);
                  const videoId = url.searchParams.get('v');
                  if (videoId) openVideo({ ...album, spotifyUrl: `https://www.youtube.com/embed/${videoId}` });
                }}
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

      {/* Footer */}
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
                <li><a href="#contact" className="hover:text-gold transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-gold font-black uppercase tracking-widest text-[10px] mb-6 md:mb-8">Conéctate</h5>
              <div className="flex gap-6">
                <a href={artistData.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all"><Instagram size={24} /></a>
                <a href={artistData.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                </a>
                <a href={artistData.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all"><Youtube size={24} /></a>
                <a href={artistData.socials.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all"><Music2 size={24} /></a>
              </div>
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

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-4 right-4 z-50 md:hidden"
          >
            <div className="industrial-border bg-black p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 flex items-center justify-center industrial-border">
                  <span className="text-gold font-display text-sm">614</span>
                </div>
                <div>
                  <p className="text-[10px] text-gold font-black uppercase tracking-tighter shimmer">Disponible para Móvil</p>
                  <p className="text-white text-xs font-display uppercase italic">Instalar App Oficial</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowInstallBanner(false)}
                  className="px-3 py-2 text-[10px] text-white/40 uppercase font-black"
                >
                  Omitir
                </button>
                <button
                  onClick={handleInstall}
                  className="px-4 py-2 bg-gold text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Instalar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
