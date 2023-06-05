import * as PIXI from 'pixi.js';

import { Cost, CostGems } from '../../components/cost';
import { GemKind } from '../../components/gem';
import { Position } from '../../types';

export class Card {
  private cost: Cost;

  constructor(cost: CostGems, private kind: GemKind) {
    this.cost = new Cost(cost);
  }

  render(position: Position) {
    console.log('card render', position);

    const container = new PIXI.Container();
    const { x, y, width, height } = position;
    container.position.set(x, y);

    const background = this.renderBackground(position);
    background.zIndex = 0;
    container.addChild(background);

    const cost = this.renderCost(width, height);
    cost.zIndex = 1;
    container.addChild(cost);
    container.sortableChildren = true;
    container.sortChildren();

    return container;
  }

  renderBackground(position: Position) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x66ff66);
    const { width, height } = position;
    graphics.drawRoundedRect(0, 0, width, height, 4);
    graphics.endFill();

    return graphics;
  }

  renderCost(width: number, height: number) {
    return this.cost.render(width, height);
  }
}
