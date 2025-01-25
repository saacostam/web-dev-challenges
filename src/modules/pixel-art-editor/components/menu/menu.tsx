import { SubHeader } from "../../../core.components";
import { useEditorSnapshot } from "../../provider";
import { ColorPicker } from "./color-picker";
import { ToolMenu } from "./tool-menu";

export function Menu() {
  const { editorSnapshot, dispatch } = useEditorSnapshot();

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <SubHeader className="text-lg text-center mb-2">Tool Belt</SubHeader>
        <ToolMenu
          selectedOptionName={editorSnapshot.selectedOption}
          onClickMenuOption={(name) =>
            dispatch({
              type: "current-option",
              payload: { currentOption: name },
            })
          }
        />
      </div>
      <div>
        <SubHeader className="text-lg text-center mb-2">Color</SubHeader>
        <ColorPicker
          currentColorPrimary={editorSnapshot.currentColorPrimary}
          setCurrentColorPrimary={(color) =>
            dispatch({ type: "current-color-primary", payload: { color } })
          }
          currentColorSecondary={editorSnapshot.currentColorSecondary}
          setCurrentColorSecondary={(color) =>
            dispatch({ type: "current-color-secondary", payload: { color } })
          }
        />
      </div>
    </div>
  );
}
