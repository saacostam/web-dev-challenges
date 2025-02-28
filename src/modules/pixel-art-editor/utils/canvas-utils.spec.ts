import { describe, expect, it, vi } from "vitest";

import { COLORS } from "../constants";
import { CanvasUtils } from "./canvas-utils";

function createMockContext() {
  return {
    canvas: { width: 100, height: 100 },
    fillStyle: "",
    fillRect: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe("CanvasUtils", () => {
  describe("drawBackground", () => {
    it("should fill the canvas with alternating colors", () => {
      const ctx = createMockContext();
      CanvasUtils.drawBackground(ctx, 36);

      expect(ctx.fillRect).toHaveBeenCalled();
      expect(ctx.fillRect).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Number),
        36,
        36,
      );
    });

    it("should use the correct colors for alternating squares", () => {
      const ctx = createMockContext();
      CanvasUtils.drawBackground(ctx, 36);

      expect(ctx.fillStyle).toBeDefined();
      expect([COLORS["bg-one"], COLORS["bg-two"]]).toContain(ctx.fillStyle);
    });

    it("should calculate the correct number of squares", () => {
      const ctx = createMockContext();
      ctx.canvas.width = 6;
      ctx.canvas.height = 4;
      CanvasUtils.drawBackground(ctx, 2);

      expect(ctx.fillRect).toHaveBeenCalledTimes(6);
    });
  });
});
