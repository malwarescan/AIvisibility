interface AppleSectionProps {
  children: React.ReactNode;
  spacing?: 'normal' | 'large' | 'xl';
  background?: 'white' | 'gray' | 'dark';
}

export function AppleSection({ 
  children, 
  spacing = 'normal', 
  background = 'white' 
}: AppleSectionProps) {
  const spacingClasses = {
    normal: 'py-16 md:py-24',
    large: 'py-24 md:py-32',
    xl: 'py-32 md:py-40'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-apple-gray-50',
    dark: 'bg-apple-gray-900 text-white'
  };

  return (
    <section className={`
      ${spacingClasses[spacing]} 
      ${backgroundClasses[background]}
    `}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {children}
      </div>
    </section>
  );
} 