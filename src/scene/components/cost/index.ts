import * as PIXI from 'pixi.js';

import { Gems, Position } from '../../types';
import { GemKind } from '../gem';

export type CostGems = { kind: Exclude<GemKind, GemKind.GOLD>; count: number }[];

const GAP = 2;

export class Cost {
  constructor(private costGems: CostGems) {}

  render(width: number, height: number) {
    const costWidth = (height - GAP * 7) / 6;

    const container = new PIXI.Container();
    this.costGems.forEach((gem, i) => {
      const background = new PIXI.Graphics();
      background.beginFill(0xff66ff);
      const x = GAP;
      const y = height - (this.costGems.length - i) * (costWidth + GAP);
      console.log('cost render', { x, y, costWidth });
      background.position.set(x, y);
      background.drawCircle(costWidth / 2, costWidth / 2, costWidth / 2);
      background.endFill();

      const style = new PIXI.TextStyle({
        fontFamily: 'math',
        fontSize: costWidth - 2,
        fill: '#ffffff',
      });
      const text = new PIXI.Text(gem.count, style);
      text.anchor.x = 0.5;
      text.anchor.y = 0.5;
      text.x = costWidth / 2;
      text.y = costWidth / 2;
      background.addChild(text);

      container.addChild(background);
    });

    return container;
  }

  // TODO: use Map to store colors?
  affordable(gems: Gems) {
    // Gold can be used as any other Gem
    const gold = { kind: GemKind.GOLD, count: 0, ...gems.find(({ kind: gem }) => gem === GemKind.GOLD) };

    // Iter costGems to check if affordable
    this.costGems.every(({ kind, count }) => {
      const haveGem = gems.find((haveGem) => haveGem.kind === kind) ?? { kind, count: 0 };

      // If this kind of Gem is not enough, use Gold.
      const needGoldCount = Math.max(0, count - haveGem.count);
      gold.count -= needGoldCount;

      return gold.count >= 0;
    });
  }
}
