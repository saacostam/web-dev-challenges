import { describe, expect, it, vi } from "vitest";

import { COLORS } from "../constants";
import { TFrame, TPosition } from "../types";
import { FrameUtils } from "./frame-utils";

function createMockFrame(
  rows = 3,
  cols = 3,
  color = COLORS.transparent,
): TFrame {
  return {
    id: "test-id",
    canvas: Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ color })),
    ),
  };
}

function createMockContext() {
  return {
    canvas: { width: 100, height: 100 },
    strokeStyle: "",
    lineWidth: 0,
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fillStyle: "",
    fillRect: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe("FrameUtils", () => {
  describe("clearFrame", () => {
    it("should set all cells to transparent", () => {
      const frame = createMockFrame(2, 2, "red");
      FrameUtils.clearFrame(frame);

      frame.canvas.forEach((row) => {
        row.forEach((cell) => {
          expect(cell.color).toBe(COLORS.transparent);
        });
      });
    });
  });

  describe("deepCopyFrame", () => {
    it("should return a deep copy of the frame", () => {
      const frame = createMockFrame();
      const copy = FrameUtils.deepCopyFrame(frame);

      expect(copy.id).not.toBe(frame.id);
      expect(copy).not.toBe(frame);

      expect(copy.canvas).toEqual(frame.canvas);

      copy.canvas.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          expect(cell).not.toBe(frame.canvas[rowIndex][colIndex]);
        });
      });
    });
  });

  describe("drawGrid", () => {
    it("should draw a grid based on the frame, if not transparent", () => {
      const ctx = createMockContext();
      const frame = createMockFrame(1, 1, "red");
      FrameUtils.drawGrid(ctx, frame);

      expect(ctx.stroke).toHaveBeenCalled();
    });

    it("should not draw a grid if cells are transparent", () => {
      const ctx = createMockContext();
      const frame = createMockFrame(1, 1);
      FrameUtils.drawGrid(ctx, frame);

      expect(ctx.stroke).not.toHaveBeenCalled();
    });
  });

  describe("drawFrame", () => {
    it("should draw each cell of the frame on the canvas", () => {
      const frame = createMockFrame();
      const canvas = document.createElement("canvas");
      const ctx = createMockContext();

      FrameUtils.drawFrame(frame, canvas, ctx);

      expect(ctx.fillRect).toHaveBeenCalledTimes(
        frame.canvas.length * frame.canvas[0].length,
      );
    });
  });

  describe("paintHover", () => {
    it("should highlight the hovered position and set others to transparent", () => {
      const frame = createMockFrame(3, 3);
      const position: TPosition = { x: 1, y: 1 };
      FrameUtils.paintHover(frame, position);

      frame.canvas.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (rowIndex === position.y && colIndex === position.x) {
            expect(cell.color).toBe(COLORS.hover);
          } else {
            expect(cell.color).toBe(COLORS.transparent);
          }
        });
      });
    });
  });
});
