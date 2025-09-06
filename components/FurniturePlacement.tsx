import React, { useState } from 'react';
import { ImageFile } from '../types';
import { generateImageWithGemini } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import ResultDisplay from './ResultDisplay';

const FurniturePlacement: React.FC = () => {
  const [roomPhoto, setRoomPhoto] = useState<ImageFile | null>(null);
  const [furniture, setFurniture] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('Place this furniture in my room. Show me how it would look, matching the lighting and perspective perfectly.');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!roomPhoto || !furniture) {
      setError("Please upload both a room photo and a furniture image.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    
    const fullPrompt = `Task: Place the furniture from the second image into the room in the first image.
    Instructions:
    1.  Integrate the furniture naturally, matching the room's scale, perspective, and lighting.
    2.  Cast realistic shadows based on the room's light sources.
    3.  Preserve the original room's architecture and other objects.
    User's placement instruction: "${prompt}"`;

    try {
      const generatedImage = await generateImageWithGemini(fullPrompt, [roomPhoto, furniture]);
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

  if (resultImage && roomPhoto) {
    return <ResultDisplay originalImage={`data:${roomPhoto.mimeType};base64,${roomPhoto.base64}`} generatedImage={resultImage} onEdit={handleEdit} />;
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg space-y-6">
        <h3 className="text-xl font-semibold text-white text-center">Upload Your Images</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <ImageUploader label="Upload Room Photo" onImageUpload={setRoomPhoto} uploadedImage={roomPhoto} />
          <ImageUploader label="Upload Furniture" onImageUpload={setFurniture} uploadedImage={furniture} />
        </div>
        <div>
          <label htmlFor="prompt-furniture" className="block text-sm font-medium text-gray-300 mb-1">Placement Instructions</label>
          <input
            id="prompt-furniture"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Rotate the sofa 45 degrees"
            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={!roomPhoto || !furniture}
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Place Furniture
        </button>
      </div>
    </div>
  );
};

export default FurniturePlacement;