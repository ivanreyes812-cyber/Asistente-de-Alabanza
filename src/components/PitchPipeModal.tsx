import React, { useState } from 'react';
import { X, Volume2, Music, Sparkles } from 'lucide-react';
import { NotationSystem } from '../types';
import { 
  NOTES_AMERICAN, 
  NOTES_LATIN, 
  playReferenceTone, 
  stopReferenceTone 
} from '../utils/chordTransposer';

interface PitchPipeModalProps {
  notation: NotationSystem;
  onClose: () => void;
}

export const PitchPipeModal: React.FC<PitchPipeModalProps> = ({ notation, onClose }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handlePlayNote = (americanNote: string) => {
    setActiveNote(americanNote);
    playReferenceTone(americanNote, 3.5);
    setTimeout(() => {
      setActiveNote(null);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Volume2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white font-serif">Pito de Tono de Referencia</h3>
              <p className="text-xs text-slate-400">Generador de Tono Vocal de Inicio</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pitch Wheel / Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {NOTES_AMERICAN.map((note, idx) => {
            const latinName = NOTES_LATIN[idx];
            const isPlaying = activeNote === note;

            return (
              <button
                key={note}
                onClick={() => handlePlayNote(note)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border ${
                  isPlaying 
                    ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 border-amber-300 scale-105 shadow-lg shadow-amber-500/30 font-black' 
                    : 'bg-slate-950/80 hover:bg-slate-800 text-white border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <span className="text-base font-extrabold font-mono">
                  {notation === 'american' ? note : latinName}
                </span>
                <span className={`text-[10px] font-medium ${isPlaying ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                  {notation === 'american' ? latinName : note}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          Haz clic en la nota base de la canción para escuchar el tono sintetizado y afinar la voz antes de ministrar.
        </p>

      </div>
    </div>
  );
};
