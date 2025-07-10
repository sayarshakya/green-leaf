'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: IconDefinition;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
  icon,
}) => {
  return (
    <div className={`rounded-xl p-3 sm:p-4 shadow-md ${className}`}>
      <div className="p-3 sm:p-4">
       <div className="absolute top-4 right-4 text-black/40 text-6xl pointer-events-none">
          {icon && <FontAwesomeIcon icon={icon} />}
        </div>
        <h3 className="text-base sm:text-lg text-black font-semibold mb-1">{title}</h3>
        {description && <p className="text-xl sm:text-2xl text-black mb-2 font-bold">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;
