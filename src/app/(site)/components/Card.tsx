'use client';

import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  imageUrl?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
  imageUrl,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className={`max-w-xs rounded-lg shadow-sm border border-gray-200 overflow-hidden text-sm ${className}`}>
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        {description && <p className="text-black text-2xl mb-2 font-bold">{description}</p>}
        {children}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="mt-3 bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
