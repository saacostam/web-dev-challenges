import { EDITOR_OPTIONS } from "../../constants";
import { MenuOption } from "./menu-option";
import { useEditorSnapshot } from "../../provider";

export function Menu() {
  const { editorSnapshot, dispatch } = useEditorSnapshot();

  return (
    <div className="grid grid-cols-2 gap-1">
      {EDITOR_OPTIONS.map((option) => (
        <MenuOption
          active={option.name === editorSnapshot.selectedOption}
          key={option.name}
          menuOption={option}
          onClick={(name) =>
            dispatch({
              type: "current-option",
              payload: { currentOption: name },
            })
          }
        />
      ))}
    </div>
  );
}
