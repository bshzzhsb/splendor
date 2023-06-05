import { GemKind } from '../components/gem';
import { Cards, Deck } from '../types';

export const CARD_GAP = 8;
export const CARD_RATIO = 5 / 7;

export const LEVEL_1_CARDS: Cards = [
  { cost: [{ kind: GemKind.BLACK, count: 2 }], kind: GemKind.BLACK },
  { cost: [{ kind: GemKind.BLACK, count: 2 }], kind: GemKind.WHITE },
];

export const DECK: Deck = [LEVEL_1_CARDS];
