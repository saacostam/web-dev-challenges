import { useEffect, useRef, useState } from "react";

import { TFrame } from "../../types";
import { CanvasUtils, FrameUtils } from "../../utils";

export interface CanvasAnimationProps {
  currentFrame: TFrame;
  fps: number;
  frames: TFrame[];
}

export function CanvasAnimation({
  currentFrame,
  fps,
  frames,
}: CanvasAnimationProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const frame = frames[currentFrameIndex];
      if (!ctx || !frame) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      CanvasUtils.drawBackground(ctx, 10);
      FrameUtils.drawFrame(frame, canvasRef.current, ctx);
    }
  });

  useEffect(() => {
    if (fps === 0)
      return setCurrentFrameIndex(
        Math.max(
          0,
          frames.findIndex((frame) => frame === currentFrame),
        ),
      );

    const interval = setInterval(() => {
      setCurrentFrameIndex(
        (currentFrameIndex) => (currentFrameIndex + 1) % frames.length,
      );
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [fps, currentFrame, frames]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full"
    ></canvas>
  );
}
