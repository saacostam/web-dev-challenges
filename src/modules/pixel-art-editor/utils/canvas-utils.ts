import { COLORS } from "../constants";

const SQUARE_SIZE = 36;

export const CanvasUtils = {
  drawBackground(ctx: CanvasRenderingContext2D, squareSize = SQUARE_SIZE) {
    const { width, height } = ctx.canvas;

    const horizontalSquare = Math.ceil(width / squareSize);
    const verticalSquare = Math.ceil(height / squareSize);

    for (let i = 0; i < horizontalSquare; i++) {
      for (let j = 0; j < verticalSquare; j++) {
        ctx.fillStyle = i % 2 === j % 2 ? COLORS["bg-one"] : COLORS["bg-two"];
        ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  },
};
