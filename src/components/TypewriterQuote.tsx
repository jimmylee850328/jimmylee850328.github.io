'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const TypewriterComponent = dynamic(() => import('typewriter-effect'), {
  ssr: false,
});

interface TypewriterQuoteProps {
  className?: string;
}

export default function TypewriterQuote({
  className = '',
}: TypewriterQuoteProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`${className} h-10 sm:h-12 xl:h-16 flex items-center justify-center`}
      >
        <div className="text-hover-dark font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`${className} h-10 sm:h-12 xl:h-16 flex items-center justify-center`}
    >
      <div className="text-hover-dark font-medium text-center">
        <TypewriterComponent
          options={{
            strings: [
              'Hack it, until we make it',
              'Problem-solving is the core skill',
              'Code is poetry in motion',
              'Learning never stops',
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
          }}
        />
      </div>
    </div>
  );
}
