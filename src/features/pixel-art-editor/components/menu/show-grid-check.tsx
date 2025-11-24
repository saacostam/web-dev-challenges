import { twMerge } from "tailwind-merge";

import { Checkbox } from "../../../../shared/components";

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
      <div
        className="tooltip flex items-center justify-center"
        data-tip="Toggle Grid (G)"
      >
        <Checkbox
          className="checkbox-xs"
          checked={showGrid}
          onChange={(e) => setShowGrid(e.target.checked)}
        />
      </div>
      <span className="text-sm">Show Grid</span>
    </div>
  );
}
