import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Clock, Volume2, RotateCcw } from 'lucide-react';
import { playMetronomeClick } from '../utils/chordTransposer';

interface MetronomeModalProps {
  onClose: () => void;
}

export const MetronomeModal: React.FC<MetronomeModalProps> = ({ onClose }) => {
  const [bpm, setBpm] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      const ms = (60 / bpm) * 1000;
      interval = setInterval(() => {
        setCurrentBeat(prev => {
          const nextBeat = (prev % beatsPerMeasure) + 1;
          playMetronomeClick(nextBeat === 1);
          return nextBeat;
        });
      }, ms);
    } else {
      setCurrentBeat(0);
    }

    return () => clearInterval(interval);
  }, [isPlaying, bpm, beatsPerMeasure]);

  const handleTapTempo = () => {
    const now = Date.now();
    tapTimesRef.current.push(now);

    // Keep last 4 taps
    if (tapTimesRef.current.length > 4) {
      tapTimesRef.current.shift();
    }

    if (tapTimesRef.current.length > 1) {
      const intervals: number[] = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }

      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white font-serif">Metrónomo Digital</h3>
              <p className="text-xs text-slate-400">Tempo de alabanza y adoración</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BPM Display & Pendulum */}
        <div className="text-center py-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
          <div className="text-5xl font-black font-mono text-emerald-400 tracking-tight">
            {bpm} <span className="text-xs font-sans text-slate-400 font-semibold uppercase">BPM</span>
          </div>

          {/* Visual Beat Indicator */}
          <div className="flex justify-center gap-3 py-2">
            {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
              const beatNum = idx + 1;
              const isActive = currentBeat === beatNum;
              const isAccent = beatNum === 1;

              return (
                <div
                  key={beatNum}
                  className={`w-6 h-6 rounded-full transition-all duration-100 flex items-center justify-center text-[10px] font-bold ${
                    isActive 
                      ? isAccent ? 'bg-amber-400 text-slate-950 scale-125 shadow-lg shadow-amber-400/50' : 'bg-emerald-400 text-slate-950 scale-110'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {beatNum}
                </div>
              );
            })}
          </div>
        </div>

        {/* BPM Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>40 (Lento/Adoración)</span>
            <span>240 (Jubiloso)</span>
          </div>
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Time Signature */}
        <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">Compás:</span>
          <div className="flex gap-1">
            {[2, 3, 4, 6].map(beats => (
              <button
                key={beats}
                onClick={() => setBeatsPerMeasure(beats)}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  beatsPerMeasure === beats 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {beats}/4
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleTapTempo}
            className="py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-2xl text-xs border border-slate-700 transition"
          >
            Tap Tempo (Ritmo)
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition ${
              isPlaying 
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-600' 
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-600'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Detener' : 'Iniciar'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
