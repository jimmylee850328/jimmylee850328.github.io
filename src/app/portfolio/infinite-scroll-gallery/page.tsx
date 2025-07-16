'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DogImage {
  message: string;
  status: string;
}

export default function InfiniteScrollGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchDogImages = useCallback(async () => {
    // Prevent duplicate requests
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const promises = Array.from({ length: 10 }, () =>
        fetch('https://dog.ceo/api/breeds/image/random').then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(promises);
      const newImages = results
        .filter((result: DogImage) => result.status === 'success')
        .map((result: DogImage) => result.message);

      setImages((prev) => [...prev, ...newImages]);

      // If loaded less than 10 images, API might have issues, stop loading
      if (newImages.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching dog images:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [hasMore]);

  // Initial load
  useEffect(() => {
    fetchDogImages();
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingRef.current && hasMore) {
          fetchDogImages();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchDogImages, hasMore]);

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
          Infinite Scroll Gallery
        </h1>

        <div className="bg-card-dark p-6 rounded-xl border border-border-dark mb-8">
          <p className="text-text-secondary mb-4">
            A React-based infinite scroll gallery that fetches random dog images
            from the Dog API. This project demonstrates API integration,
            infinite scrolling, performance optimization, and responsive design
            principles.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Key Features:
              </h3>
              <ul className="text-text-secondary space-y-1 text-sm">
                <li>• Infinite scroll with automatic image loading</li>
                <li>• Responsive masonry-style grid layout</li>
                <li>• Performance optimized with lazy loading</li>
                <li>• Error handling and loading states</li>
                <li>• Mobile-friendly design</li>
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
                  'Tailwind CSS',
                  'Dog API',
                  'Infinite Scroll',
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

      {/* Gallery Section */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-primary">
            🐕 Dog Gallery ({images.length} images loaded)
          </h2>
        </div>
      </div>

      {/* Images Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((imageUrl, index) => (
          <div
            key={`${imageUrl}-${index}`}
            className="break-inside-avoid bg-card-dark rounded-lg border border-border-dark overflow-hidden hover:border-hover-dark transition-colors group"
          >
            <Image
              src={imageUrl}
              alt={`Random dog ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => {
                // Hide broken images by setting display to none
                const imgElement = document.querySelector(
                  `[src="${imageUrl}"]`
                ) as HTMLElement;
                if (imgElement) imgElement.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>

      {/* Intersection Observer Target */}
      <div ref={loadMoreRef} className="h-4" />

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center text-text-secondary">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading more adorable dogs...
          </div>
        </div>
      )}

      {/* No More Images Indicator */}
      {!hasMore && images.length > 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">
            🎉 All dogs have been loaded! ({images.length} total images)
          </p>
        </div>
      )}

      {/* Scroll to Top Button */}
      {images.length > 20 && (
        <div className="fixed bottom-8 right-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-hover-dark text-white rounded-full shadow-lg hover:bg-highlight transition-colors flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
