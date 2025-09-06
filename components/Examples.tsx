import React from 'react';
import { ArrowRightIcon } from './Icons';

interface Example {
  before: string;
  after: string;
  label: string;
}

interface ExamplesProps {
  title: string;
  examples: Example[];
}

const Examples: React.FC<ExamplesProps> = ({ title, examples }) => {
  return (
    <div className="w-full max-w-7xl mx-auto text-center animate-fade-in">
      <h3 className="text-2xl font-bold text-purple-300 mb-4">{title}</h3>
      {/* if the title is "Design Inspiration , display only one image " */}
      {title === "Design Inspiration" ? (
        <div className="grid grid-cols-1 gap-6">
          {examples.map((ex, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <div className="w-full h-80 rounded-md overflow-hidden ring-1 ring-white/10">
                  <img src={ex.before} alt={`${ex.label} Before`} className="w-full h-full object-cover" />
                </div>
                <ArrowRightIcon className="w-6 h-6 text-purple-400 shrink-0" />
                <div className="w-full h-80 rounded-md overflow-hidden ring-1 ring-purple-400/50">
                  <img src={ex.after} alt={`${ex.label} After`} className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-300">{ex.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {examples.map((ex, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <div className="w-full h-80 rounded-md overflow-hidden ring-1 ring-white/10">
                  <img src={ex.before} alt={`${ex.label} Before`} className="w-full h-full object-cover" />
                </div>
                <ArrowRightIcon className="w-6 h-6 text-purple-400 shrink-0" />
                <div className="w-full h-80 rounded-md overflow-hidden ring-1 ring-purple-400/50">
                  <img src={ex.after} alt={`${ex.label} After`} className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-300">{ex.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Examples;
