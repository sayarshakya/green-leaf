'use client';

import Image from 'next/image';
import React from 'react';

const Loading: React.FC = () => {
  return (
     <div className="min-h-screen flex items-center justify-center">
       <Image
        src="/cannabis.svg"
        alt="Loading..."
        width= "90"
        height= "90"
        className={`animate-bounce`}
      />
     </div>
  );
};

export default Loading;
