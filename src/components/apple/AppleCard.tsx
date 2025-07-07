interface AppleCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  className?: string;
}

export function AppleCard({ children, variant = 'default', className = '' }: AppleCardProps) {
  const variants = {
    default: 'bg-white border border-apple-gray-200 shadow-apple',
    glass: 'bg-white/70 backdrop-blur-apple border border-white/20 shadow-apple-glass',
    elevated: 'bg-white shadow-apple-lg border border-apple-gray-100'
  };

  return (
    <div className={`
      rounded-apple-card p-8 transition-all duration-300 
      hover:shadow-apple-lg hover:-translate-y-1
      ${variants[variant]} ${className}
    `}>
      {children}
    </div>
  );
} 