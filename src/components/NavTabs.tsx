import React from 'react';
import { 
  BookOpen, 
  Droplet, 
  Key, 
  ListMusic, 
  Heart, 
  PlusCircle, 
  Wrench, 
  Search 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavTabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  setlistsCount: number;
  customCount: number;
}

export const NavTabs: React.FC<NavTabsProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  setlistsCount,
  customCount
}) => {
  const tabs = [
    {
      id: 'search' as ActiveTab,
      label: 'Buscador',
      icon: Search,
      badge: null
    },
    {
      id: 'lluvias' as ActiveTab,
      label: 'Lluvias de Bendición',
      icon: BookOpen,
      badge: null,
      subText: '250+ Himnos'
    },
    {
      id: 'manantial' as ActiveTab,
      label: 'Manantial de Inspiración',
      icon: Droplet,
      badge: null,
      subText: '270+ Cantos'
    },
    {
      id: 'corario' as ActiveTab,
      label: 'Corario por Tonos',
      icon: Key,
      badge: null,
      subText: 'Coros C, D, E...'
    },
    {
      id: 'setlists' as ActiveTab,
      label: 'Listas de Culto',
      icon: ListMusic,
      badge: setlistsCount > 0 ? setlistsCount : null
    },
    {
      id: 'favorites' as ActiveTab,
      label: 'Favoritos',
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : null
    },
    {
      id: 'custom' as ActiveTab,
      label: 'Mis Cánticos',
      icon: PlusCircle,
      badge: customCount > 0 ? customCount : null
    },
    {
      id: 'tools' as ActiveTab,
      label: 'Herramientas',
      icon: Wrench,
      badge: null
    }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 shadow-inner">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0
                  ${isActive 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/50'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-amber-400 border border-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
