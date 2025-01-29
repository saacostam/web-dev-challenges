import { TEditorOptionName } from "../../types";
import { bucketStateMachineConfig } from "./bucket-state-machine-config";
import { colorPickerStateMachineConfig } from "./color-picker-state-machine-config";
import { eraserStateMachineConfig } from "./eraser-state-machine-config";
import { pencilStateMachineConfig } from "./pencil-state-machine-config";

export const STATE_MACHINE_CONFIGS = {
  [TEditorOptionName.BUCKET]: bucketStateMachineConfig,
  [TEditorOptionName.COLOR_PICKER]: colorPickerStateMachineConfig,
  [TEditorOptionName.ERASER]: eraserStateMachineConfig,
  [TEditorOptionName.PENCIL]: pencilStateMachineConfig,
};
