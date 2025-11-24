import { Identifider } from "../../../shared/types";
import { TIcon } from "../../../shared/icons";
import { TPosition } from "./core.types";

export interface TPixel {
  color: string;
}

export type TCanvas = TPixel[][];

export interface TFrame {
  id: Identifider;
  canvas: TCanvas;
}

export type TMutation =
  | {
      type: "switch-color";
      payload: {
        fromColor: string;
        position: TPosition;
        toColor: string;
        frame: TFrame;
      };
    }
  | {
      type: "create-frame";
      payload: {
        order: number;
        newFrame: TFrame;
      };
    }
  | {
      type: "delete-frame";
      payload: {
        order: number;
        oldFrame: TFrame;
      };
    };

export interface TUpdate {
  mutations: TMutation[];
}

export interface TPixelArtEditorHistory {
  updates: TUpdate[];
  add: (action: TUpdate) => TUpdate;
  redo: () => TUpdate | undefined;
  redoAvailable: boolean;
  undo: () => TUpdate | undefined;
  undoAvailable: boolean;
}

// NOTE: The values are shown to the user, so they should be descriptive and pretty to read
export enum TEditorOptionName {
  BUCKET = "Bucket (B)",
  COLOR_PICKER = "Color Picker (C)",
  ERASER = "Eraser (E)",
  PENCIL = "Pencil (P)",
}

export interface TEditorOption {
  icon: TIcon;
  name: TEditorOptionName;
}

export interface TColorPalette {
  colors: string[];
}

/**
 * EDITOR SNAPSHOT
 */

export interface TPixelArtEditorSnapShot {
  currentColorPrimary: string;
  currentColorSecondary: string;
  fps: number;
  frames: TFrame[];
  currentFrame: TFrame;
  history: TPixelArtEditorHistory;
  selectedOption: TEditorOptionName;
  showGrid: boolean;
}

export type TPixelArtEditorAction =
  | {
      type: "current-color-primary";
      payload: {
        color: string;
      };
    }
  | {
      type: "current-color-secondary";
      payload: {
        color: string;
      };
    }
  | {
      type: "fps";
      payload: {
        fps: number;
      };
    }
  | {
      type: "show-grid";
      payload: {
        showGrid: boolean;
      };
    }
  | {
      type: "current-option";
      payload: {
        currentOption: TEditorOptionName;
      };
    }
  | {
      type: "commit-update";
      payload: {
        update: TUpdate;
      };
    }
  | {
      type: "undo";
    }
  | {
      type: "redo";
    }
  | {
      type: "set-history";
      payload: {
        history: TPixelArtEditorHistory;
      };
    }
  | {
      type: "create-frame";
      payload: {
        order: number;
      };
    }
  | {
      type: "delete-frame";
      payload: {
        order: number;
      };
    }
  | {
      type: "set-frame";
      payload: {
        order: number;
      };
    }
  | {
      type: "duplicate-frame";
      payload: {
        order: number;
      };
    };
