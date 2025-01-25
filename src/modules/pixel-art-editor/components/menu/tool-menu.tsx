import { EDITOR_OPTIONS } from "../../constants";
import { TEditorOptionName } from "../../types";
import { MenuOption } from "./menu-option";

export interface ToolMenuProps {
  selectedOptionName: TEditorOptionName;
  onClickMenuOption: (name: TEditorOptionName) => void;
}

export function ToolMenu({
  selectedOptionName,
  onClickMenuOption,
}: ToolMenuProps) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {EDITOR_OPTIONS.map((option) => (
        <MenuOption
          active={option.name === selectedOptionName}
          key={option.name}
          menuOption={option}
          onClick={onClickMenuOption}
        />
      ))}
    </div>
  );
}
