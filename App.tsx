import React, { useState } from 'react';
import { AppMode } from './types';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import GlassesTryOn from './components/GlassesTryOn';
import OutfitTryOn from './components/OutfitTryOn';
import FurniturePlacement from './components/FurniturePlacement';
import HomeDesign from './components/HomeDesign';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Glasses);

  const renderContent = () => {
    switch (mode) {
      case AppMode.Glasses:
        return <GlassesTryOn />;
      case AppMode.Outfit:
        return <OutfitTryOn />;
      case AppMode.Furniture:
        return <FurniturePlacement />;
      case AppMode.HomeDesign:
        return <HomeDesign />;
      default:
        return <GlassesTryOn />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">Visualize Your Vision</h2>
          <p className="text-lg sm:text-xl text-gray-400">Try on, place, or design anything. Powered by Gemini AI.</p>
        </div>
        <ModeSelector currentMode={mode} setMode={setMode} />
        <div className="mt-10 flex-grow animate-fade-in">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; 2024 VizFit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;