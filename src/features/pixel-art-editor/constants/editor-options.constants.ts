import {
  EraserIcon,
  EyeDropperIcon,
  FillDripIcon,
  PencilIcon,
} from "../../icons";
import { TEditorOption, TEditorOptionName } from "../types";

// Used to map TEditorOptionName to TEditorOption, ensuring all options are always defined.
const _EDITOR_OPTIONS_MAP: Record<TEditorOptionName, TEditorOption> = {
  [TEditorOptionName.PENCIL]: {
    name: TEditorOptionName.PENCIL,
    icon: PencilIcon,
  },
  [TEditorOptionName.BUCKET]: {
    name: TEditorOptionName.BUCKET,
    icon: FillDripIcon,
  },
  [TEditorOptionName.ERASER]: {
    name: TEditorOptionName.ERASER,
    icon: EraserIcon,
  },
  [TEditorOptionName.COLOR_PICKER]: {
    name: TEditorOptionName.COLOR_PICKER,
    icon: EyeDropperIcon,
  },
};

export const EDITOR_OPTIONS = Object.values(_EDITOR_OPTIONS_MAP);
