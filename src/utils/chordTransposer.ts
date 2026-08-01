import { NotationSystem } from '../types';

// Musical notes in chromatic scale
export const NOTES_AMERICAN = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const NOTES_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const NOTES_LATIN = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
export const NOTES_LATIN_FLATS = ['Do', 'Reb', 'Re', 'Mib', 'Mi', 'Fa', 'Solb', 'Sol', 'Lab', 'La', 'Sib', 'Si'];

// Frequencies for root pitch tones (A4 = 440Hz base)
export const NOTE_FREQUENCIES: Record<string, number> = {
  'C': 261.63,
  'C#': 277.18,
  'Db': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'Eb': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'Gb': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'Ab': 415.30,
  'A': 440.00,
  'A#': 466.16,
  'Bb': 466.16,
  'B': 493.88,
};

/**
 * Standardizes a note or chord root to an index in 0..11
 */
export function getNoteIndex(note: string): number {
  const cleanNote = note.trim();
  // Check American
  let idx = NOTES_AMERICAN.indexOf(cleanNote);
  if (idx !== -1) return idx;
  idx = NOTES_FLATS.indexOf(cleanNote);
  if (idx !== -1) return idx;

  // Check Latin
  idx = NOTES_LATIN.indexOf(cleanNote);
  if (idx !== -1) return idx;
  idx = NOTES_LATIN_FLATS.indexOf(cleanNote);
  if (idx !== -1) return idx;

  // Alias checks
  if (cleanNote === 'Do') return 0;
  if (cleanNote === 'Re') return 2;
  if (cleanNote === 'Mi') return 4;
  if (cleanNote === 'Fa') return 5;
  if (cleanNote === 'Sol') return 7;
  if (cleanNote === 'La') return 9;
  if (cleanNote === 'Si') return 11;

  return 0;
}

/**
 * Converts a note name or chord root between systems and key offsets
 */
export function formatNote(noteIndex: number, system: NotationSystem = 'american', preferFlat: boolean = false): string {
  const normalizedIndex = ((noteIndex % 12) + 12) % 12;
  if (system === 'latin') {
    return preferFlat ? NOTES_LATIN_FLATS[normalizedIndex] : NOTES_LATIN[normalizedIndex];
  }
  return preferFlat ? NOTES_FLATS[normalizedIndex] : NOTES_AMERICAN[normalizedIndex];
}

/**
 * Transposes a single chord string (e.g., "G", "Am7", "F#/A#", "Cadd9", "Solm", "Do7")
 */
export function transposeChord(chord: string, semitones: number, notation: NotationSystem = 'american'): string {
  if (!chord) return '';

  // Match root note and chord quality/extension/slash bass
  // E.g., "F#/A#" -> root "F#", ext "", slash "A#"
  const regex = /^([A-G][#b]?|Do[#b]?|Re[#b]?|Mi[#b]?|Fa[#b]?|Sol[#b]?|La[#b]?|Si[#b]?)([^/]*)(?:\/([A-G][#b]?|Do[#b]?|Re[#b]?|Mi[#b]?|Fa[#b]?|Sol[#b]?|La[#b]?|Si[#b]?))?$/i;
  const match = chord.trim().match(regex);

  if (!match) return chord; // Return as-is if unparseable

  const root = match[1];
  const ext = match[2] || '';
  const slashNote = match[3];

  const rootIdx = getNoteIndex(root);
  const transposedRootIdx = rootIdx + semitones;
  const newRoot = formatNote(transposedRootIdx, notation);

  let result = newRoot + ext;

  if (slashNote) {
    const slashIdx = getNoteIndex(slashNote);
    const transposedSlashIdx = slashIdx + semitones;
    const newSlash = formatNote(transposedSlashIdx, notation);
    result += '/' + newSlash;
  }

  return result;
}

/**
 * Parses text containing bracketed chords [C] and transposes them
 */
export function transposeLyricsWithChords(lyrics: string, semitones: number, notation: NotationSystem = 'american'): string {
  if (semitones === 0 && notation === 'american') return lyrics;

  return lyrics.replace(/\[([^\]]+)\]/g, (_, chord) => {
    const transposed = transposeChord(chord, semitones, notation);
    return `[${transposed}]`;
  });
}

/**
 * Formats a song title key (e.g. "G" -> "Sol" if latin)
 */
export function formatKey(key: string, semitones: number = 0, notation: NotationSystem = 'american'): string {
  if (!key) return '';
  const isMinor = key.endsWith('m') || key.endsWith('m');
  const baseKey = key.replace(/m$/i, '');
  const rootIdx = getNoteIndex(baseKey);
  const transposed = formatNote(rootIdx + semitones, notation);
  return transposed + (isMinor ? 'm' : '');
}

/**
 * Audio Synth Pitch Pipe (Reference Tone Generator)
 */
let audioCtx: AudioContext | null = null;
let activeOscillator: OscillatorNode | null = null;
let activeGain: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playReferenceTone(keyName: string, durationSeconds: number = 2.5) {
  try {
    const ctx = getAudioContext();
    stopReferenceTone();

    const rootNote = keyName.replace(/m$/i, '').trim();
    const freq = NOTE_FREQUENCIES[rootNote] || 440;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSeconds);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationSeconds);

    activeOscillator = osc;
    activeGain = gain;
  } catch (e) {
    console.error('Audio tone error', e);
  }
}

export function stopReferenceTone() {
  if (activeOscillator) {
    try {
      activeOscillator.stop();
      activeOscillator.disconnect();
    } catch {
      // ignore
    }
    activeOscillator = null;
  }
}

export function playMetronomeClick(accent: boolean = false) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(accent ? 1200 : 800, ctx.currentTime);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.error('Metronome click error', e);
  }
}
