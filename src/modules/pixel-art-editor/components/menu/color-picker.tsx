import { twMerge } from "tailwind-merge";

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
  const colors = [
    {
      tooltip: "Primary Color",
      color: currentColorPrimary,
      set: setCurrentColorPrimary,
    },
    {
      tooltip: "Secondary Color",
      color: currentColorSecondary,
      set: setCurrentColorSecondary,
    },
  ];

  return (
    <div className={twMerge("flex grid-cols-2 gap-1", className)}>
      {colors.map(({ color, set, tooltip }) => (
        <div className="tooltip" data-tip={tooltip} key={color}>
          <input
            className="px-1 py-0.5 cursor-pointer btn btn-primary btn-outline btn-square"
            type="color"
            value={color}
            onChange={(e) => set(e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
