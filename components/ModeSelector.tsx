
import React from 'react';
import { AppMode } from '../types';
import { GlassesIcon, ShirtIcon, SofaIcon, HomeIcon } from './Icons';

interface ModeSelectorProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const modes = [
  { id: AppMode.Glasses, label: 'Glasses Try-On', icon: GlassesIcon },
  { id: AppMode.Outfit, label: 'Outfit Try-On', icon: ShirtIcon },
  { id: AppMode.Furniture, label: 'Furniture Placement', icon: SofaIcon },
  { id: AppMode.HomeDesign, label: 'Home Design', icon: HomeIcon },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, setMode }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-2 flex flex-wrap justify-center gap-2 md:gap-4">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setMode(id)}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
            ${
              currentMode === id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }
          `}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
