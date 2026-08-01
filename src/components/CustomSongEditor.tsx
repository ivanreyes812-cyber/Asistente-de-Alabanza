import React, { useState } from 'react';
import { PlusCircle, Save, Music, X } from 'lucide-react';
import { Song, Category, SongBookType } from '../types';

interface CustomSongEditorProps {
  onSaveSong: (newSong: Song) => void;
  onCancel?: () => void;
}

export const CustomSongEditor: React.FC<CustomSongEditorProps> = ({ onSaveSong, onCancel }) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<Category>('Adoración');
  const [originalKey, setOriginalKey] = useState<string>('G');
  const [author, setAuthor] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !lyrics.trim()) return;

    const newSong: Song = {
      id: `custom-${Date.now()}`,
      number: Math.floor(Math.random() * 800) + 100,
      title: title.trim(),
      book: 'custom',
      category,
      originalKey,
      author: author.trim() || 'Local / Personal',
      lyrics: lyrics.trim()
    };

    onSaveSong(newSong);
    setTitle('');
    setLyrics('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <PlusCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-bold text-lg text-white font-serif">Agregar Cántico Personal / Coro Local</h3>
            <p className="text-xs text-slate-400">Guarda canciones propias o arreglos locales de tu iglesia</p>
          </div>
        </div>

        {onCancel && (
          <button type="button" onClick={onCancel} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">Título del Cántico *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Santo es tu Nombre"
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Tonalidad Inicial *</label>
          <select
            value={originalKey}
            onChange={(e) => setOriginalKey(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
          >
            {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'Cm', 'Dm', 'Em', 'Am', 'Bm'].map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
          >
            {['Adoración', 'Alabanza', 'Consagración', 'Jóvenes', 'Infantil', 'Evangelismo', 'Espíritu Santo'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Autor / Compositor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ej. Ministerio de Alabanza"
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Letra con Acordes entre Corchetes [G] *
        </label>
        <p className="text-[11px] text-slate-400 mb-2">
          Escribe los acordes entre corchetes, por ejemplo: <code className="text-amber-300 font-mono">[G]Loores [C]dad a [D]Cristo</code>. Los acordes se transpondrán automáticamente.
        </p>
        <textarea
          required
          rows={8}
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder={`[G]Santo, [C]Santo, [D]Santo es el Señor...

CORO
[G]Bendito [C]sea tu [D]Nombre.`}
          className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-slate-100 font-mono focus:outline-none focus:border-purple-500 leading-relaxed"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs shadow-lg transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Guardar Cántico</span>
        </button>
      </div>
    </form>
  );
};
