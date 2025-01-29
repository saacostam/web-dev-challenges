import { COLORS } from "../constants";

const SQUARE = {
  WIDTH: 36,
  HEIGHT: 36,
};

export const CanvasUtils = {
  drawBackground(ctx: CanvasRenderingContext2D) {
    const { width, height } = ctx.canvas;

    const horizontalSquare = Math.ceil(width / SQUARE.WIDTH);
    const verticalSquare = Math.ceil(height / SQUARE.HEIGHT);

    for (let i = 0; i < horizontalSquare; i++) {
      for (let j = 0; j < verticalSquare; j++) {
        ctx.fillStyle = i % 2 === j % 2 ? COLORS["bg-one"] : COLORS["bg-two"];
        ctx.fillRect(
          i * SQUARE.WIDTH,
          j * SQUARE.HEIGHT,
          SQUARE.WIDTH,
          SQUARE.HEIGHT,
        );
      }
    }
  },
};
