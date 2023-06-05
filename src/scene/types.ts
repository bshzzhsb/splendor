import { CostGems } from './components/cost';
import { GemKind } from './components/gem';

export type Gems = { kind: GemKind; count: number }[];
export type Cards = ({ cost: CostGems; kind: GemKind } | undefined)[];
export type Deck = Cards[];
export type Position = { x: number; y: number; width: number; height: number };
