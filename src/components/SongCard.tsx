import React from 'react';
import { Heart, Plus, Sparkles, Music, Bookmark } from 'lucide-react';
import { Song, NotationSystem } from '../types';
import { formatKey } from '../utils/chordTransposer';
import { BOOK_NAMES } from '../data/songsRepository';

interface SongCardProps {
  song: Song;
  notation: NotationSystem;
  isFavorite: boolean;
  onToggleFavorite: (songId: string, e: React.MouseEvent) => void;
  onSelectSong: (song: Song) => void;
  onAddToSetlist?: (song: Song, e: React.MouseEvent) => void;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  notation,
  isFavorite,
  onToggleFavorite,
  onSelectSong,
  onAddToSetlist
}) => {
  const formattedKey = formatKey(song.originalKey, 0, notation);

  const getBookColor = (book: string) => {
    switch (book) {
      case 'lluvias':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'manantial':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'corario':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div 
      onClick={() => onSelectSong(song)}
      className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Number & Book Badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/80 text-amber-400 font-extrabold text-sm shadow-inner">
              #{song.number}
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getBookColor(song.book)}`}>
              {BOOK_NAMES[song.book]}
            </span>
          </div>

          {/* Key badge & Favorite */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 bg-amber-400 px-2 py-0.5 rounded-md shadow-sm">
              {formattedKey}
            </span>
            <button
              onClick={(e) => onToggleFavorite(song.id, e)}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite 
                  ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1 font-serif">
          {song.title}
        </h3>

        {/* Category & Author */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
          <span className="text-slate-400">{song.category}</span>
          {song.author && (
            <>
              <span>•</span>
              <span className="italic truncate text-slate-400">{song.author}</span>
            </>
          )}
        </div>

        {/* Preview of first line if available */}
        {song.lyrics ? (
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed font-sans opacity-90">
            {song.lyrics.replace(/\[[^\]]+\]/g, '').replace(/^(I|II|III|IV|V|CORO)\s*/gm, '').trim()}
          </p>
        ) : (
          <p className="text-xs text-emerald-400/80 mt-2 font-medium">
            Tonalidad registrada: <span className="font-bold font-mono text-amber-300">{formattedKey}</span>
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] font-medium text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
          {song.lyrics ? 'Ver letra y acordes →' : 'Ver detalle →'}
        </span>

        {onAddToSetlist && (
          <button
            onClick={(e) => onAddToSetlist(song, e)}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md border border-slate-700/60 transition"
            title="Añadir a lista de culto"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Lista</span>
          </button>
        )}
      </div>
    </div>
  );
};
