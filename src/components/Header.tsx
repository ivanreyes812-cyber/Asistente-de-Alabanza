import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Search, 
  Clock, 
  Volume2, 
  Download, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';
import { NotationSystem, ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notation: NotationSystem;
  setNotation: (n: NotationSystem) => void;
  onOpenMetronome: () => void;
  onOpenPitchPipe: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  notation,
  setNotation,
  onOpenMetronome,
  onOpenPitchPipe,
  favoritesCount
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('search')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-900/50">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-100 font-serif">Alabanza PWA</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  By GandI
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Lluvias de Bendición • Manantial de Inspiración • Corario
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'search') setActiveTab('search');
                }}
                placeholder="Buscar por #, título, estrofa o letra..."
                className="w-full pl-9 pr-8 py-1.5 text-sm bg-slate-800/80 border border-slate-700/80 rounded-full text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="hidden md:flex items-center gap-2">
            {/* Notation Switcher (C, D, E vs Do, Re, Mi) */}
            <button
              onClick={() => setNotation(notation === 'american' ? 'latin' : 'american')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-slate-700 transition flex items-center gap-1"
              title="Cambiar notación musical (C,D,E vs Do,Re,Mi)"
            >
              <span>Tono:</span>
              <span className="font-bold text-white uppercase">{notation === 'american' ? 'C - D - E' : 'Do-Re-Mi'}</span>
            </button>

            {/* Pitch Pipe */}
            <button
              onClick={onOpenPitchPipe}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 border border-slate-700 transition flex items-center gap-1.5 font-medium"
              title="Tono de Referencia / Pito de Afinación"
            >
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <span>Tono</span>
            </button>

            {/* Metronome */}
            <button
              onClick={onOpenMetronome}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-emerald-300 border border-slate-700 transition flex items-center gap-1.5 font-medium"
              title="Metrónomo"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Metrónomo</span>
            </button>

            {/* PWA Install Button */}
            {deferredPrompt && !isInstalled && (
              <button
                onClick={handleInstallPWA}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-xs text-slate-950 font-bold shadow transition flex items-center gap-1.5 animate-pulse"
                title="Instalar App PWA en dispositivo"
              >
                <Download className="w-4 h-4" />
                <span>Instalar PWA</span>
              </button>
            )}

            {/* Online Status */}
            <div className="flex items-center text-xs text-slate-400 ml-1" title={isOnline ? 'Modo Online / Sincronizado' : 'Modo Offline Activado'}>
              {isOnline ? (
                <Wifi className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="flex items-center gap-1 text-amber-400 font-medium bg-amber-950/40 px-2 py-1 rounded border border-amber-800/40">
                  <WifiOff className="w-3.5 h-3.5" /> Offline
                </span>
              )}
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={onOpenPitchPipe}
              className="p-2 rounded-lg bg-slate-800 text-indigo-300"
              title="Pito de Tono"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenMetronome}
              className="p-2 rounded-lg bg-slate-800 text-emerald-300"
              title="Metrónomo"
            >
              <Clock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400">Notación de Acordes:</span>
            <button
              onClick={() => setNotation(notation === 'american' ? 'latin' : 'american')}
              className="px-3 py-1 bg-slate-800 text-amber-300 text-xs font-bold rounded border border-slate-700"
            >
              {notation === 'american' ? 'C - D - E (Americana)' : 'Do - Re - Mi (Latina)'}
            </button>
          </div>

          {deferredPrompt && !isInstalled && (
            <button
              onClick={handleInstallPWA}
              className="w-full py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Instalar Aplicación PWA
            </button>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
            <span>Estado de red:</span>
            <span className={isOnline ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
              {isOnline ? 'Conectado (Offline Creado)' : '100% Offline Listo'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
