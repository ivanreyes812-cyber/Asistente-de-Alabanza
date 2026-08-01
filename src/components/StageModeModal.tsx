import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Volume2, 
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';
import { Song, NotationSystem } from '../types';
import { transposeLyricsWithChords, formatKey, playReferenceTone } from '../utils/chordTransposer';
import { BOOK_NAMES } from '../data/songsRepository';

interface StageModeModalProps {
  song: Song;
  semitones: number;
  notation: NotationSystem;
  setlistSongs?: Song[];
  currentIndexInSetlist?: number;
  onNavigateSetlist?: (newIndex: number) => void;
  onClose: () => void;
}

export const StageModeModal: React.FC<StageModeModalProps> = ({
  song,
  semitones,
  notation,
  setlistSongs = [],
  currentIndexInSetlist = -1,
  onNavigateSetlist,
  onClose
}) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1-10
  const [fontSize, setFontSize] = useState<number>(24); // large stage font
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const wakeLockRef = useRef<any>(null);

  const currentKey = formatKey(song.originalKey, semitones, notation);

  // Screen Wake Lock
  useEffect(() => {
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          setWakeLockActive(true);
        }
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    }

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().then(() => setWakeLockActive(false));
      }
    };
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    let interval: any;
    if (isAutoScrolling && contentRef.current) {
      interval = setInterval(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop += scrollSpeed * 0.8;
          // Stop at bottom
          if (
            contentRef.current.scrollTop + contentRef.current.clientHeight >=
            contentRef.current.scrollHeight - 5
          ) {
            setIsAutoScrolling(false);
          }
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollSpeed]);

  const transposedLyrics = transposeLyricsWithChords(song.lyrics, semitones, notation);

  const renderLyrics = () => {
    return transposedLyrics.split('\n').map((line, idx) => {
      const isHeader = /^(CORO|ÚLTIMO CORO|I|II|III|IV|V|VI|INTRO|PUENTE)$/i.test(line.trim());

      if (isHeader) {
        return (
          <div 
            key={idx} 
            className={`font-black uppercase tracking-wider text-base sm:text-lg my-6 pb-1 border-b-2 ${
              theme === 'dark' ? 'text-amber-400 border-amber-500/30' : 'text-indigo-700 border-indigo-200'
            }`}
          >
            {line.trim()}
          </div>
        );
      }

      if (line.includes('[')) {
        const parts: { chord?: string; text: string }[] = [];
        const regex = /\[([^\]]+)\]([^\[]*)/g;
        let match;

        const firstBracket = line.indexOf('[');
        if (firstBracket > 0) {
          parts.push({ text: line.substring(0, firstBracket) });
        }

        while ((match = regex.exec(line)) !== null) {
          parts.push({
            chord: match[1],
            text: match[2]
          });
        }

        return (
          <div key={idx} className="flex flex-wrap items-end my-3 leading-snug">
            {parts.map((p, pIdx) => (
              <div key={pIdx} className="inline-flex flex-col mr-1">
                {p.chord ? (
                  <span className={`font-mono font-black text-sm sm:text-base px-1.5 py-0.5 rounded ${
                    theme === 'dark' ? 'text-amber-300 bg-amber-500/20 border border-amber-400/40' : 'text-indigo-900 bg-indigo-100 font-extrabold'
                  }`}>
                    {p.chord}
                  </span>
                ) : (
                  <span className="h-5"></span>
                )}
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} whitespace-pre`}>
                  {p.text || ' '}
                </span>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div key={idx} className={`my-2 leading-relaxed font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
          {line || <br />}
        </div>
      );
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      
      {/* Stage Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
        
        {/* Navigation & Song Info */}
        <div className="flex items-center gap-3">
          {currentIndexInSetlist >= 0 && onNavigateSetlist && (
            <div className="flex items-center gap-1">
              <button
                disabled={currentIndexInSetlist <= 0}
                onClick={() => onNavigateSetlist(currentIndexInSetlist - 1)}
                className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-30 text-white"
                title="Canción anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono font-bold text-amber-400 px-2">
                {currentIndexInSetlist + 1}/{setlistSongs.length}
              </span>
              <button
                disabled={currentIndexInSetlist >= setlistSongs.length - 1}
                onClick={() => onNavigateSetlist(currentIndexInSetlist + 1)}
                className="p-1.5 rounded-lg bg-slate-800 disabled:opacity-30 text-white"
                title="Siguiente canción"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
                #{song.number} • {BOOK_NAMES[song.book]}
              </span>
              <span className="text-xs font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded font-mono">
                Tono: {currentKey}
              </span>
              {wakeLockActive && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60" title="Pantalla siempre encendida">
                  <Lock className="w-3 h-3" /> WakeLock
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight mt-0.5">
              {song.title}
            </h1>
          </div>
        </div>

        {/* Stage Tools Controls */}
        <div className="flex items-center gap-2">
          
          {/* Audio Pitch Reference */}
          <button
            onClick={() => playReferenceTone(currentKey, 3.0)}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
            title="Sonar tono de inicio"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Tono</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            title="Cambiar tema de escenario"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Exit Stage */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
            title="Salir de Modo Escenario"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Main Lyrics Display Area */}
      <div 
        ref={contentRef} 
        className="flex-1 overflow-y-auto px-6 py-8 max-w-5xl mx-auto w-full select-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        {song.lyrics && song.lyrics.trim() ? (
          renderLyrics()
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center space-y-6">
            <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400 block mb-2">
                #{song.number} • {BOOK_NAMES[song.book]}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight mb-4">
                {song.title}
              </h1>
              <div className="inline-block px-6 py-3 bg-amber-400 text-slate-950 font-black text-2xl sm:text-3xl rounded-2xl shadow-xl font-mono">
                Tonalidad: {currentKey}
              </div>
            </div>
            <p className={`text-sm max-w-md ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Directorio de Corario con Tonalidades. Referencia para transiciones de culto en tono <span className="font-bold text-amber-400">{currentKey}</span>.
            </p>
          </div>
        )}
      </div>

      {/* Floating Teleprompter Auto-Scroll Bar */}
      <div className={`p-3 border-t flex flex-wrap items-center justify-between gap-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              isAutoScrolling 
                ? 'bg-amber-500 text-slate-950 animate-pulse shadow-lg' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isAutoScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAutoScrolling ? 'Pausar Desplazamiento' : 'Auto-Scroll'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Velocidad:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="w-24 accent-amber-500 cursor-pointer"
            />
            <span className="font-mono font-bold text-amber-400 w-4">{scrollSpeed}</span>
          </div>
        </div>

        {/* Font size */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Tamaño Texto:</span>
          <button
            onClick={() => setFontSize(prev => Math.max(18, prev - 2))}
            className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded font-bold"
          >
            A-
          </button>
          <span className="font-mono text-amber-400 font-bold">{fontSize}px</span>
          <button
            onClick={() => setFontSize(prev => Math.min(40, prev + 2))}
            className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded font-bold"
          >
            A+
          </button>
        </div>
      </div>

    </div>
  );
};
