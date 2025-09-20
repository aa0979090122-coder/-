export interface Weapon {
  id: string;
  name: string;
  icon: JSX.Element;
  hand: JSX.Element;
  damage: number;
}

export type BossReaction = 'idle' | 'hit' | 'dizzy';

export interface HitEffectData {
    id: number;
    x: number;
    y: number;
}
