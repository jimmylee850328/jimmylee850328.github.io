'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import './globals.css';
import Navigation from '@/components/Navigation';
import TypewriterQuote from '@/components/TypewriterQuote';
import { useState } from 'react';

// 響應式斷點常數
const BREAKPOINTS = {
  mobile: 580, // < 580px = mobile (down arrow)
  tablet: 1024, // 580px - 1279px = tablet (bottom bar, max-width: 896px)
  desktop: 1280, // >= 1280px = desktop (fixed sidebar)
} as const;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Modern Job Title Badge Component
  const JobTitleBadge = ({
    size = 'normal',
  }: {
    size?: 'normal' | 'small';
  }) => (
    <div
      className={`
      inline-flex items-center gap-2 px-4 py-2 
      bg-slate-900/80 backdrop-blur-sm
      border border-slate-600/50 rounded-xl
      hover:bg-slate-900/90 hover:border-slate-500/60
      transition-all duration-300 ease-out
      group cursor-default
      ${size === 'small' ? 'text-xs px-3 py-1.5' : 'text-sm'}
    `}
    >
      <span
        className={`
        ${size === 'small' ? 'text-xs' : 'text-sm'} 
        text-blue-400 font-mono font-bold
        group-hover:text-blue-300 group-hover:scale-110 
        transform transition-all duration-300
      `}
      >
        {'</>'}
      </span>
      <span className="text-slate-100 font-medium tracking-wide">
        Software Engineer
      </span>
    </div>
  );

  // Modern Location Component
  const LocationDisplay = ({
    size = 'normal',
  }: {
    size?: 'normal' | 'small';
  }) => (
    <div
      className={`
      flex items-center gap-2 text-slate-400
      ${size === 'small' ? 'text-xs' : 'text-sm'}
      hover:text-slate-300 transition-colors duration-200
    `}
    >
      <svg
        className={`
          ${size === 'small' ? 'w-3.5 h-3.5' : 'w-4 h-4'} 
          text-slate-500 flex-shrink-0
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span className="font-medium">Taipei, Taiwan</span>
    </div>
  );

  // Enhanced Contact Card Component
  const ContactCard = ({ compact = false }) => (
    <div className={`flex ${compact ? 'gap-3' : 'gap-4'} justify-center`}>
      {/* Email */}
      <a
        href="mailto:nightloveuu0328@gmail.com"
        className={`
          ${compact ? 'w-11 h-11' : 'w-12 h-12'} 
          bg-slate-800/80 backdrop-blur-sm rounded-xl 
          flex items-center justify-center 
          text-slate-300 border border-slate-700/50
          hover:bg-slate-700/80 hover:border-slate-600/60 
          hover:text-white hover:scale-105
          transition-all duration-300 ease-out
          shadow-lg shadow-black/20
        `}
        title="Send me an email"
      >
        <svg
          className={`${compact ? 'w-5 h-5' : 'w-5 h-5'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/jimmylee850328"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          ${compact ? 'w-11 h-11' : 'w-12 h-12'} 
          bg-slate-800/80 backdrop-blur-sm rounded-xl 
          flex items-center justify-center 
          text-slate-300 border border-slate-700/50
          hover:bg-slate-700/80 hover:border-slate-600/60 
          hover:text-white hover:scale-105
          transition-all duration-300 ease-out
          shadow-lg shadow-black/20
        `}
        title="Visit my GitHub"
      >
        <svg
          className={`${compact ? 'w-5 h-5' : 'w-5 h-5'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </div>
  );

  // Avatar Component with GIF animation
  const Avatar = ({
    size,
    centered = false,
  }: {
    size: 'small' | 'medium' | 'large';
    centered?: boolean;
  }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [gifSrc, setGifSrc] = useState('');
    const [gifLoaded, setGifLoaded] = useState(false);

    const sizeMap = {
      small: { container: 'w-14 h-14', image: 56 },
      medium: { container: 'w-20 h-20', image: 80 },
      large: { container: 'w-32 h-32', image: 128 },
    };

    const startAnimation = () => {
      // Create a new src with timestamp to force reload
      const timestamp = Date.now();
      setGifSrc(`/avatar.gif?t=${timestamp}`);
      setIsAnimating(true);
      setGifLoaded(false); // Reset loaded state
    };

    const handleMouseEnter = () => {
      startAnimation();
    };

    const handleMouseLeave = () => {
      setIsAnimating(false);
      setGifLoaded(false);
    };

    const handleClick = () => {
      // For mobile devices - toggle animation
      if (isAnimating) {
        setIsAnimating(false);
        setGifLoaded(false);
      } else {
        startAnimation();
      }
    };

    const handleGifLoad = () => {
      setGifLoaded(true);
    };

    return (
      <div
        className={`
            ${sizeMap[size].container} 
            rounded-2xl flex items-center justify-center 
            relative overflow-hidden flex-shrink-0
            ring-2 ring-yellow-400/20
            cursor-pointer transition-transform duration-200 ease-out
            hover:scale-[1.02]
            ${centered ? 'mx-auto' : ''}
          `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* PNG Image - Always present */}
        <Image
          src="/avatar.png"
          alt="Jimmy Lee"
          width={sizeMap[size].image}
          height={sizeMap[size].image}
          className={`w-full h-full object-cover rounded-2xl ${isAnimating && gifLoaded ? 'opacity-0' : 'opacity-100'}`}
          priority
        />

        {/* GIF Image - Only when animating */}
        {isAnimating && (
          <Image
            key={gifSrc}
            src={gifSrc}
            alt="Jimmy Lee"
            width={sizeMap[size].image}
            height={sizeMap[size].image}
            className="w-full h-full object-cover rounded-2xl absolute inset-0 opacity-100"
            onLoad={handleGifLoad}
            priority
            unoptimized
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-2xl"></div>
      </div>
    );
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          {
            '--breakpoint-mobile': `${BREAKPOINTS.mobile}px`,
            '--breakpoint-tablet': `${BREAKPOINTS.tablet}px`,
            '--breakpoint-desktop': `${BREAKPOINTS.desktop}px`,
          } as React.CSSProperties
        }
      >
        <div className="min-h-screen bg-primary-dark">
          {/* Desktop Layout (>= 1280px) */}
          <div className="hidden xl:block">
            <div className="p-8 max-w-[1600px] mx-auto">
              <div className="flex gap-8">
                {/* Left Fixed Personal Card Box */}
                <aside className="w-[380px] flex-shrink-0">
                  <div className="bg-card-dark rounded-2xl p-8 border border-border-dark shadow-lg fixed w-[380px] h-fit">
                    {/* Profile Section */}
                    <div className="text-center mb-8">
                      <div className="mb-6">
                        <Avatar size="large" centered />
                      </div>
                      <h1 className="text-2xl font-bold text-text-primary mb-4">
                        Jimmy Lee
                      </h1>
                      <div className="mb-3 flex justify-center">
                        <JobTitleBadge />
                      </div>
                      <div className="flex justify-center">
                        <LocationDisplay />
                      </div>
                    </div>

                    {/* Typewriter Quote - Always visible */}
                    <div className="mb-8">
                      <TypewriterQuote />
                    </div>

                    {/* Contact Card */}
                    <ContactCard />
                  </div>
                </aside>

                {/* Right Content Box - Takes remaining full space */}
                <main className="flex-1">
                  <div className="bg-card-dark rounded-2xl border border-border-dark min-h-screen relative overflow-hidden">
                    {/* Navigation inside right box */}
                    <div className="absolute top-0 right-0 z-10">
                      <Navigation variant="desktop" />
                    </div>

                    {/* Main Content */}
                    <div className="p-10 pt-20">{children}</div>
                  </div>
                </main>
              </div>
            </div>
          </div>

          {/* Tablet Layout with Bottom Bar (580px - 1279px) */}
          <div className="hidden min-[580px]:block xl:hidden min-h-screen pb-20">
            <div className="px-16 py-8 max-w-4xl mx-auto">
              {/* Horizontal Profile Card */}
              <div className="bg-card-dark rounded-2xl px-16 py-8 border border-border-dark shadow-lg mb-8 relative overflow-hidden">
                <div className="flex items-center space-x-4">
                  <Avatar size="medium" />
                  <div>
                    <h1 className="text-xl font-bold text-text-primary mb-3">
                      Jimmy Lee
                    </h1>
                    <div className="mb-2">
                      <JobTitleBadge size="small" />
                    </div>
                    <LocationDisplay size="small" />
                  </div>
                </div>

                {/* Typewriter Quote - Always visible */}
                <div className="mt-6">
                  <TypewriterQuote />
                </div>

                {/* Contact Card */}
                <div className="mt-8 pt-8 border-t border-border-dark">
                  <ContactCard compact />
                </div>
              </div>

              {/* Content Box */}
              <div className="bg-card-dark rounded-2xl border border-border-dark px-16 py-10 min-h-[calc(100vh-200px)]">
                {children}
              </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-card-dark px-16 py-4">
              <div className="max-w-4xl mx-auto">
                <Navigation variant="mobile" />
              </div>
            </div>
          </div>

          {/* Mobile Layout (< 580px) */}
          <div className="min-[580px]:hidden min-h-screen pb-20">
            <div className="p-3">
              {/* Compact Profile Card */}
              <div className="bg-card-dark rounded-2xl p-4 border border-border-dark shadow-lg mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar size="small" />
                  <div>
                    <h1 className="text-lg font-bold text-text-primary mb-2">
                      Jimmy Lee
                    </h1>
                    <div className="mb-1">
                      <JobTitleBadge size="small" />
                    </div>
                    <LocationDisplay size="small" />
                  </div>
                </div>

                {/* Typewriter Quote - Always visible */}
                <div className="mt-4">
                  <TypewriterQuote />
                </div>

                {/* Contact Card */}
                <div className="mt-4 pt-4 border-t border-border-dark">
                  <ContactCard compact />
                </div>
              </div>

              {/* Content Box */}
              <div className="bg-card-dark rounded-2xl border border-border-dark p-4 min-h-[calc(100vh-160px)]">
                {children}
              </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-card-dark p-3">
              <Navigation variant="mobile" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
