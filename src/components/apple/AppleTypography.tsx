import React from 'react';

export function AppleHeading({ 
  children, 
  level = 1, 
  className = '' 
}: { 
  children: React.ReactNode; 
  level?: 1 | 2 | 3; 
  className?: string; 
}) {
  const baseClasses = "font-apple font-semibold tracking-tight";
  
  const levelClasses = {
    1: "text-4xl md:text-6xl lg:text-7xl leading-tight",
    2: "text-3xl md:text-4xl lg:text-5xl leading-tight", 
    3: "text-2xl md:text-3xl leading-snug"
  };

  const tagName = `h${level}` as 'h1' | 'h2' | 'h3';

  return React.createElement(tagName, {
    className: `${baseClasses} ${levelClasses[level]} ${className}`
  }, children);
}

export function AppleBody({ children, size = 'default', className = '' }: {
  children: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  className?: string;
}) {
  const sizeClasses = {
    small: 'text-base leading-relaxed',
    default: 'text-lg leading-relaxed',
    large: 'text-xl leading-relaxed'
  };

  return (
    <p className={`font-apple text-apple-gray-600 ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
} 