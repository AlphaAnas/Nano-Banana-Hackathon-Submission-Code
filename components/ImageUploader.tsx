
import React, { useRef, useState } from 'react';
import { ImageFile } from '../types';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: ImageFile) => void;
  label: string;
  uploadedImage: ImageFile | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, label, uploadedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        if (base64) {
          onImageUpload({ base64, mimeType: file.type, name: file.name });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div
        onClick={handleAreaClick}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-purple-400 transition-colors"
      >
        {uploadedImage ? (
          <div className="relative group">
            <img 
              src={`data:${uploadedImage.mimeType};base64,${uploadedImage.base64}`} 
              alt="Uploaded preview" 
              className="max-h-48 rounded-md mx-auto"
            />
             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">Click to change</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <div className="flex text-sm text-gray-400">
              <p className="pl-1">Click to upload a file</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
