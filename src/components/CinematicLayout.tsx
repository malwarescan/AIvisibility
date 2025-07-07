"use client";

import { ReactNode } from 'react';

interface CinematicLayoutProps {
  children: ReactNode;
}

export function CinematicLayout({ children }: CinematicLayoutProps) {
  return (
    <div className="cinematic-layout">
      {children}
    </div>
  );
} 