import { TIcon } from "../../icons";
import { TPosition } from "./core.types";

export interface TPixel {
  color: string;
}

export type TCanvas = TPixel[][];

export interface TFrame {
  canvas: TCanvas;
}

export type TMutation =
  | {
      type: "switch-color";
      payload: {
        fromColor: string;
        position: TPosition;
        toColor: string;
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
        before: TFrame;
      };
    };

export interface TUpdate {
  mutations: TMutation[];
}

export interface TPixelArtEditorHistory {
  updates: TUpdate[];
  add: (action: TUpdate) => TUpdate;
  redo: () => TUpdate;
  undo: () => TUpdate;
}

export enum TEditorOptionName {
  BUCKET = "bucket",
  COLOR_PICKER = "color-picker",
  ERASER = "eraser",
  PENCIL = "pencil",
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
    };
