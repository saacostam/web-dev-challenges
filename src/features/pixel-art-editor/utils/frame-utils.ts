import { getUuid } from "../../string.utils";
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
  deepCopyFrame: (frame: TFrame): TFrame => {
    return {
      id: getUuid(),
      canvas: frame.canvas.map((row) =>
        row.map((cell) => ({
          color: cell.color,
        })),
      ),
    };
  },
  drawGrid(ctx: CanvasRenderingContext2D, currentFrame: TFrame) {
    const { width: canvasWidth, height: canvasHeight } = ctx.canvas;

    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 5;

    for (let j = 0; j < currentFrame.canvas.length; j++) {
      for (let x = 0; x < currentFrame.canvas[j].length; x++) {
        if (currentFrame.canvas[j][x].color === COLORS.transparent) continue;

        const width = canvasWidth / currentFrame.canvas.length;
        const height = canvasHeight / currentFrame.canvas[j].length;

        const startX = Math.floor(x * width);
        const startY = Math.floor(j * height);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY + height);
        ctx.lineTo(startX + width, startY + height);
        ctx.lineTo(startX + width, startY);
        ctx.lineTo(startX, startY);
        ctx.stroke();
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
