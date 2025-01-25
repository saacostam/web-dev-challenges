import { twMerge } from "tailwind-merge";
import { TEditorOption, TEditorOptionName } from "../../types";

export interface MenuOptionsProps {
  menuOption: TEditorOption;
  onClick: (name: TEditorOptionName) => void;
  active: boolean;
}

export function MenuOption({ active, menuOption, onClick }: MenuOptionsProps) {
  return (
    <button
      className={twMerge(
        "btn btn-square btn-primary transition-transform duration-200",
        active ? "scale-105" : "btn-outline",
      )}
      onClick={() => onClick(menuOption.name)}
    >
      <menuOption.icon className="size-4 text-primary-content" />
    </button>
  );
}
