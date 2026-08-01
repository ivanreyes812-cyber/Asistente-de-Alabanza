import React, { useState } from 'react';
import { 
  ListMusic, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Tv, 
  Share2, 
  Calendar, 
  FileText, 
  Music,
  Check,
  Sparkles,
  Edit2
} from 'lucide-react';
import { Setlist, SetlistItem, Song, NotationSystem } from '../types';
import { formatKey } from '../utils/chordTransposer';
import { BOOK_NAMES } from '../data/songsRepository';

interface SetlistManagerProps {
  setlists: Setlist[];
  songsMap: Map<string, Song>;
  notation: NotationSystem;
  onUpdateSetlists: (setlists: Setlist[]) => void;
  onOpenStageModeWithSetlist: (songs: Song[], startIndex: number) => void;
  onSelectSong: (song: Song) => void;
}

export const SetlistManager: React.FC<SetlistManagerProps> = ({
  setlists,
  songsMap,
  notation,
  onUpdateSetlists,
  onOpenStageModeWithSetlist,
  onSelectSong
}) => {
  const [selectedSetlistId, setSelectedSetlistId] = useState<string>(setlists[0]?.id || '');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newServiceType, setNewServiceType] = useState<string>('Culto Dominical');
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const activeSetlist = setlists.find(s => s.id === selectedSetlistId) || setlists[0];

  const handleCreateSetlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSetlist: Setlist = {
      id: `setlist-${Date.now()}`,
      title: newTitle.trim(),
      date: new Date().toISOString().split('T')[0],
      serviceType: newServiceType,
      items: [],
      notes: '',
      createdAt: Date.now()
    };

    const updated = [newSetlist, ...setlists];
    onUpdateSetlists(updated);
    setSelectedSetlistId(newSetlist.id);
    setNewTitle('');
    setIsCreatingNew(false);
  };

  const handleDeleteSetlist = (id: string) => {
    if (confirm('¿Eliminar esta lista de culto?')) {
      const updated = setlists.filter(s => s.id !== id);
      onUpdateSetlists(updated);
      if (selectedSetlistId === id) {
        setSelectedSetlistId(updated[0]?.id || '');
      }
    }
  };

  const handleMoveItem = (setlistId: string, index: number, direction: 'up' | 'down') => {
    const targetSetlist = setlists.find(s => s.id === setlistId);
    if (!targetSetlist) return;

    const newItems = [...targetSetlist.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    const updated = setlists.map(s => s.id === setlistId ? { ...s, items: newItems } : s);
    onUpdateSetlists(updated);
  };

  const handleRemoveItem = (setlistId: string, itemId: string) => {
    const targetSetlist = setlists.find(s => s.id === setlistId);
    if (!targetSetlist) return;

    const newItems = targetSetlist.items.filter(i => sId(i) !== itemId);
    const updated = setlists.map(s => s.id === setlistId ? { ...s, items: newItems } : s);
    onUpdateSetlists(updated);
  };

  const sId = (item: SetlistItem) => item.id || item.songId;

  const handleItemNoteChange = (setlistId: string, itemId: string, notes: string) => {
    const targetSetlist = setlists.find(s => s.id === setlistId);
    if (!targetSetlist) return;

    const newItems = targetSetlist.items.map(i => sId(i) === itemId ? { ...i, notes } : i);
    const updated = setlists.map(s => s.id === setlistId ? { ...s, items: newItems } : s);
    onUpdateSetlists(updated);
  };

  const handleShareWhatsApp = () => {
    if (!activeSetlist) return;

    let text = `*📋 ${activeSetlist.title}*\n`;
    text += `📅 Fecha: ${activeSetlist.date} • ${activeSetlist.serviceType}\n`;
    if (activeSetlist.notes) text += `📝 Notas: ${activeSetlist.notes}\n`;
    text += `\n*ORDEN DE CÁNTICOS:*\n`;

    activeSetlist.items.forEach((item, idx) => {
      const song = songsMap.get(item.songId);
      if (song) {
        text += `${idx + 1}. *${song.title}* (#${song.number} - ${BOOK_NAMES[song.book]})\n`;
        text += `   🎼 Tono: ${item.selectedKey || song.originalKey}\n`;
        if (item.notes) text += `   💬 Nota: ${item.notes}\n`;
      }
    });

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // Convert setlist items into Song array for live stage mode
  const handleStartLiveService = () => {
    if (!activeSetlist || activeSetlist.items.length === 0) return;
    const songs: Song[] = activeSetlist.items
      .map(item => songsMap.get(item.songId))
      .filter((s): s is Song => Boolean(s));

    onOpenStageModeWithSetlist(songs, 0);
  };

  return (
    <div className="space-y-6">
      
      {/* Setlist Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ListMusic className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Planeación del Culto
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
            Listas de Culto & Liturgia
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Organiza el orden de alabanzas para cada servicio, ajusta notas de dirección y comparte la lista con el equipo de música.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg transition flex items-center gap-2 text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Lista de Culto</span>
        </button>
      </div>

      {/* Form: New Setlist Modal / Drawer */}
      {isCreatingNew && (
        <form onSubmit={handleCreateSetlist} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 shadow-2xl animate-fadeIn">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Crear Nueva Lista de Alabanza
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Título de la Reunión *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej. Culto Dominical de Mañana"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Tipo de Servicio</label>
              <select
                value={newServiceType}
                onChange={(e) => setNewServiceType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Culto Dominical">Culto Dominical</option>
                <option value="Escuela Dominical">Escuela Dominical</option>
                <option value="Culto de Jóvenes">Culto de Jóvenes</option>
                <option value="Culto de Oración">Culto de Oración</option>
                <option value="Vigilia / Adoración">Vigilia / Adoración</option>
                <option value="Especial de Damas">Especial de Damas</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-600 shadow"
            >
              Guardar Lista
            </button>
          </div>
        </form>
      )}

      {/* Setlists Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {setlists.map(setlist => {
          const isSelected = setlist.id === selectedSetlistId;
          return (
            <button
              key={setlist.id}
              onClick={() => setSelectedSetlistId(setlist.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 border flex items-center gap-2 ${
                isSelected 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' 
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{setlist.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                {setlist.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Setlist Details */}
      {activeSetlist ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          
          {/* Active Setlist Banner Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {activeSetlist.serviceType}
                </span>
                <span className="text-xs text-slate-400">{activeSetlist.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif tracking-tight mt-1">
                {activeSetlist.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow transition flex items-center gap-1.5"
                title="Compartir por WhatsApp"
              >
                <Share2 className="w-4 h-4" />
                <span>Enviar WhatsApp</span>
              </button>

              <button
                onClick={handleStartLiveService}
                disabled={activeSetlist.items.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs shadow transition flex items-center gap-1.5"
              >
                <Tv className="w-4 h-4" />
                <span>Iniciar Modo Servicio</span>
              </button>

              <button
                onClick={() => handleDeleteSetlist(activeSetlist.id)}
                className="p-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 rounded-xl transition border border-slate-700/60"
                title="Eliminar esta lista"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Songs List inside Setlist */}
          {activeSetlist.items.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/50 rounded-2xl border border-slate-800/80">
              <Music className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">Tu lista está vacía.</p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Explora el Himnario Lluvias, Manantial o Corario y presiona "+ Lista" para agregar los cánticos de tu servicio.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeSetlist.items.map((item, index) => {
                const song = songsMap.get(item.songId);
                if (!song) return null;

                const displayKey = formatKey(item.selectedKey || song.originalKey, 0, notation);

                return (
                  <div 
                    key={sId(item)}
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-slate-800 text-amber-400 font-extrabold text-xs shrink-0 mt-0.5">
                        {index + 1}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            onClick={() => onSelectSong(song)}
                            className="font-bold text-white hover:text-amber-300 cursor-pointer text-sm font-serif"
                          >
                            {song.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (#{song.number} • {BOOK_NAMES[song.book]})
                          </span>
                        </div>

                        {/* Note Editor */}
                        <div className="mt-1.5 flex items-center gap-2">
                          <input
                            type="text"
                            value={item.notes || ''}
                            onChange={(e) => handleItemNoteChange(activeSetlist.id, sId(item), e.target.value)}
                            placeholder="Añadir nota de dirección (ej. Repetir coro x2)..."
                            className="text-xs bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 w-full sm:w-72"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Key badge & reorder controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                      <span className="text-xs font-bold text-slate-950 bg-amber-400 px-2.5 py-1 rounded-md">
                        {displayKey}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveItem(activeSetlist.id, index, 'up')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-slate-300"
                          title="Mover arriba"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          disabled={index === activeSetlist.items.length - 1}
                          onClick={() => handleMoveItem(activeSetlist.id, index, 'down')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-slate-300"
                          title="Mover abajo"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(activeSetlist.id, sId(item))}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                          title="Quitar de la lista"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      ) : null}

    </div>
  );
};
