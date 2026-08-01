export type SongBookType = 'lluvias' | 'manantial' | 'corario' | 'custom';

export type Category = 
  | 'Adoración' 
  | 'Alabanza' 
  | 'Jóvenes' 
  | 'Juventud'
  | 'Infantil' 
  | 'Doctrina' 
  | 'Consagración' 
  | 'Consolación'
  | 'Evangelismo' 
  | 'Evangelismo e Invitación'
  | 'Espíritu Santo' 
  | 'Navidad'
  | 'Agradecimiento'
  | 'Misiones'
  | 'Misiones y Servicio a Dios'
  | 'Nuestra Esperanza'
  | 'Testimonio'
  | 'Amor Fraternal'
  | 'Amor de Dios'
  | 'Expresión de Adoración'
  | 'Búsqueda de Dios'
  | 'Reconocimiento'
  | 'Reconciliación'
  | 'Regocijo'
  | 'Animo'
  | 'Oración y Súplica'
  | 'Exhortación'
  | 'Atributos de Dios'
  | 'La Venida del Señor'
  | 'Confianza en Dios'
  | 'La Familia'
  | 'Protección Divina'
  | 'Dependencia de Dios'
  | 'Decisión y Compromiso'
  | 'Comunión y Oración'
  | 'Gracia y Salvación'
  | 'Especiales / Ocasiones'
  | 'Santidad y Vida Cristiana'
  | 'Clásicos';

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
