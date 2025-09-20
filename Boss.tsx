import React from 'react';
import type { BossReaction } from '../types';

interface BossProps {
  reaction: BossReaction;
  hitCount: number;
}

const DizzyStars: React.FC = () => (
    <div className="absolute top-[-20px] w-full h-full">
        <span className="absolute left-[20%] top-[0%] text-3xl animate-ping">✨</span>
        <span className="absolute left-[70%] top-[10%] text-2xl animate-ping delay-200">⭐</span>
        <span className="absolute left-[50%] top-[-10%] text-4xl animate-ping delay-500">🌟</span>
    </div>
);

export const Boss: React.FC<BossProps> = ({ reaction, hitCount }) => {
  const isDizzy = hitCount >= 100;
  const hasFirstBruise = hitCount >= 25;
  const hasSecondBruise = hitCount >= 60;
  
  const reactionClasses = {
    idle: isDizzy ? 'animate-none rotate-[-3deg]' : 'animate-swell',
    hit: 'animate-shake',
    dizzy: 'animate-none rotate-[5deg] scale-95',
  };

  const currentReaction = isDizzy ? 'dizzy' : reaction;
  
  return (
    <div className={`relative w-64 h-80 md:w-80 md:h-96 transition-transform duration-300 ${reactionClasses[currentReaction]}`}>
      {/* Head */}
      <div className="absolute top-0 w-full h-48 md:h-56 bg-pink-200 rounded-full border-4 border-black shadow-2xl">
        {isDizzy && <DizzyStars />}
        {/* Hair */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-t-full">
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-pink-200 rounded-tr-full"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-pink-200 rounded-tl-full"></div>
        </div>
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-black flex items-center justify-center">
          <div className={`w-4 h-4 md:w-5 md:h-5 bg-black rounded-full transition-transform ${currentReaction === 'hit' ? 'scale-y-0' : ''}`}></div>
          {hasFirstBruise && <div className="absolute inset-[-5px] bg-purple-500/50 rounded-full blur-sm"></div>}
        </div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full border-2 border-black flex items-center justify-center">
          <div className={`w-4 h-4 md:w-5 md:h-5 bg-black rounded-full transition-transform ${currentReaction === 'hit' ? 'scale-y-0' : ''}`}></div>
          {hasSecondBruise && <div className="absolute inset-[-5px] bg-purple-500/50 rounded-full blur-sm"></div>}
        </div>

        {/* Mouth */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 border-t-4 border-black rounded-b-full transition-all ${currentReaction === 'hit' ? 'h-4 rounded-none border-t-0 border-b-4' : ''} ${isDizzy ? 'h-10 rotate-12' : ''}`}></div>
      </div>
      
      {/* Body */}
      <div className="absolute bottom-0 w-full h-40 md:h-48 bg-white rounded-t-3xl border-4 border-black">
        {/* Tie */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div className="w-8 h-4 bg-red-600 border-2 border-black clip-path-polygon-[50%_100%,_0_0,_100%_0]"></div>
            <div className="w-10 h-20 bg-red-600 border-2 border-black clip-path-polygon-[50%_100%,_0_0,_100%_0]"></div>
        </div>
        {/* Pocket */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-black"></div>
      </div>
    </div>
  );
};

// Custom clip-path utility for Tailwind config (not possible here, so we use style prop if needed, but direct classes are better if supported)
// For simplicity, this example will rely on browser defaults, but for a real project, you'd add this to tailwind.config.js
// theme: { extend: { clipPath: { 'polygon-shape': 'polygon(...)' } } }
// Since we can't do that, we rely on a hacky div shape or inline SVG for complex shapes. Here, CSS border tricks are used for the tie.
