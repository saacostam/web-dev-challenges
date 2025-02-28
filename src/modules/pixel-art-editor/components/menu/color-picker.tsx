import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

import { COLORS } from "../../constants";
import { CanvasUtils } from "../../utils";

export interface ColorPickerProps {
  className?: string;
  currentColorPrimary: string;
  setCurrentColorPrimary: (color: string) => void;
  currentColorSecondary: string;
  setCurrentColorSecondary: (color: string) => void;
}

export function ColorPicker({
  className,
  currentColorPrimary,
  setCurrentColorPrimary,
  currentColorSecondary,
  setCurrentColorSecondary,
}: ColorPickerProps) {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderCanvas = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      CanvasUtils.drawBackground(ctx, 32);
    };

    if (canvasRef1.current) renderCanvas(canvasRef1.current);
    if (canvasRef2.current) renderCanvas(canvasRef2.current);
  });

  const colors = [
    {
      tooltip: "Primary Color",
      color: currentColorPrimary,
      set: setCurrentColorPrimary,
      ref: canvasRef1,
    },
    {
      tooltip: "Secondary Color",
      color: currentColorSecondary,
      set: setCurrentColorSecondary,
      ref: canvasRef2,
    },
  ];

  return (
    <div className={twMerge("flex grid-cols-2 gap-1", className)}>
      {colors.map(({ color, set, tooltip, ref }) => (
        <div className="tooltip relative" data-tip={tooltip} key={tooltip}>
          <input
            className="p-1 cursor-pointer btn btn-primary btn-outline btn-square"
            type="color"
            value={color}
            onChange={(e) => set(e.target.value)}
          />
          <div
            className={twMerge(
              "absolute w-full h-full top-0 left-0 p-1.5 pointer-events-none",
              color === COLORS.transparent ? "block" : "hidden",
            )}
          >
            <canvas
              ref={ref}
              width={300}
              height={300}
              className="w-full border z-50 bg-white"
            ></canvas>
          </div>
        </div>
      ))}
    </div>
  );
}
