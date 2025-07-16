'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: IconDefinition;
  bbg?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  className = '',
  icon,
  bbg
}) => {
  return (
   <div className={`relative rounded-xl p-3 sm:p-4 shadow-md ${className}`}>
    <div className="flex justify-between items-center relative p-2">
      {/* Left: Title + Description */}
      <div>
        <h3 className="text-base sm:text-lg text-black/90 font-semibold mb-1">{title}</h3>
        {description && (
          <p className="text-xl sm:text-2xl text-black/90 mb-2 font-semibold">
            {description}
          </p>
        )}
      </div>

      {/* Right: Icon */}
      <div className="text-green-950 text-5xl sm:text-6xl">
        {icon && <FontAwesomeIcon icon={icon} />}
      </div>
    </div>
      <div className={`${bbg} absolute bottom-0 left-0 right-0 h-4 rounded-b-xl`} />
    </div>
  );
};

export default Card;
