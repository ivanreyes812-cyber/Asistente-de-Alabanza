import React, { useState } from 'react';
import { Key, Volume2, Sparkles, Music, Filter } from 'lucide-react';
import { Song, NotationSystem } from '../types';
import { formatKey, playReferenceTone } from '../utils/chordTransposer';
import { SongCard } from './SongCard';

interface CorarioTonalidadesViewProps {
  corarioSongs: Song[];
  notation: NotationSystem;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectSong: (song: Song) => void;
  onAddToSetlist: (song: Song, e: React.MouseEvent) => void;
}

const KEYS_FILTER = ['TODOS', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm'];

export const CorarioTonalidadesView: React.FC<CorarioTonalidadesViewProps> = ({
  corarioSongs,
  notation,
  favorites,
  onToggleFavorite,
  onSelectSong,
  onAddToSetlist
}) => {
  const [selectedKeyFilter, setSelectedKeyFilter] = useState<string>('TODOS');
  const [categoryFilter, setCategoryFilter] = useState<'TODOS' | 'Adoración' | 'Alabanza'>('TODOS');

  const filteredSongs = corarioSongs.filter(song => {
    const keyMatch = selectedKeyFilter === 'TODOS' || song.originalKey === selectedKeyFilter;
    const catMatch = categoryFilter === 'TODOS' || song.category === categoryFilter;
    return keyMatch && catMatch;
  });

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Key className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Directorio de Cánticos y Coros
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
              Corario con Tonalidad Inicial
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explora y filtra coros de alabanza y adoración ordenados por tonalidad musical (Do, Re, Mi, Fa, Sol, La, Si, Dm, Em...). Ideal para transiciones fluidas en el culto.
            </p>
          </div>

          {selectedKeyFilter !== 'TODOS' && (
            <button
              onClick={() => playReferenceTone(selectedKeyFilter, 2.5)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-2xl shadow-lg transition flex items-center gap-2 text-xs shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Pito de Tono ({formatKey(selectedKeyFilter, 0, notation)})</span>
            </button>
          )}
        </div>
      </div>

      {/* Key Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filtrar por Tonalidad Musical:</span>
          </span>

          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
            {(['TODOS', 'Adoración', 'Alabanza'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  categoryFilter === cat 
                    ? 'bg-amber-500 text-slate-950 shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Keys Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {KEYS_FILTER.map(key => {
            const isSelected = selectedKeyFilter === key;
            const displayLabel = key === 'TODOS' ? 'Todas las Tonalidades' : formatKey(key, 0, notation);
            return (
              <button
                key={key}
                onClick={() => setSelectedKeyFilter(key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 border ${
                  isSelected 
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105' 
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Song List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-400">
            Mostrando <span className="font-bold text-white">{filteredSongs.length}</span> coros en {selectedKeyFilter === 'TODOS' ? 'todas las tonalidades' : `Tono ${formatKey(selectedKeyFilter, 0, notation)}`}
          </p>
        </div>

        {filteredSongs.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Music className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No hay coros registrados en esta tonalidad.</p>
            <p className="text-xs text-slate-500 mt-1">Prueba seleccionar otra tonalidad o categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSongs.map(song => (
              <SongCard
                key={song.id}
                song={song}
                notation={notation}
                isFavorite={favorites.includes(song.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectSong={onSelectSong}
                onAddToSetlist={onAddToSetlist}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
