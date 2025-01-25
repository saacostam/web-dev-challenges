import { TEditorOption, TEditorOptionName } from "../types";

// Used to map TEditorOptionName to TEditorOption, ensuring all options are always defined.
const _EDITOR_OPTIONS_MAP: Record<TEditorOptionName, TEditorOption> = {
  [TEditorOptionName.PENCIL]: {
    name: TEditorOptionName.PENCIL,
    icon: () => "P",
  },
  [TEditorOptionName.BUCKET]: {
    name: TEditorOptionName.BUCKET,
    icon: () => "B",
  },
  [TEditorOptionName.ERASER]: {
    name: TEditorOptionName.ERASER,
    icon: () => "E",
  },
  [TEditorOptionName.COLOR_PICKER]: {
    name: TEditorOptionName.COLOR_PICKER,
    icon: () => "C",
  },
};

export const EDITOR_OPTIONS = Object.values(_EDITOR_OPTIONS_MAP);
