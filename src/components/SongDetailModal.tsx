import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Plus, 
  Minus, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Tv, 
  Copy, 
  Check, 
  Heart, 
  ListPlus, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Song, NotationSystem } from '../types';
import { 
  transposeLyricsWithChords, 
  formatKey, 
  playReferenceTone, 
  stopReferenceTone 
} from '../utils/chordTransposer';
import { BOOK_NAMES } from '../data/songsRepository';

interface SongDetailModalProps {
  song: Song;
  notation: NotationSystem;
  isFavorite: boolean;
  onToggleFavorite: (songId: string) => void;
  onClose: () => void;
  onOpenStageMode: (song: Song, semitones: number) => void;
  onAddToSetlist: (song: Song, key: string) => void;
}

export const SongDetailModal: React.FC<SongDetailModalProps> = ({
  song,
  notation,
  isFavorite,
  onToggleFavorite,
  onClose,
  onOpenStageMode,
  onAddToSetlist
}) => {
  const [semitones, setSemitones] = useState<number>(0);
  const [showChords, setShowChords] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(18); // px
  const [isPlayingPitch, setIsPlayingPitch] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentKey = formatKey(song.originalKey, semitones, notation);

  const handlePitchPlay = () => {
    if (isPlayingPitch) {
      stopReferenceTone();
      setIsPlayingPitch(false);
    } else {
      setIsPlayingPitch(true);
      playReferenceTone(currentKey, 3.0);
      setTimeout(() => setIsPlayingPitch(false), 3000);
    }
  };

  const handleCopy = () => {
    const textToCopy = showChords
      ? transposeLyricsWithChords(song.lyrics, semitones, notation)
      : song.lyrics.replace(/\[[^\]]+\]/g, '');

    navigator.clipboard.writeText(`${song.title} (${BOOK_NAMES[song.book]} #${song.number})\nTonalidad: ${currentKey}\n\n${textToCopy}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process lyrics into rendered stanzas
  const renderLyrics = () => {
    let processedText = song.lyrics;
    if (semitones !== 0 || notation !== 'american') {
      processedText = transposeLyricsWithChords(song.lyrics, semitones, notation);
    }

    if (!showChords) {
      processedText = processedText.replace(/\[[^\]]+\]/g, '');
    }

    const lines = processedText.split('\n');

    return lines.map((line, idx) => {
      // Check if header line (CORO, II, III, etc.)
      const isHeader = /^(CORO|ÚLTIMO CORO|I|II|III|IV|V|VI|INTRO|PUENTE)$/i.test(line.trim());

      if (isHeader) {
        return (
          <div key={idx} className="font-extrabold text-amber-400 text-sm mt-4 mb-2 uppercase tracking-wider border-b border-amber-500/20 pb-0.5">
            {line.trim()}
          </div>
        );
      }

      // If line contains bracketed chords, render chords above lyrics cleanly
      if (showChords && line.includes('[')) {
        const parts: { chord?: string; text: string }[] = [];
        const regex = /\[([^\]]+)\]([^\[]*)/g;
        let lastIndex = 0;
        let match;

        // Any leading text before first chord
        const firstBracket = line.indexOf('[');
        if (firstBracket > 0) {
          parts.push({ text: line.substring(0, firstBracket) });
        }

        while ((match = regex.exec(line)) !== null) {
          parts.push({
            chord: match[1],
            text: match[2]
          });
          lastIndex = regex.lastIndex;
        }

        if (parts.length === 0) {
          return <div key={idx} className="my-1 leading-relaxed text-slate-200">{line}</div>;
        }

        return (
          <div key={idx} className="flex flex-wrap items-end my-2 leading-tight">
            {parts.map((p, pIdx) => (
              <div key={pIdx} className="inline-flex flex-col mr-1">
                {p.chord ? (
                  <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm bg-amber-400/10 px-1 rounded border border-amber-400/30 mb-0.5 select-all">
                    {p.chord}
                  </span>
                ) : (
                  <span className="h-4"></span>
                )}
                <span className="text-slate-100 whitespace-pre">{p.text || ' '}</span>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div key={idx} className="my-1 leading-relaxed text-slate-200">
          {line || <br />}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                #{song.number} • {BOOK_NAMES[song.book]}
              </span>
              <span className="text-xs text-slate-400">
                {song.category} {song.author ? `• ${song.author}` : ''}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
              {song.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(song.id)}
              className={`p-2 rounded-xl transition ${
                isFavorite 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Guardar en favoritos"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar Controls for Worship Director */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Key & Transpose Controls */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Tonalidad:</span>
            <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setSemitones(prev => prev - 1)}
                className="p-1 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition"
                title="Bajar medio tono (-1)"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              
              <span className="px-3 font-bold text-amber-300 min-w-[50px] text-center font-mono">
                {currentKey}
              </span>

              <button
                onClick={() => setSemitones(prev => prev + 1)}
                className="p-1 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition"
                title="Subir medio tono (+1)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {semitones !== 0 && (
                <button
                  onClick={() => setSemitones(0)}
                  className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-amber-400 transition ml-1"
                  title="Restablecer tono original"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Pitch Reference Tone Generator */}
            <button
              onClick={handlePitchPlay}
              className={`px-3 py-1.5 rounded-xl font-semibold border transition flex items-center gap-1.5 ${
                isPlayingPitch 
                  ? 'bg-indigo-500 text-white border-indigo-400 animate-pulse' 
                  : 'bg-indigo-950/60 text-indigo-300 border-indigo-800/80 hover:bg-indigo-900/80'
              }`}
              title="Escuchar tono de inicio / Pito de tono"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingPitch ? 'Sonando...' : 'Audio Tono'}</span>
            </button>
          </div>

          {/* Display Toggles */}
          <div className="flex items-center gap-2">
            {/* Show Chords Toggle */}
            <button
              onClick={() => setShowChords(!showChords)}
              className={`px-2.5 py-1.5 rounded-xl font-medium border transition flex items-center gap-1.5 ${
                showChords 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {showChords ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showChords ? 'Acordes' : 'Solo Letra'}</span>
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                className="px-2 py-0.5 hover:bg-slate-700 rounded-lg text-slate-300 text-xs font-bold"
                title="Reducir letra"
              >
                A-
              </button>
              <span className="px-1 text-[11px] text-slate-400 font-mono">{fontSize}px</span>
              <button
                onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
                className="px-2 py-0.5 hover:bg-slate-700 rounded-lg text-slate-300 text-xs font-bold"
                title="Aumentar letra"
              >
                A+
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition"
              title="Copiar letra y acordes"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Lyrics & Chords Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/50 space-y-2 font-sans" style={{ fontSize: `${fontSize}px` }}>
          {song.lyrics && song.lyrics.trim() ? (
            renderLyrics()
          ) : (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <BookOpen className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 font-serif">{song.title}</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Tonalidad asignada: <span className="text-amber-400 font-bold font-mono text-base px-2 py-0.5 bg-slate-800 rounded border border-slate-700">{currentKey}</span>
              </p>
              <div className="inline-flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700/80 text-xs text-slate-300">
                <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Utiliza el pito de tono superior para escuchar la referencia musical en {currentKey}.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onAddToSetlist(song, currentKey)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold rounded-xl text-xs border border-slate-700 transition flex items-center gap-2"
          >
            <ListPlus className="w-4 h-4 text-amber-400" />
            <span>Añadir a Lista de Culto</span>
          </button>

          <button
            onClick={() => onOpenStageMode(song, semitones)}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition flex items-center gap-2"
          >
            <Tv className="w-4 h-4" />
            <span>Modo Escenario (Teleprompter)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
