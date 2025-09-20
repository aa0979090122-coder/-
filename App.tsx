import React, { useState, useCallback } from 'react';
import { Boss } from './components/Boss';
import { WeaponSelector } from './components/WeaponSelector';
import { Hand } from './components/Hand';
import { HitEffect } from './components/HitEffect';
import type { Weapon, BossReaction, HitEffectData } from './types';

const weapons: Weapon[] = [
  {
    id: 'glove',
    name: 'Boxing Glove',
    damage: 1,
    icon: <span className="text-5xl">🥊</span>,
    hand: (
      <div className="relative w-48 h-48">
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600 rounded-full shadow-lg border-4 border-white transform -rotate-12"></div>
        <div className="absolute bottom-8 right-24 w-16 h-16 bg-red-600 rounded-full shadow-lg border-4 border-white"></div>
        <div className="absolute bottom-0 right-10 w-20 h-8 bg-white rounded-b-lg shadow-inner"></div>
      </div>
    ),
  },
  {
    id: 'chicken',
    name: 'Rubber Chicken',
    damage: 2,
    icon: <span className="text-5xl">🐔</span>,
    hand: (
      <div className="w-48 h-48 transform -rotate-45 scale-x-[-1]">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          <path d="M100 150 Q150 150 160 100 Q170 50 120 40 Q70 30 60 80 Q50 130 100 150" fill="#FFD700"/>
          <path d="M120 40 Q110 20 130 20 Q150 20 140 40" fill="#FF4136"/>
          <circle cx="125" cy="35" r="3" fill="black"/>
        </svg>
      </div>
    ),
  },
  {
    id: 'fish',
    name: 'Slippery Fish',
    damage: 3,
    icon: <span className="text-5xl">🐟</span>,
    hand: (
       <div className="w-56 h-32 transform -rotate-30">
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
          <path d="M10 50 C 40 10, 160 10, 190 50 C 160 90, 40 90, 10 50" fill="#87CEEB"/>
          <path d="M170 50 C 190 30, 190 70, 170 50" fill="#87CEEB"/>
          <circle cx="30" cy="45" r="5" fill="white"/>
          <circle cx="32" cy="45" r="3" fill="black"/>
        </svg>
      </div>
    ),
  },
  {
    id: 'pillow',
    name: 'Pillow',
    damage: 0.5,
    icon: <span className="text-5xl">☁️</span>,
    hand: (
        <div className="w-48 h-36 bg-slate-100 rounded-2xl shadow-xl border-4 border-slate-200 p-2 transform rotate-[-20deg]">
            <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl"></div>
        </div>
    )
  }
];


export default function App() {
  const [currentWeapon, setCurrentWeapon] = useState<Weapon>(weapons[0]);
  const [isPunching, setIsPunching] = useState<boolean>(false);
  const [hitCount, setHitCount] = useState<number>(0);
  const [bossReaction, setBossReaction] = useState<BossReaction>('idle');
  const [hitEffects, setHitEffects] = useState<HitEffectData[]>([]);

  const handlePunch = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isPunching) return;

    setIsPunching(true);
    setHitCount(prev => prev + currentWeapon.damage);
    setBossReaction('hit');

    const newHit: HitEffectData = {
        id: Date.now(),
        x: event.clientX,
        y: event.clientY,
    };
    setHitEffects(prev => [...prev, newHit]);

    setTimeout(() => {
        setIsPunching(false);
    }, 150);
    
    setTimeout(() => {
        setBossReaction(hitCount > 100 ? 'dizzy' : 'idle');
    }, 500);

  }, [isPunching, currentWeapon.damage, hitCount]);
  
  const removeHitEffect = (id: number) => {
    setHitEffects(prev => prev.filter(effect => effect.id !== id));
  };
  
  const handleReset = () => {
      setHitCount(0);
      setBossReaction('idle');
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-sky-300 to-sky-500 flex flex-col items-center justify-center cursor-pointer select-none">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="absolute top-5 text-center text-white drop-shadow-lg">
        <h1 className="text-5xl md:text-6xl">STRESS RELIEF BOXING</h1>
        <p className="text-xl md:text-2xl mt-1">Total Hits: {Math.floor(hitCount)}</p>
      </div>
      
       {hitCount > 120 && (
         <button 
           onClick={handleReset}
           className="absolute top-24 mt-4 px-6 py-3 bg-yellow-400 text-white text-2xl rounded-full shadow-lg border-4 border-white hover:bg-yellow-500 transform hover:scale-105 transition-transform duration-200 z-50">
           Reset Boss
         </button>
       )}


      <div
        className="w-full h-full flex items-center justify-center"
        onClick={handlePunch}
      >
        <Boss reaction={bossReaction} hitCount={hitCount} />
      </div>
      
      {hitEffects.map(effect => (
          <HitEffect 
            key={effect.id} 
            x={effect.x} 
            y={effect.y} 
            onComplete={() => removeHitEffect(effect.id)} 
          />
      ))}

      <Hand weapon={currentWeapon} isPunching={isPunching} />

      <WeaponSelector
        weapons={weapons}
        selectedWeapon={currentWeapon}
        onSelectWeapon={setCurrentWeapon}
      />
    </main>
  );
}
