'use client';

import { useState, useEffect } from 'react';
import { PhotoSize } from '@/types/id-photo';
import { generateIDPhotos, downloadPhoto } from '@/utils/photoGenerator';

interface PhotoGeneratorProps {
  croppedImage: string;
  photoSize: PhotoSize;
  onPhotosGenerated: (photos: string[]) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export default function PhotoGenerator({
  croppedImage,
  photoSize,
  onPhotosGenerated,
  isGenerating,
  setIsGenerating,
}: PhotoGeneratorProps) {
  const [generatedPhotos, setGeneratedPhotos] = useState<string[]>([]);

  const generatePhotos = async () => {
    if (!croppedImage) return;

    setIsGenerating(true);

    try {
      const photoDataUrl = await generateIDPhotos(croppedImage, photoSize);
      setGeneratedPhotos([photoDataUrl]);
      onPhotosGenerated([photoDataUrl]);
    } catch (error) {
      console.error('Generate photos failed:', error);
      alert('Generate photos failed, please try again');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (photoUrl: string, index: number) => {
    downloadPhoto(photoUrl, photoSize, index);
  };

  useEffect(() => {
    if (croppedImage && !isGenerating) {
      generatePhotos();
    }
  }, [croppedImage, photoSize]);

  return (
    <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
      <h2 className="text-xl font-semibold text-text-primary mb-4">
        Generated Photos
      </h2>

      {isGenerating ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highlight mx-auto mb-4"></div>
          <p className="text-text-secondary">Generating...</p>
        </div>
      ) : generatedPhotos.length > 0 ? (
        <div className="space-y-4">
          {generatedPhotos.map((photo, index) => (
            <div key={index} className="space-y-2">
              <div className="border border-border-dark rounded-lg p-4 bg-accent-dark">
                <img
                  src={photo}
                  alt={`Generated ID photo ${index + 1}`}
                  className="w-full h-auto max-h-96 object-contain"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDownload(photo, index)}
                  title="Right-click to download"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={() => handleDownload(photo, index)}
                  className="px-4 py-2 bg-highlight text-white rounded-lg hover:bg-highlight/80 transition-colors"
                >
                  Download Photo
                </button>
              </div>
            </div>
          ))}

          <div className="text-sm text-text-secondary text-center mt-4">
            <p>• Right-click on image to download on computer</p>
            <p>• Long-press on image to save on mobile</p>
            <p>• Ready for convenience store printing</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-text-secondary">
          Please crop an image first
        </div>
      )}
    </div>
  );
}
