import React, { useState } from 'react';
import { ImageFile } from '../types';
import { generateImageWithGemini } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import ResultDisplay from './ResultDisplay';
import WebcamCapture from './WebcamCapture';
import { CameraIcon } from './Icons';

const OutfitTryOn: React.FC = () => {
  const [bodyPhoto, setBodyPhoto] = useState<ImageFile | null>(null);
  const [clothing, setClothing] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('Virtually dress me in this outfit. Make it look natural, like I\'m actually wearing it.');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!bodyPhoto || !clothing) {
      setError("Please upload both a body photo and a clothing image.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    
    const fullPrompt = `Task: Place the clothing from the second image onto the person in the first image.
    Instructions:
    1.  Ensure the clothing drapes naturally, matching the person's pose and body shape.
    2.  Maintain consistent lighting, shadows, and textures.
    3.  Preserve the original background.
    User's refinement: "${prompt}"`;

    try {
      const generatedImage = await generateImageWithGemini(fullPrompt, [bodyPhoto, clothing]);
      setResultImage(generatedImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebcamCapture = (imageFile: ImageFile) => {
    setBodyPhoto(imageFile);
    setShowWebcam(false);
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

  if (resultImage && bodyPhoto) {
    return <ResultDisplay originalImage={`data:${bodyPhoto.mimeType};base64,${bodyPhoto.base64}`} generatedImage={resultImage} onEdit={handleEdit} />;
  }


  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg space-y-6">
        <h3 className="text-xl font-semibold text-white text-center">Upload Your Images</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <ImageUploader label="Upload Body Photo" onImageUpload={setBodyPhoto} uploadedImage={bodyPhoto} />
          <ImageUploader label="Upload Clothing" onImageUpload={setClothing} uploadedImage={clothing} />
        </div>
        <button onClick={() => setShowWebcam(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <CameraIcon className="w-5 h-5" />
            Use Webcam for Body Photo
        </button>
        {showWebcam && <WebcamCapture onCapture={handleWebcamCapture} onClose={() => setShowWebcam(false)} />}
        <div>
          <label htmlFor="prompt-outfit" className="block text-sm font-medium text-gray-300 mb-1">Refine your request (optional)</label>
          <input
            id="prompt-outfit"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Change the shirt's pattern to stripes"
            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={!bodyPhoto || !clothing}
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Generate Outfit
        </button>
      </div>
    </div>
  );
};

export default OutfitTryOn;