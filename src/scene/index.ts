import * as PIXI from 'pixi.js';

import { Board } from './entities/board';
import { DECK } from './constants/cards';

const SCENE_BACKGROUND = 0xbae6fd;

export class Scene {
  private disposers: CallableFunction[] = [];
  private app: PIXI.Application;
  private container: HTMLDivElement;

  private board: Board;

  constructor(container: HTMLDivElement) {
    const { width, height } = container.getBoundingClientRect();
    const app = new PIXI.Application({ width, height, background: SCENE_BACKGROUND, antialias: true });
    container.appendChild(app.view as HTMLCanvasElement);

    this.app = app;
    this.container = container;
    this.disposers.push(this.handleResize());

    this.board = new Board(DECK);

    this.setup();
    this.render(width, height);
  }

  setup() {
    this.board.setup(this.app.stage);
  }

  destroy() {
    this.board.destroy();
    this.app.destroy(true);
    this.disposers.forEach((disposer) => disposer());
  }

  render(width: number, height: number) {
    this.board.render(width, height);
  }

  handleResize() {
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const entry = entries.find((entry) => entry.target === this.container);
      if (entry) {
        const { width, height } = entry.contentRect;
        this.app.view.width = width;
        this.app.view.height = height;

        this.render(width, height);
      }
    });
    resizeObserver.observe(this.container);

    return () => {
      resizeObserver.disconnect();
    };
  }
}
