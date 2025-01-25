import { useCallback } from "react";
import { SubHeader } from "../../../core.components";
import { useEditorSnapshot } from "../../provider";
import { ColorPicker } from "./color-picker";
import { ToolMenu } from "./tool-menu";
import { TEditorOptionName } from "../../types";

export function Menu() {
  const { editorSnapshot, dispatch } = useEditorSnapshot();

  const onClickMenuOption = useCallback(
    (name: TEditorOptionName) =>
      dispatch({
        type: "current-option",
        payload: { currentOption: name },
      }),
    [dispatch],
  );

  const setCurrentColorPrimary = useCallback(
    (color: string) =>
      dispatch({
        type: "current-color-primary",
        payload: { color },
      }),
    [dispatch],
  );

  const setCurrentColorSecondary = useCallback(
    (color: string) =>
      dispatch({
        type: "current-color-secondary",
        payload: { color },
      }),
    [dispatch],
  );

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <SubHeader className="text-lg text-center mb-2">Tool Belt</SubHeader>
        <ToolMenu
          selectedOptionName={editorSnapshot.selectedOption}
          onClickMenuOption={onClickMenuOption}
        />
      </div>
      <div>
        <SubHeader className="text-lg text-center mb-2">Color</SubHeader>
        <ColorPicker
          currentColorPrimary={editorSnapshot.currentColorPrimary}
          setCurrentColorPrimary={setCurrentColorPrimary}
          currentColorSecondary={editorSnapshot.currentColorSecondary}
          setCurrentColorSecondary={setCurrentColorSecondary}
        />
      </div>
    </div>
  );
}
