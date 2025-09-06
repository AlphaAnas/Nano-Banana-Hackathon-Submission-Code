
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LogoIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">VizFit</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
