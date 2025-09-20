import React from 'react';
import type { Weapon } from '../types';

interface HandProps {
  weapon: Weapon;
  isPunching: boolean;
}

export const Hand: React.FC<HandProps> = ({ weapon, isPunching }) => {
  return (
    <div
      className={`absolute bottom-[-50px] right-[-50px] md:bottom-[-20px] md:right-[-20px] z-20 transition-transform duration-100 ease-out
        ${isPunching ? 'transform scale-150 -translate-x-48 -translate-y-48 md:-translate-x-64 md:-translate-y-64' : 'transform scale-100'}
      `}
    >
      {weapon.hand}
    </div>
  );
};
