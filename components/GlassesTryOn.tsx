import React, { useState } from 'react';
import { ImageFile } from '../types';
import { generateImageWithGemini } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import ResultDisplay from './ResultDisplay';
import WebcamCapture from './WebcamCapture';
import { CameraIcon } from './Icons';
import Examples from './Examples';

const glassesExamples = [
  { before: "glasses_b4_me.jpg", after: "glasses_after_me.png", label: "Aviator Sunglasses" },
  { before: "/cat_b4.png", after: "cat_after.png", label: "Round Prescription Glasses" },
];


const GlassesTryOn: React.FC = () => {
  const [selfie, setSelfie] = useState<ImageFile | null>(null);
  const [glasses, setGlasses] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('Show me how amazing I\'ll look wearing these glasses. Fit them perfectly to my face.');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!selfie || !glasses) {
      setError("Please upload both a selfie and a glasses image.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultImage(null);
    
    const fullPrompt = `Task: Place the glasses from the second image onto the person's face in the first image.
    Instructions:
    1.  Ensure a realistic fit, adjusting for head tilt, perspective, and lighting.
    2.  Preserve the original facial features and background.
    3.  The final image should be a photorealistic edit of the original selfie.
    User's refinement: "${prompt}"`;
    
    try {
      const generatedImage = await generateImageWithGemini(fullPrompt, [selfie, glasses]);
      setResultImage(generatedImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebcamCapture = (imageFile: ImageFile) => {
    setSelfie(imageFile);
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

  if (resultImage && selfie) {
    return <ResultDisplay originalImage={`data:${selfie.mimeType};base64,${selfie.base64}`} generatedImage={resultImage} onEdit={handleEdit} />;
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <Examples title="Get Inspired" examples={glassesExamples} />
      <div className="bg-gray-800/50 p-6 sm:p-8 rounded-lg shadow-lg space-y-8 mt-8">
        <h3 className="text-2xl font-bold text-white text-center">Create Your Own Try-On</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader label="1. Upload Your Selfie" onImageUpload={setSelfie} uploadedImage={selfie} />
          <ImageUploader label="2. Upload Glasses Image" onImageUpload={setGlasses} uploadedImage={glasses} />
        </div>
        <button onClick={() => setShowWebcam(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <CameraIcon className="w-5 h-5" />
            Use Webcam for Selfie
        </button>
        {showWebcam && <WebcamCapture onCapture={handleWebcamCapture} onClose={() => setShowWebcam(false)} />}
        <div>
          <label htmlFor="prompt-glasses" className="block text-sm font-medium text-gray-300 mb-2">3. Refine your request (optional)</label>
          <input
            id="prompt-glasses"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Make the lenses a bit darker"
            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-3 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={!selfie || !glasses}
          className="w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Generate Try-On
        </button>
      </div>
    </div>
  );
};

export default GlassesTryOn;