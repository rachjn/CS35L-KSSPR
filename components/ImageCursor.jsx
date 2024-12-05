'use client'

import React, { useState, useEffect } from 'react';

const ImageCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);
  
  return (
    <div 
      className="fixed pointer-events-none w-8 h-8 -ml-4 -mt-4 z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundImage: `url('/game_cursor.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transform: 'translate(0, 0)',
      }}
    />
  );
};

export default ImageCursor;