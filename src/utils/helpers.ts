export const INITIAL_ARTIST = {
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

// Simple CSV parser that handles quotes and commas
export const parseCSV = (csv: string) => {
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
export const parseReleaseDate = (dateStr: string) => {
  if (!dateStr) {
    console.warn('No release date provided, using current date');
    return new Date();
  }
  
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
  
  console.warn(`Invalid date format: ${dateStr}, using current date`);
  return new Date();
};
