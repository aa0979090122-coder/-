import React, { useEffect, useState } from 'react';

interface HitEffectProps {
  x: number;
  y: number;
  onComplete: () => void;
}

const hitWords = ["POW!", "BAM!", "WHACK!", "KAPOW!", "ZAP!"];

export const HitEffect: React.FC<HitEffectProps> = ({ x, y, onComplete }) => {
  const [word] = useState(() => hitWords[Math.floor(Math.random() * hitWords.length)]);
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="absolute pointer-events-none z-50 animate-ping"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative text-yellow-300 text-5xl font-extrabold text-stroke-black drop-shadow-lg">
        <span className="absolute transform rotate-[-15deg]">{word}</span>
        <span className="absolute transform scale-75 rotate-[20deg] opacity-75 text-orange-400">{word}</span>
      </div>
    </div>
  );
};
