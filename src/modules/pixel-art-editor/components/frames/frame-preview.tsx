import { useEffect, useRef } from "react";
import { TFrame } from "../../types";
import { CanvasUtils, FrameUtils } from "../../utils";

export interface FramePreviewProps {
  frame: TFrame;
}

export function FramePreview({ frame }: FramePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      CanvasUtils.drawBackground(ctx, 18);
      FrameUtils.drawFrame(frame, canvasRef.current, ctx);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full"
    ></canvas>
  );
}
