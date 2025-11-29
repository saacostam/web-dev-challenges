import { Dispatch } from "react";

import { TIcon } from "../../../shared/icons";
import { Identifider } from "../../../shared/types";
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
        newFrame: Omit<TFrame, "id">;
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
  reset: () => void;
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

// IMPORTANT: If the types are updated, the validation service needs to be updated to match the new structure

export interface TPixelArtEditorStorableSnapShot {
  currentColorPrimary: string;
  currentColorSecondary: string;
  fps: number;
  frames: TFrame[];
  _currentFrameId: TFrame["id"];
  selectedOption: TEditorOptionName;
  showGrid: boolean;
}

export interface TPixelArtEditorInternalSnapShot
  extends TPixelArtEditorStorableSnapShot {
  history: TPixelArtEditorHistory;
}

export interface TPixelArtEditorSnapShot
  extends TPixelArtEditorInternalSnapShot {
  currentFrame: TFrame;
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
      type: "set-pixel-art-internal-snapshot";
      payload: {
        setSnapshot: (
          state: TPixelArtEditorInternalSnapShot,
        ) => TPixelArtEditorInternalSnapShot;
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
        id: Identifider;
      };
    }
  | {
      type: "set-frame";
      payload: {
        id: Identifider;
      };
    }
  | {
      type: "duplicate-frame";
      payload: {
        id: Identifider;
      };
    };

export interface IEditorSnapshotService {
  editorSnapshot: TPixelArtEditorSnapShot;
  dispatch: Dispatch<TPixelArtEditorAction>;
  downloadSnaphot: () => void;
  loadSnapshot: {
    isPending: boolean;
    onClick: (
      blob: Blob,
      args?: {
        onError?: (e: unknown) => void;
        onSettled?: () => void;
      },
    ) => void;
  };
  reset: () => void;
}
