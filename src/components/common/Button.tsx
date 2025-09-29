import React from 'react';

/**
 * Generic Button component for shared use across all tools.
 *
 * @param {React.PropsWithChildren<ButtonProps>} props
 * @returns {JSX.Element}
 *
 * Usage:
 * <Button onClick={...} disabled={...} type="submit">Label</Button>
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button; 