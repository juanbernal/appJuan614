/// <reference types="vite/client" />
/**
 * Final trigger: environment variables added to Vercel dashboard.
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import ReactGA from 'react-ga4';
import { Music2 } from 'lucide-react';

// Utils
import { INITIAL_ARTIST, parseCSV, parseReleaseDate } from './utils/helpers';

// Components
import VideoModal from './components/VideoModal';
import GlobalPlayer from './components/GlobalPlayer';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Sections
import HeroSection from './sections/HeroSection';
import InventorySection from './sections/InventorySection';
import UpcomingSection from './sections/UpcomingSection';
import BioSection from './sections/BioSection';
import { MilestonesSection, TourSection } from './sections/MilestonesAndTourSections';
import AlbumsSection from './sections/AlbumsSection';
import StudioSessionsSection from './sections/StudioSessionsSection';
import CollaboratorsSection from './sections/CollaboratorsSection';
import TimelineSection from './sections/TimelineSection';
import Store from './sections/Store';
import Newsletter from './sections/Newsletter';

const CATALOG_URL = import.meta.env.VITE_CATALOG_SHEET_URL;
const UPCOMING_URL = import.meta.env.VITE_UPCOMING_SHEET_URL;
const STUDIO_SESSION_URL = import.meta.env.VITE_STUDIO_SESSION_SHEET_URL;
const COLLABORATORS_URL = import.meta.env.VITE_COLLABORATORS_SHEET_URL;
const SHEET_URL = CATALOG_URL; // Fallback for any legacy references

// Initialize Google Analytics
if (import.meta.env.VITE_GA4_MEASUREMENT_ID) {
  ReactGA.initialize(import.meta.env.VITE_GA4_MEASUREMENT_ID);
}

export default function App() {
  const [artistData, setArtistData] = useState(INITIAL_ARTIST);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, videoUrl: '' });
  const [playerMode, setPlayerMode] = useState<'full' | 'mini'>('full');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [studioSessions, setStudioSessions] = useState<any[]>([]);
  const [collaborators, setCollaborators] = useState<any[]>([]);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        if (!CATALOG_URL || !UPCOMING_URL) {
          console.warn("Spreadsheet URLs missing in environment variables. Using initial data.");
          setIsLoading(false);
          return;
        }

        const fetchPromises = [
          fetch(`${CATALOG_URL}&t=${Date.now()}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } }),
          fetch(`${UPCOMING_URL}&t=${Date.now()}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } })
        ];

        if (STUDIO_SESSION_URL) {
          fetchPromises.push(fetch(`${STUDIO_SESSION_URL}&t=${Date.now()}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } }));
        }
        if (COLLABORATORS_URL) {
          fetchPromises.push(fetch(`${COLLABORATORS_URL}&t=${Date.now()}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } }));
        }

        const responses = await Promise.all(fetchPromises);
        const [catRes, upRes, studioRes, collabRes] = responses;
        
        const [catCsv, upCsv] = await Promise.all([catRes.text(), upRes.text()]);
        
        let studioCsv = '';
        let collabCsv = '';
        if (studioRes) studioCsv = await studioRes.text();
        if (collabRes) collabCsv = await collabRes.text();

        const catRows = parseCSV(catCsv);
        const upRows = parseCSV(upCsv);

        const allTracks: any[] = [];
        const upcoming: any[] = [];
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
          const thirtyDaysAgo = new Date(startOfToday);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
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
            
            if (releaseDate >= thirtyDaysAgo) {
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

        // Process Studio Sessions
        if (studioCsv) {
          const studioRows = parseCSV(studioCsv);
          const sessions = studioRows.slice(1).filter(row => row[0]).map((row, idx) => ({
            id: `studio-${idx}`,
            title: row[0],
            description: row[1] || '',
            videoUrl: row[2] || '',
            cover: row[3] || '',
            date: row[4] || ''
          }));

          setStudioSessions(sessions);
        }

        // Process Collaborators
        if (collabCsv) {
          const collabRows = parseCSV(collabCsv);
          const collabs = collabRows.slice(1).filter(row => row[0]).map((row, idx) => ({
            id: `collab-${idx}`,
            name: row[0],
            image: row[1] || '',
            genre: row[2] || '',
            socialLink: row[3] || ''
          }));

          setCollaborators(collabs);
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
  
  const fullSortedCatalog = [
    ...artistData.featuredTracks,
    ...artistData.albums.filter(alb => !artistData.featuredTracks.find(ft => ft.title === alb.title))
  ].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
   .map((item, idx) => ({
      ...item,
      assetId: `#${String(idx + 1).padStart(3, '0')}-614`,
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
    let videoId = '';
    const urlStr = track.spotifyUrl || track.link || '';
    
    if (urlStr.includes('youtube.com/embed/')) {
      videoId = urlStr.split('/embed/')[1]?.split('?')[0];
    } else if (urlStr.includes('youtube.com/watch?v=')) {
      videoId = new URL(urlStr).searchParams.get('v') || '';
    } else if (urlStr.includes('youtu.be/')) {
      videoId = urlStr.split('youtu.be/')[1]?.split('?')[0];
    }

    const finalUrl = videoId 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}` 
      : urlStr;
    setModal({ isOpen: true, videoUrl: finalUrl });
    setPlayerMode('mini'); 
  };
  
  const closeVideo = () => {
    setModal({ ...modal, isOpen: false });
    setIsPlaying(false);
    setPlayerMode('full');
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
      <Helmet>
        <title>{artistData.name} | {artistData.genre} - Official Hub</title>
        <meta name="description" content={artistData.bio} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="music.musician" />
        <meta property="og:title" content={`${artistData.name} | Official Hub`} />
        <meta property="og:description" content={artistData.bio} />
        <meta property="og:image" content={artistData.logo} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${artistData.name} | Official Hub`} />
        <meta name="twitter:description" content={artistData.bio} />
        <meta name="twitter:image" content={artistData.logo} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicGroup",
            "name": artistData.name,
            "genre": artistData.genre,
            "description": artistData.bio,
            "image": artistData.logo,
            "sameAs": Object.values(artistData.socials),
            "album": artistData.albums.slice(0, 5).map((album: any) => ({
              "@type": "MusicAlbum",
              "name": album.title,
              "datePublished": album.releaseDate,
              "image": album.cover
            }))
          })}
        </script>
      </Helmet>
      
      <div className="scanline z-50 fixed pointer-events-none" />
      <AnimatePresence>
        {modal.isOpen && (
          <VideoModal 
            isOpen={modal.isOpen} 
            onClose={closeVideo} 
            videoUrl={modal.videoUrl} 
            playerMode={playerMode}
            setPlayerMode={setPlayerMode}
          />
        )}
      </AnimatePresence>

      <GlobalPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />

      <Navigation scrolled={scrolled} artistData={artistData} />

      <HeroSection heroTrack={heroTrack} artistData={artistData} openVideo={openVideo} />

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

      <InventorySection fullSortedCatalog={fullSortedCatalog} isLoading={isLoading} openVideo={openVideo} />
      <UpcomingSection artistData={artistData} />
      <BioSection artistData={artistData} />
      <MilestonesSection />
      <TourSection tour={artistData.tour} />
      <AlbumsSection randomizedAlbums={randomizedAlbums} openVideo={openVideo} />

      {/* Christian Urban Music CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-black relative overflow-hidden text-center border-y border-gold/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <Music2 className="text-gold animate-pulse" size={48} />
            <h3 className="font-display text-4xl md:text-7xl uppercase italic tracking-tighter text-glow mb-2">
              Música Urbana Cristiana
            </h3>
            <p className="text-white/60 text-lg md:text-xl font-serif italic mb-10">
              ¿Buscas más de nuestra esencia con un mensaje diferente?
            </p>
            <a 
              href="https://musica.diosmasgym.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-block bg-white text-black px-12 py-6 font-black uppercase tracking-[0.4em] text-sm overflow-hidden transition-all hover:bg-gold shadow-2xl"
            >
              <span className="relative z-10">EXPLORAR AHORA</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
        {/* Background Decorative Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
          <p className="text-[30vw] font-display uppercase italic">GOD MUSIC GOD MUSIC</p>
        </div>
      </section>

      <StudioSessionsSection studioSessions={studioSessions} />
      <CollaboratorsSection collaborators={collaborators} />
      <TimelineSection featuredTracks={artistData.featuredTracks} />
      
      <Store />
      <Newsletter />
      <Footer CATALOG_URL={CATALOG_URL} UPCOMING_URL={UPCOMING_URL} />

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
