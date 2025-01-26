import { TEditorOptionName } from "../../types";
import { colorPickerStateMachineConfig } from "./color-picker-state-machine-config";
import { pencilStateMachineConfig } from "./pencil-state-machine-config";

export const STATE_MACHINE_CONFIGS = {
  [TEditorOptionName.BUCKET]: pencilStateMachineConfig,
  [TEditorOptionName.COLOR_PICKER]: colorPickerStateMachineConfig,
  [TEditorOptionName.ERASER]: pencilStateMachineConfig,
  [TEditorOptionName.PENCIL]: pencilStateMachineConfig,
};
