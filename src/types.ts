export type SongBookType = 'lluvias' | 'manantial' | 'corario' | 'custom';

export type Category = 
  | 'Adoración' 
  | 'Alabanza' 
  | 'Consagración' 
  | 'Clásicos'
  | 'La Venida del Señor'
  | 'Confianza en Dios'
  | 'Consolación y Ánimo'
  | 'Consolación'
  | 'Evangelismo e Invitación'
  | 'Evangelismo'
  | 'Especiales y Ocasiones'
  | 'Especiales / Ocasiones'
  | 'Doctrina'
  | 'Agradecimiento y Testimonio'
  | 'Agradecimiento'
  | 'Espíritu Santo'
  | 'Misiones y Servicio'
  | 'Misiones'
  | 'Misiones y Servicio a Dios'
  | 'Gracia y Salvación'
  | 'Oración y Comunión'
  | 'Comunión y Oración'
  | 'Jóvenes y Juventud'
  | 'Jóvenes'
  | 'Juventud'
  | 'Infantil' 
  | 'Navidad'
  | (string & {});

export type NotationSystem = 'american' | 'latin'; // 'american' (C, D, E) or 'latin' (Do, Re, Mi)

export interface Song {
  id: string;
  number: number;
  title: string;
  book: SongBookType;
  category: Category;
  originalKey: string;
  bpm?: number;
  timeSignature?: string;
  author?: string;
  lyrics: string; // Formatting with [C], [G], [Am] bracketed chords
  tags?: string[];
  isFavorite?: boolean;
}

export interface SetlistItem {
  id: string;
  songId: string;
  selectedKey: string;
  notes?: string;
  durationMinutes?: number;
}

export interface Setlist {
  id: string;
  title: string;
  date: string;
  serviceType: string;
  items: SetlistItem[];
  notes?: string;
  createdAt: number;
}

export type ActiveTab = 'search' | 'lluvias' | 'manantial' | 'corario' | 'setlists' | 'favorites' | 'custom' | 'tools';
