'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PhotoSize } from '@/types/id-photo';
import ImageUploader from '@/components/id-photo/ImageUploader';
import ImageCropper from '@/components/id-photo/ImageCropper';
import PhotoGenerator from '@/components/id-photo/PhotoGenerator';

// Main page component
export default function IDPhotoGenerator() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<PhotoSize>('2inch');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCroppedImage(null);
  };

  const handleImageCrop = (croppedImageUrl: string) => {
    setCroppedImage(croppedImageUrl);
  };

  const resetAll = () => {
    setUploadedImage(null);
    setCroppedImage(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-text-secondary hover:text-hover-dark transition-colors mr-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Portfolio
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
          ID Photo Generator
        </h1>

        <div className="bg-card-dark p-6 rounded-xl border border-border-dark mb-8">
          <p className="text-text-secondary mb-4">
            A professional online ID photo generator that supports 1-inch and
            2-inch photo specifications. Generate high-quality ID photos that
            are compatible with convenience store printing.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Key Features:
              </h3>
              <ul className="text-text-secondary space-y-1 text-sm">
                <li>• Support for 1-inch and 2-inch photo specifications</li>
                <li>• Smart cropping with fixed aspect ratios</li>
                <li>• Automatic layout for printing sheets</li>
                <li>• Convenience store compatible output</li>
                <li>• One-click download functionality</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Technologies Used:
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'React',
                  'TypeScript',
                  'Next.js',
                  'Canvas API',
                  'Image Processing',
                  'Tailwind CSS',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-accent-dark text-text-primary rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Upload and Crop */}
        <div className="space-y-6">
          {/* Size Selection */}
          <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Select Size
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedSize('2inch')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedSize === '2inch'
                    ? 'bg-highlight text-white'
                    : 'bg-accent-dark text-text-secondary hover:text-text-primary'
                }`}
              >
                2 inch (8 photos)
              </button>
              <button
                onClick={() => setSelectedSize('1inch')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedSize === '1inch'
                    ? 'bg-highlight text-white'
                    : 'bg-accent-dark text-text-secondary hover:text-text-primary'
                }`}
              >
                1 inch (10 photos)
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <ImageUploader onImageUpload={handleImageUpload} />

          {/* Image Crop */}
          {uploadedImage && (
            <ImageCropper
              imageUrl={uploadedImage}
              onCrop={handleImageCrop}
              photoSize={selectedSize}
            />
          )}

          {/* Instructions */}
          <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Instructions
            </h2>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li className="flex items-start">
                <span className="text-highlight mr-2">•</span>
                Upload a compliant headshot with sufficient resolution
              </li>
              <li className="flex items-start">
                <span className="text-highlight mr-2">•</span>
                Crop the photo with the locked aspect ratio
              </li>
              <li className="flex items-start">
                <span className="text-highlight mr-2">•</span>
                Right-click to download on computer, long-press on mobile
              </li>
            </ul>
          </div>
        </div>

        {/* Right Panel - Preview and Generate */}
        <div className="space-y-6">
          {/* Photo Generator */}
          {croppedImage && (
            <PhotoGenerator
              croppedImage={croppedImage}
              photoSize={selectedSize}
              onPhotosGenerated={() => {}}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          )}

          {/* Reset Button */}
          {uploadedImage && (
            <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
              <button
                onClick={resetAll}
                className="w-full bg-accent-dark text-text-secondary py-3 px-6 rounded-lg font-medium hover:text-text-primary transition-colors"
              >
                Reset All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
