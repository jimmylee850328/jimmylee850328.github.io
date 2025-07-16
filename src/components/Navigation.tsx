'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigationItems = [
  { name: 'About', href: '/about/' },
  { name: 'Resume', href: '/resume/' },
  { name: 'Portfolio', href: '/portfolio/' },
];

interface NavigationProps {
  variant?: 'desktop' | 'mobile';
}

export default function Navigation({ variant = 'desktop' }: NavigationProps) {
  const pathname = usePathname();

  // Desktop version - perfectly fitted to top-right corner
  if (variant === 'desktop') {
    return (
      <nav className="bg-accent-dark/80 backdrop-blur-sm rounded-bl-3xl border-l border-b border-border-dark/50 px-8 py-3">
        <div className="flex space-x-12">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname === '/' && item.href === '/about');

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 text-sm font-bold transition-all duration-300
                  ${
                    isActive
                      ? 'text-accent-gold'
                      : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // Mobile version - centered, no borders, clean look
  return (
    <nav className="flex justify-center">
      <div className="flex space-x-6">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === '/' && item.href === '/about');

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                relative px-4 py-2 text-sm font-bold transition-all duration-300
                ${
                  isActive
                    ? 'text-accent-gold'
                    : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
