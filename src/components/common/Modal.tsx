import React, { useEffect } from 'react';

/**
 * Generic Modal component for shared use across all tools.
 *
 * @param {React.PropsWithChildren<ModalProps>} props
 * @returns {JSX.Element}
 *
 * Usage:
 * <Modal isOpen={...} onClose={...} title="Title">Content</Modal>
 */
export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
        {title && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal; 