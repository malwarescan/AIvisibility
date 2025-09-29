import React from 'react';

/**
 * Generic Card component for shared use across all tools.
 *
 * @param {React.PropsWithChildren<CardProps>} props
 * @returns {JSX.Element}
 *
 * Usage:
 * <Card title="Title" subtitle="Subtitle">Content</Card>
 */
export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
}) => (
  <div className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm ${className}`}>
    {(title || subtitle) && (
      <div className="mb-4">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

export default Card; 