import React from 'react';
import { clsx } from 'clsx';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Chip component for selection options
 */
const Chip: React.FC<ChipProps> = ({ 
  label, 
  selected = false, 
  onClick, 
  className 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        selected ? 
          'bg-blue-100 text-blue-800 border border-blue-300' : 
          'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200',
        className
      )}
    >
      {label}
    </button>
  );
};

export default Chip;
