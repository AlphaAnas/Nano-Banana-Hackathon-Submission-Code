import React from 'react';
import { PencilIcon } from './Icons';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  onEdit: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, onEdit }) => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
        {/* Before Image */}
        <div className="flex flex-col items-center gap-3">
          <h4 className="text-xl font-semibold text-gray-300">Before</h4>
          <div className="w-full aspect-square bg-gray-900/50 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center ring-1 ring-white/10">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-contain" 
              aria-label="Original image before processing"
            />
          </div>
        </div>
        {/* After Image */}
        <div className="flex flex-col items-center gap-3">
          <h4 className="text-xl font-semibold text-gray-300">After</h4>
          <div className="w-full aspect-square bg-purple-900/10 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center ring-1 ring-purple-400/50">
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full h-full object-contain" 
              aria-label="Generated image after processing"
            />
          </div>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="mt-4 flex items-center justify-center gap-3 px-8 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
        aria-label="Refine or edit your inputs"
      >
        <PencilIcon className="w-5 h-5" />
        Refine or Edit
      </button>
    </div>
  );
};

export default ResultDisplay;