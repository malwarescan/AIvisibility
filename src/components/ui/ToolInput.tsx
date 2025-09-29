import React, { useState, useEffect } from 'react';

export type InputType = 'url' | 'query' | 'text' | 'textarea' | 'number';

interface ToolInputProps {
  type: InputType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onEnter?: () => void;
  onValidate?: (value: string) => boolean;
  autoFocus?: boolean;
  maxLength?: number;
  rows?: number;
}

export const ToolInput: React.FC<ToolInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  onEnter,
  onValidate,
  autoFocus = false,
  maxLength,
  rows = 3,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  // Validation logic
  const validateInput = (inputValue: string): boolean => {
    if (required && !inputValue.trim()) return false;
    
    switch (type) {
      case 'url':
        try {
          new URL(inputValue);
          return true;
        } catch {
          return false;
        }
      case 'query':
        return inputValue.trim().length > 0;
      case 'text':
      case 'textarea':
        return inputValue.trim().length > 0;
      case 'number':
        return !isNaN(Number(inputValue)) && Number(inputValue) > 0;
      default:
        return true;
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (onValidate) {
      setIsValid(onValidate(newValue));
    } else {
      setIsValid(validateInput(newValue));
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  // Auto-validate on blur
  const handleBlur = () => {
    setIsFocused(false);
    if (onValidate) {
      setIsValid(onValidate(value));
    } else {
      setIsValid(validateInput(value));
    }
  };

  // Get placeholder text based on type
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (type) {
      case 'url':
        return 'https://example.com';
      case 'query':
        return 'Enter your search query...';
      case 'text':
        return 'Enter text...';
      case 'textarea':
        return 'Enter content...';
      case 'number':
        return 'Enter number...';
      default:
        return '';
    }
  };

  // Get input type for HTML input
  const getInputType = () => {
    switch (type) {
      case 'url':
        return 'url';
      case 'number':
        return 'number';
      default:
        return 'text';
    }
  };

  const inputClasses = `
    w-full px-4 py-3 border rounded-lg font-medium transition-all duration-200
    ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
    ${error || !isValid ? 'border-red-500 ring-2 ring-red-200' : ''}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
    focus:outline-none focus:ring-2 focus:ring-blue-200
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={getPlaceholder()}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          rows={rows}
          className={`${inputClasses} resize-vertical`}
        />
      ) : (
        <input
          type={getInputType()}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={getPlaceholder()}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className={inputClasses}
        />
      )}
      
      {/* Error message */}
      {(error || (!isValid && value && !isFocused)) && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error || `Invalid ${type} format`}
        </p>
      )}
      
      {/* Character count */}
      {maxLength && (
        <p className="text-xs text-gray-500 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};

export default ToolInput; 