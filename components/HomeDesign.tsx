import React, { useState } from 'react';
import { ImageFile } from '../types';
import { generateImageWithGemini } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import ResultDisplay from './ResultDisplay';
import Examples from './Examples';

const homeDesignExamples = [
  { before: "home_archi_b4.jpg", after: "home_archi.png", label: "Modern Living Room" },
 
];


const HomeDesign: React.FC = () => {
  const [floorPlan, setFloorPlan] = useState<ImageFile | null>(null);
  const [styleImage, setStyleImage] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('Transform my floor plan into a beautiful, photorealistic living room. I\'m open to creative ideas, so design a modern and inviting space.');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!floorPlan) {
      setError("Please upload a floor plan to begin.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    
    let fullPrompt: string;
    const imagesToProcess: ImageFile[] = [floorPlan];

    if (styleImage) {
      imagesToProcess.push(styleImage);
      fullPrompt = `Task: Generate a photorealistic interior view based on the provided floor plan (first image) and style reference (second image).
      Instructions:
      1.  The layout of the room should follow the dimensions and structure shown in the floor plan.
      2.  The aesthetic, materials, color palette, and mood should be inspired by the style reference image.
      3.  Create a high-quality, realistic rendering of the interior space.
      User's design request: "${prompt}"`;
    } else {
      fullPrompt = `Task: Generate a photorealistic interior view of a TV lounge/living room based on the provided floor plan.
      Instructions:
      1.  Analyze the floor plan to understand the layout and dimensions of the main living area.
      2.  Invent a suitable, modern, and appealing architectural style and facade for the house.
      3.  Generate a high-quality, realistic rendering of the TV lounge/living room interior based on the floor plan and the style you've envisioned.
      User's design request: "${prompt}"`;
    }

    try {
      const generatedImage = await generateImageWithGemini(fullPrompt, imagesToProcess);
      setResultImage(generatedImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setResultImage(null);
    setError(null);
  };
  
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (resultImage && floorPlan) {
    return <ResultDisplay originalImage={`data:${floorPlan.mimeType};base64,${floorPlan.base64}`} generatedImage={resultImage} onEdit={handleEdit} />;
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <Examples title="Design Inspiration" examples={homeDesignExamples} />
      <div className="bg-gray-800/50 p-6 sm:p-8 rounded-lg shadow-lg space-y-8 mt-8">
        <h3 className="text-2xl font-bold text-white text-center">Visualize Your Home</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader label="1. Upload Floor Plan" onImageUpload={setFloorPlan} uploadedImage={floorPlan} />
          <ImageUploader label="2. Upload Facade/Style (Optional)" onImageUpload={setStyleImage} uploadedImage={styleImage} />
        </div>
        <div>
          <label htmlFor="prompt-design" className="block text-sm font-medium text-gray-300 mb-2">3. Design Instructions</label>
          <textarea
            id="prompt-design"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A cozy, rustic living room with a fireplace"
            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-3 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={!floorPlan}
          className="w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Visualize Home Design
        </button>
      </div>
    </div>
  );
};

export default HomeDesign;