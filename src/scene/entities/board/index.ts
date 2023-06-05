import * as PIXI from 'pixi.js';

import { Deck } from '../../types';
import { Card } from '../card';
import { CARD_RATIO } from '../../constants/cards';

const BOARD_WIDTH_RATIO = 0.8;
const BOARD_HEIGHT_RATIO = 0.8;

export class Board {
  private board: PIXI.Container;

  constructor(private readonly deck: Deck) {
    console.log('board', { deck });
    this.board = new PIXI.Container();
  }

  setup(container: PIXI.Container) {
    container.addChild(this.board);
  }

  destroy() {
    this.board.destroy({ children: true });
  }

  render(width: number, height: number) {
    let cardWidth: number;
    let cardHeight: number;

    const totalWidth = (5 + 4 * 0.1) / BOARD_WIDTH_RATIO;
    const totalHeight = (3 / CARD_RATIO + 2 + 4 * 0.1) / BOARD_HEIGHT_RATIO;
    if (width / height > totalWidth / totalHeight) {
      // Calculate by height
      cardWidth = (height * BOARD_HEIGHT_RATIO) / (3 / CARD_RATIO + 2 + 4 * 0.1);
      cardHeight = cardWidth / CARD_RATIO;

      const offsetX = (width - ((height * totalWidth) / totalHeight) * BOARD_WIDTH_RATIO) / 2;
      const offsetY = (height - height * BOARD_HEIGHT_RATIO) / 2;
      console.log('board offset', offsetX, offsetY);
      this.board.position.set(offsetX, offsetY);
    } else {
      // Calculate by width
      cardWidth = (width * BOARD_WIDTH_RATIO) / (5 + 4 * 0.1);
      cardHeight = cardWidth / CARD_RATIO;

      const offsetX = (width - width * BOARD_WIDTH_RATIO) / 2;
      const offsetY = (height - ((width * totalHeight) / totalWidth) * BOARD_HEIGHT_RATIO) / 2;
      console.log('board offset', offsetX, offsetY);
      this.board.position.set(offsetX, offsetY);
    }

    return this.renderCards(cardWidth, cardHeight);
  }

  private renderCards(width: number, height: number) {
    this.board.removeChildren();

    this.deck.forEach((cards, i) => {
      const y = ((3 - 1 - i) / CARD_RATIO + 2 + (3 - 1 - i + 2) * 0.1) * width;

      cards.forEach((c, i) => {
        if (!c) return;

        const { cost, kind } = c;
        const card = new Card(cost, kind);

        const x = (1 + 0.1) * i * width;
        const position = { x, y, width, height };
        this.board.addChild(card.render(position));
      });
    });
  }
}
