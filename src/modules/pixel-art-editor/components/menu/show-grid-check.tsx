import { twMerge } from "tailwind-merge";
import { Checkbox } from "../../../core.components";

export interface ShowGridCheckProps {
  className?: string;
  setShowGrid: (showGrid: boolean) => void;
  showGrid: boolean;
}

export function ShowGridCheck({
  className,
  setShowGrid,
  showGrid,
}: ShowGridCheckProps) {
  return (
    <div
      className={twMerge("flex items-center justify-center gap-1", className)}
    >
      <Checkbox
        className="checkbox-xs"
        checked={showGrid}
        onChange={(e) => setShowGrid(e.target.checked)}
      />
      <span className="text-sm">Show Grid</span>
    </div>
  );
}
