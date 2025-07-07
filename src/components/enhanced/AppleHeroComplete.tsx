"use client";

import { useState, useEffect } from 'react';
import { FlowingTextHero } from './FlowingTextHero';
import { AppleThreeJsHero } from './AppleThreeJsHero';
import { MorphingTextHero } from './MorphingTextHero';
import { HeroThreeJs } from '../HeroThreeJs';

type HeroVariant = 'flowing' | 'complete' | 'morphing' | 'original';

export function AppleHeroComplete() {
  const [variant, setVariant] = useState<HeroVariant>('flowing');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback to original if not mounted
  if (!mounted) {
    return <HeroThreeJs />;
  }

  const renderHero = () => {
    switch (variant) {
      case 'flowing':
        return <FlowingTextHero />;
      case 'complete':
        return <AppleThreeJsHero />;
      case 'morphing':
        return <MorphingTextHero />;
      default:
        return <HeroThreeJs />; // Fallback to original
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {renderHero()}
      
      {/* Development controls (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-lg rounded-lg p-4 z-50 shadow-lg border border-gray-200">
          <p className="text-sm font-medium mb-2 text-gray-700">Hero Variant:</p>
          <div className="space-x-2">
            {(['flowing', 'complete', 'morphing', 'original'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  variant === v 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 