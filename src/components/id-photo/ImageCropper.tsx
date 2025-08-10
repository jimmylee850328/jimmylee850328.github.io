'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { PhotoSize } from '@/types/id-photo';

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedImageUrl: string) => void;
  photoSize: PhotoSize;
}

export default function ImageCropper({
  imageUrl,
  onCrop,
  photoSize,
}: ImageCropperProps) {
  // Compute crop aspect ratio based on selected photo size
  const aspectRatio = useMemo(() => {
    // 2-inch ratio is 35:45 = 7:9
    // 1-inch ratio is 25:35 = 5:7
    return photoSize === '2inch' ? 7 / 9 : 5 / 7;
  }, [photoSize]);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCropping, setIsCropping] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset crop when photo size changes so ReactCrop re-initializes
  useEffect(() => {
    setCrop(undefined);
    setCompletedCrop(undefined);
  }, [photoSize]);

  const onCropChange = useCallback((crop: Crop) => {
    setCrop(crop);
  }, []);

  const onCropComplete = useCallback((crop: PixelCrop) => {
    setCompletedCrop(crop);
  }, []);

  const handleCrop = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsCropping(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Cannot create canvas context');
      }

      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
      onCrop(croppedImageUrl);
    } catch (error) {
      console.error('Cropping failed:', error);
      alert('Cropping failed, please try again');
    } finally {
      setIsCropping(false);
    }
  };

  const handleReset = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  return (
    <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        Crop Image
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
            aspect={aspectRatio}
            locked={false}
            minWidth={50}
            minHeight={50}
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Uploaded image"
              className="max-w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
          </ReactCrop>
        </div>

        <div className="text-sm text-text-secondary text-center">
          Ratio is locked, you can resize the crop area while maintaining the
          aspect ratio
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-accent-dark text-text-secondary rounded-lg hover:text-text-primary transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleCrop}
            disabled={!completedCrop || isCropping}
            className="px-6 py-2 bg-highlight text-white rounded-lg hover:bg-highlight/80 disabled:bg-accent-dark disabled:text-text-secondary disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isCropping ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Cropping...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Crop
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
