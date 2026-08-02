import React, { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  NavTabs 
} from './components/NavTabs';
import { 
  SongCard 
} from './components/SongCard';
import { 
  SongDetailModal 
} from './components/SongDetailModal';
import { 
  StageModeModal 
} from './components/StageModeModal';
import { 
  CorarioTonalidadesView 
} from './components/CorarioTonalidadesView';
import { 
  SetlistManager 
} from './components/SetlistManager';
import { 
  MetronomeModal 
} from './components/MetronomeModal';
import { 
  PitchPipeModal 
} from './components/PitchPipeModal';
import { 
  CustomSongEditor 
} from './components/CustomSongEditor';

import { 
  Song, 
  Setlist, 
  NotationSystem, 
  ActiveTab, 
  SongBookType,
  Category 
} from './types';

import { 
  getAllInitialSongs, 
  loadCustomSongs, 
  saveCustomSongs, 
  loadFavorites, 
  saveFavorites, 
  loadSetlists, 
  saveSetlists,
  BOOK_NAMES 
} from './data/songsRepository';

import { 
  BookOpen, 
  Droplet, 
  Key, 
  Search, 
  Heart, 
  PlusCircle, 
  Clock, 
  Volume2, 
  Filter,
  Sparkles,
  Music,
  Bookmark,
  Check,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notation, setNotation] = useState<NotationSystem>('american');

  // Songs & Favorites state
  const [initialSongs] = useState<Song[]>(getAllInitialSongs());
  const [customSongs, setCustomSongs] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [setlists, setSetlists] = useState<Setlist[]>([]);

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');

  // Modals state
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [stageModeData, setStageModeData] = useState<{
    song: Song;
    semitones: number;
    setlistSongs?: Song[];
    currentIndex?: number;
  } | null>(null);

  const [isMetronomeOpen, setIsMetronomeOpen] = useState<boolean>(false);
  const [isPitchPipeOpen, setIsPitchPipeOpen] = useState<boolean>(false);

  // Add to setlist picker state
  const [songToAddToSetlist, setSongToAddToSetlist] = useState<{ song: Song; key: string } | null>(null);

  // Load saved state on mount
  useEffect(() => {
    setCustomSongs(loadCustomSongs());
    setFavorites(loadFavorites());
    setSetlists(loadSetlists());
  }, []);

  // Combined songs repository
  const allSongs = useMemo(() => {
    return [...initialSongs, ...customSongs];
  }, [initialSongs, customSongs]);

  // Songs Map for quick O(1) lookup
  const songsMap = useMemo(() => {
    const map = new Map<string, Song>();
    allSongs.forEach(s => map.set(s.id, s));
    return map;
  }, [allSongs]);

  // Save Handlers
  const handleToggleFavorite = (songId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (favorites.includes(songId)) {
      updated = favorites.filter(id => id !== songId);
    } else {
      updated = [...favorites, songId];
    }
    setFavorites(updated);
    saveFavorites(updated);
  };

  const handleSaveCustomSong = (newSong: Song) => {
    const updated = [newSong, ...customSongs];
    setCustomSongs(updated);
    saveCustomSongs(updated);
    setSelectedSong(newSong);
  };

  const handleUpdateSetlists = (updatedSetlists: Setlist[]) => {
    setSetlists(updatedSetlists);
    saveSetlists(updatedSetlists);
  };

  const handleConfirmAddToSetlist = (setlistId: string) => {
    if (!songToAddToSetlist) return;

    const target = setlists.find(s => s.id === setlistId);
    if (!target) return;

    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      songId: songToAddToSetlist.song.id,
      selectedKey: songToAddToSetlist.key || songToAddToSetlist.song.originalKey,
      notes: ''
    };

    const updatedSetlists = setlists.map(s => {
      if (s.id === setlistId) {
        return { ...s, items: [...s.items, newItem] };
      }
      return s;
    });

    handleUpdateSetlists(updatedSetlists);
    setSongToAddToSetlist(null);
  };

  // Current tab songs base set
  const currentTabSongs = useMemo(() => {
    return allSongs.filter(song => {
      if (activeTab === 'lluvias') return song.book === 'lluvias';
      if (activeTab === 'manantial') return song.book === 'manantial';
      if (activeTab === 'corario') return song.book === 'corario';
      if (activeTab === 'custom') return song.book === 'custom';
      if (activeTab === 'favorites') return favorites.includes(song.id);
      return true; // 'all' tab or search across all
    });
  }, [allSongs, activeTab, favorites]);

  // Dynamic category counts for active tab
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    currentTabSongs.forEach(s => {
      const cat = s.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [currentTabSongs]);

  // Available unique categories in active tab sorted by count
  const availableCategories = useMemo(() => {
    return Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);
  }, [categoryCounts]);

  // Filtered Songs calculation
  const displayedSongs = useMemo(() => {
    return currentTabSongs.filter(song => {
      // Category filter
      if (selectedCategory !== 'TODAS') {
        const sel = selectedCategory.toLowerCase();
        const songCat = (song.category || '').toLowerCase();
        if (songCat !== sel && !songCat.includes(sel) && !sel.includes(songCat)) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const numberStr = song.number.toString();
        const titleMatch = song.title.toLowerCase().includes(q);
        const numberMatch = numberStr === q || numberStr.includes(q);
        const categoryMatch = (song.category || '').toLowerCase().includes(q);
        const lyricsMatch = song.lyrics ? song.lyrics.toLowerCase().includes(q) : false;

        return titleMatch || numberMatch || categoryMatch || lyricsMatch;
      }

      return true;
    });
  }, [currentTabSongs, selectedCategory, searchQuery]);

  // Separate songs for Corario tab
  const corarioOnlySongs = useMemo(() => {
    return allSongs.filter(s => s.book === 'corario');
  }, [allSongs]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notation={notation}
        setNotation={setNotation}
        onOpenMetronome={() => setIsMetronomeOpen(true)}
        onOpenPitchPipe={() => setIsPitchPipeOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Tab Navigation */}
      <NavTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        setlistsCount={setlists.length}
        customCount={customSongs.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: CORARIO POR TONALIDADES VIEW */}
        {activeTab === 'corario' ? (
          <CorarioTonalidadesView
            corarioSongs={corarioOnlySongs}
            notation={notation}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectSong={setSelectedSong}
            onAddToSetlist={(song, e) => {
              e.stopPropagation();
              setSongToAddToSetlist({ song, key: song.originalKey });
            }}
          />
        ) : activeTab === 'setlists' ? (
          /* TAB 2: SETLISTS / LISTAS DE CULTO */
          <SetlistManager
            setlists={setlists}
            songsMap={songsMap}
            notation={notation}
            onUpdateSetlists={handleUpdateSetlists}
            onOpenStageModeWithSetlist={(songs, index) => {
              setStageModeData({
                song: songs[index],
                semitones: 0,
                setlistSongs: songs,
                currentIndex: index
              });
            }}
            onSelectSong={setSelectedSong}
          />
        ) : activeTab === 'tools' ? (
          /* TAB 3: HERRAMIENTAS (Metrónomo, Tono, Transpositor) */
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white font-serif mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" /> Herramientas de Dirección de Alabanza
              </h2>
              <p className="text-sm text-slate-300">
                Accede rápidamente al metrónomo, tono de referencia vocal y utilidades de notación musical.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div 
                  onClick={() => setIsPitchPipeOpen(true)}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-5 rounded-2xl cursor-pointer transition shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">Pito de Tono (Pitch Pipe)</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Escucha la nota de inicio exacta para afinar la voz antes de comenzar la alabanza.
                  </p>
                </div>

                <div 
                  onClick={() => setIsMetronomeOpen(true)}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-5 rounded-2xl cursor-pointer transition shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">Metrónomo con Tap Tempo</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Controla el tempo (BPM), compás y marca el ritmo con toques para mantener la banda en tiempo.
                  </p>
                </div>

                <div 
                  onClick={() => setNotation(notation === 'american' ? 'latin' : 'american')}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 p-5 rounded-2xl cursor-pointer transition shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Music className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">Sistema de Notación</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Actual: <span className="font-bold text-amber-300">{notation === 'american' ? 'C - D - E (Americana)' : 'Do - Re - Mi (Latina)'}</span>. Toca para cambiar.
                  </p>
                </div>
              </div>
            </div>

            <CustomSongEditor onSaveSong={handleSaveCustomSong} />
          </div>
        ) : (
          /* TAB 4, 5, 6: SEARCH & SONGBOOK LISTINGS (LLUVIAS, MANANTIAL, FAVORITOS, MIS CÁNTICOS) */
          <div className="space-y-6">
            
            {/* Category Filter Pills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 sm:space-y-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Categorías ({availableCategories.length}):
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full scrollbar-none pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedCategory('TODAS')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                    selectedCategory === 'TODAS'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-105'
                      : 'bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <span>TODAS</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === 'TODAS' ? 'bg-slate-950/30 text-slate-950 font-bold' : 'bg-slate-950/80 text-slate-400'
                  }`}>
                    {currentTabSongs.length}
                  </span>
                </button>

                {availableCategories.map((cat) => {
                  const count = categoryCounts[cat] || 0;
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-105'
                          : 'bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-slate-950/30 text-slate-950 font-bold' : 'bg-slate-950/80 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Counter Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div>
                <span>Mostrando </span>
                <span className="font-bold text-white">{displayedSongs.length}</span>
                <span> cánticos</span>
                {searchQuery && (
                  <span> para "<span className="text-amber-300 font-bold">{searchQuery}</span>"</span>
                )}
              </div>

              {activeTab === 'custom' && (
                <button
                  onClick={() => setActiveTab('tools')}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Crear Cántico</span>
                </button>
              )}
            </div>

            {/* Empty state */}
            {displayedSongs.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-200">No se encontraron cánticos</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Prueba buscando por número de himno, palabra de la letra, título o selecciona otra categoría.
                </p>
              </div>
            ) : (
              /* Songs Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedSongs.map(song => (
                  <SongCard
                    key={song.id}
                    song={song}
                    notation={notation}
                    isFavorite={favorites.includes(song.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectSong={setSelectedSong}
                    onAddToSetlist={(s, e) => {
                      e.stopPropagation();
                      setSongToAddToSetlist({ song: s, key: s.originalKey });
                    }}
                  />
                ))}
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-serif text-slate-400 font-medium">
            Aplicación PWA para Directores de Alabanza de la Iglesia Central de Lorica
          </p>
          <p className="text-[11px] text-slate-500">
            Himnario Lluvias de Bendición • Himnario Manantial de Inspiración • Corario con Tonalidades
          </p>
          <p className="text-[11px] text-amber-400/90 font-medium tracking-wide italic">
            Un cammino, un sogno, Dio e noi G&I
          </p>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Song Detail Modal */}
      {selectedSong && (
        <SongDetailModal
          song={selectedSong}
          notation={notation}
          isFavorite={favorites.includes(selectedSong.id)}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
          onClose={() => setSelectedSong(null)}
          onOpenStageMode={(song, semitones) => {
            setSelectedSong(null);
            setStageModeData({ song, semitones });
          }}
          onAddToSetlist={(song, key) => {
            setSongToAddToSetlist({ song, key });
          }}
        />
      )}

      {/* 2. Stage Mode Teleprompter Modal */}
      {stageModeData && (
        <StageModeModal
          song={stageModeData.song}
          semitones={stageModeData.semitones}
          notation={notation}
          setlistSongs={stageModeData.setlistSongs}
          currentIndexInSetlist={stageModeData.currentIndex}
          onNavigateSetlist={(newIdx) => {
            if (stageModeData.setlistSongs && stageModeData.setlistSongs[newIdx]) {
              setStageModeData({
                ...stageModeData,
                song: stageModeData.setlistSongs[newIdx],
                currentIndex: newIdx
              });
            }
          }}
          onClose={() => setStageModeData(null)}
        />
      )}

      {/* 3. Metronome Modal */}
      {isMetronomeOpen && (
        <MetronomeModal onClose={() => setIsMetronomeOpen(false)} />
      )}

      {/* 4. Pitch Pipe Modal */}
      {isPitchPipeOpen && (
        <PitchPipeModal
          notation={notation}
          onClose={() => setIsPitchPipeOpen(false)}
        />
      )}

      {/* 5. Add To Setlist Picker Modal */}
      {songToAddToSetlist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                Añadir a Lista de Culto
              </h3>
              <button 
                onClick={() => setSongToAddToSetlist(null)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Añadir <span className="font-bold text-amber-300">{songToAddToSetlist.song.title}</span> a:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {setlists.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleConfirmAddToSetlist(s.id)}
                  className="w-full text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-white">{s.title}</div>
                    <div className="text-[10px] text-slate-400">{s.serviceType} • {s.items.length} cánticos</div>
                  </div>
                  <Check className="w-4 h-4 text-amber-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
