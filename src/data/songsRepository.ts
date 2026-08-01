import { Song, Setlist, SongBookType } from '../types';
import { lluviasSongs } from './lluviasSongs';
import { manantialSongs } from './manantialSongs';
import { corarioSongs } from './corarioSongs';

const CUSTOM_SONGS_KEY = 'pwa_worship_custom_songs';
const FAVORITES_KEY = 'pwa_worship_favorites';
const SETLISTS_KEY = 'pwa_worship_setlists';

export function getAllInitialSongs(): Song[] {
  return [...lluviasSongs, ...manantialSongs, ...corarioSongs];
}

export function loadCustomSongs(): Song[] {
  try {
    const saved = localStorage.getItem(CUSTOM_SONGS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load custom songs:', e);
    return [];
  }
}

export function saveCustomSongs(songs: Song[]) {
  try {
    localStorage.setItem(CUSTOM_SONGS_KEY, JSON.stringify(songs));
  } catch (e) {
    console.error('Failed to save custom songs:', e);
  }
}

export function loadFavorites(): string[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favIds: string[]) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favIds));
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
}

export function loadSetlists(): Setlist[] {
  try {
    const saved = localStorage.getItem(SETLISTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load setlists:', e);
  }

  // Default initial demo setlist if empty
  const defaultSetlist: Setlist = {
    id: 'setlist-demo-1',
    title: 'Culto Dominical de Adoración',
    date: new Date().toISOString().split('T')[0],
    serviceType: 'Culto Dominical',
    notes: 'Iniciar con oración y coros de júbilo en Re mayor. Pasar suavemente a adoración en Sol mayor.',
    createdAt: Date.now(),
    items: [
      { id: 'item-1', songId: 'manantial-4', selectedKey: 'G', notes: 'Coro de entrada alegre - 2 veces' },
      { id: 'item-2', songId: 'lluvias-1', selectedKey: 'G', notes: 'Himno congregacional #1' },
      { id: 'item-3', songId: 'manantial-7', selectedKey: 'G', notes: 'Momento de consagración' },
      { id: 'item-4', songId: 'manantial-168', selectedKey: 'A', notes: 'Adoración final con todo el ministerio' }
    ]
  };

  return [defaultSetlist];
}

export function saveSetlists(setlists: Setlist[]) {
  try {
    localStorage.setItem(SETLISTS_KEY, JSON.stringify(setlists));
  } catch (e) {
    console.error('Failed to save setlists:', e);
  }
}

export const BOOK_NAMES: Record<SongBookType, string> = {
  lluvias: 'Lluvias de Bendición',
  manantial: 'Manantial de Inspiración',
  corario: 'Corario con Tonalidades',
  custom: 'Mis Cánticos'
};
