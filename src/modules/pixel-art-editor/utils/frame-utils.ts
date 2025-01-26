import { COLORS } from "../constants";
import { TFrame, TPosition } from "../types";

export const FrameUtils = {
  clearFrame: (frame: TFrame) => {
    for (let j = 0; j < frame.canvas.length; j++) {
      for (let i = 0; i < frame.canvas[j].length; i++) {
        frame.canvas[j][i].color = COLORS.transparent;
      }
    }
  },
  drawFrame: (
    frame: TFrame,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => {
    const OVERFLOW = 1;
    const { width: canvasWidth, height: canvasHeight } = canvas;

    for (let j = 0; j < frame.canvas.length; j++) {
      for (let x = 0; x < frame.canvas[j].length; x++) {
        const width = canvasWidth / frame.canvas.length;
        const height = canvasHeight / frame.canvas[j].length;

        ctx.fillStyle = frame.canvas[j][x].color;
        ctx.fillRect(
          x * width - OVERFLOW,
          j * height - OVERFLOW,
          width + 2 * OVERFLOW,
          height + 2 * OVERFLOW,
        );
      }
    }
  },
  paintHover: (frame: TFrame, position: TPosition) => {
    for (let j = 0; j < frame.canvas.length; j++) {
      for (let i = 0; i < frame.canvas[j].length; i++) {
        frame.canvas[j][i].color =
          j === position.y && i === position.x
            ? COLORS.hover
            : COLORS.transparent;
      }
    }
  },
};
