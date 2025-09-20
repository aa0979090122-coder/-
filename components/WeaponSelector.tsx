import React from 'react';
import type { Weapon } from '../types';

interface WeaponSelectorProps {
  weapons: Weapon[];
  selectedWeapon: Weapon;
  onSelectWeapon: (weapon: Weapon) => void;
}

export const WeaponSelector: React.FC<WeaponSelectorProps> = ({ weapons, selectedWeapon, onSelectWeapon }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm z-30">
      <div className="flex justify-center items-center space-x-4">
        {weapons.map((weapon) => (
          <button
            key={weapon.id}
            onClick={() => onSelectWeapon(weapon)}
            className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 transform hover:scale-110
              ${selectedWeapon.id === weapon.id ? 'bg-yellow-400 border-4 border-white shadow-lg' : 'bg-gray-700/80 border-2 border-gray-500'}
            `}
          >
            <div className="text-4xl">{weapon.icon}</div>
            <span className="text-white text-xs mt-1 truncate">{weapon.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
