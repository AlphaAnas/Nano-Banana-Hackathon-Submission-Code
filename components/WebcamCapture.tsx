
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ImageFile } from '../types';
import { CameraIcon, SwitchCameraIcon } from './Icons';

interface WebcamCaptureProps {
  onCapture: (file: ImageFile) => void;
  onClose: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
      setError(null);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError("Could not access the camera. Please check permissions.");
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64 = dataUrl.split(',')[1];
      onCapture({ base64, mimeType: 'image/jpeg', name: 'webcam-capture.jpg' });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl max-w-lg w-full">
        <h3 className="text-lg font-medium text-white mb-4">Live Camera</h3>
        <div className="relative bg-gray-900 rounded-md overflow-hidden">
          {error ? (
            <div className="aspect-video flex items-center justify-center text-red-400 p-4">{error}</div>
          ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto aspect-video transform -scale-x-100" />
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCapture}
            disabled={!!error}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-500 transition-colors shadow-lg"
          >
            <CameraIcon className="w-5 h-5"/>
            Capture
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
