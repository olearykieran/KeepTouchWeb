import React from 'react';
import { clsx } from 'clsx';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Primary button component with consistent styling
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className,
  fullWidth = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-6 py-3 rounded-lg font-medium transition-colors',
        'bg-blue-600 text-white shadow-sm',
        'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-blue-600',
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
