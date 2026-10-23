import { Dispatch } from "react";

import { TIcon } from "@/shared/icons";
import { Identifider } from "@/shared/types";
import { TPosition } from "./core.types";

/**
 * A single pixel in the canvas.
 * @property {string} color - The hex/color value of the pixel.
 */
export interface TPixel {
  color: string;
}

/**
 * A 2D canvas composed of pixels.
 *
 * @typedef {TPixel[][]} TCanvas
 */
export type TCanvas = TPixel[][];

/**
 * A single animation frame composed of a pixel canvas.
 *
 * @property {Identifider} id - Unique frame identifier.
 * @property {TCanvas} canvas - 2D grid of pixels.
 */
export interface TFrame {
  id: Identifider;
  canvas: TCanvas;
}

/**
 * Represents a reversible change (mutation) applied to a frame or editor state.
 */
export type TMutation =
  | {
      /** Bucket fill or similar color replacement mutation. */
      type: "switch-color";
      payload: {
        fromColor: string;
        toColor: string;
        position: TPosition;
        frame: TFrame;
      };
    }
  | {
      /** Creates a new frame. */
      type: "create-frame";
      payload: {
        order: number;
        newFrame: Omit<TFrame, "id">;
      };
    }
  | {
      /** Deletes an existing frame. */
      type: "delete-frame";
      payload: {
        order: number;
        oldFrame: TFrame;
      };
    };

/**
 * Represents a set of mutations that form a single editor update event.
 */
export interface TUpdate {
  mutations: TMutation[];
}

/**
 * History manager for undo/redo functionality.
 */
export interface TPixelArtEditorHistory {
  /** All recorded updates. */
  updates: TUpdate[];

  /** Add a new update to the history. */
  add: (action: TUpdate) => TUpdate;

  /** Redo the next available update. */
  redo: () => TUpdate | undefined;

  /** Whether redo is currently possible. */
  redoAvailable: boolean;

  /** Undo the most recent update. */
  undo: () => TUpdate | undefined;

  /** Whether undo is currently possible. */
  undoAvailable: boolean;

  /** Clears the entire history. */
  reset: () => void;
}

/**
 * Editor tool names shown to the user.
 * MUST remain human-readable because they appear in UI.
 */
export enum TEditorOptionName {
  BUCKET = "Bucket (B)",
  COLOR_PICKER = "Color Picker (C)",
  ERASER = "Eraser (E)",
  PENCIL = "Pencil (P)",
}

/**
 * A selectable editor tool.
 *
 * @property {TIcon} icon - Icon displayed in UI.
 * @property {TEditorOptionName} name - Human-readable name.
 */
export interface TEditorOption {
  icon: TIcon;
  name: TEditorOptionName;
}

/**
 * Palette of selectable colors.
 *
 * @property {string[]} colors - Hex/color values.
 */
export interface TColorPalette {
  colors: string[];
}

/**
 * A snapshot of all editor state that can be stored/exported.
 *
 * NOTE: If updated, also update the validation service.
 */
export interface TPixelArtEditorStorableSnapShot {
  currentColorPrimary: string;
  currentColorSecondary: string;
  fps: number;
  frames: TFrame[];
  /** ID of the currently selected frame. */
  _currentFrameId: TFrame["id"];
  selectedOption: TEditorOptionName;
  showGrid: boolean;
}

/**
 * Internal snapshot including undo/redo history.
 */
export interface TPixelArtEditorInternalSnapShot
  extends TPixelArtEditorStorableSnapShot {
  history: TPixelArtEditorHistory;
}

/**
 * Full runtime snapshot including the resolved current frame.
 */
export interface TPixelArtEditorSnapShot
  extends TPixelArtEditorInternalSnapShot {
  currentFrame: TFrame;
}

/**
 * All possible actions that can be dispatched to the pixel editor reducer.
 */
export type TPixelArtEditorAction =
  | {
      /** Set the primary color. */
      type: "current-color-primary";
      payload: { color: string };
    }
  | {
      /** Set the secondary color. */
      type: "current-color-secondary";
      payload: { color: string };
    }
  | {
      /** Set animation FPS. */
      type: "fps";
      payload: { fps: number };
    }
  | {
      /** Toggle grid visibility. */
      type: "show-grid";
      payload: { showGrid: boolean };
    }
  | {
      /** Change the selected tool. */
      type: "current-option";
      payload: { currentOption: TEditorOptionName };
    }
  | {
      /** Commit a mutation update to history. */
      type: "commit-update";
      payload: { update: TUpdate };
    }
  | { type: "undo" }
  | { type: "redo" }
  | {
      /** Replace history instance. */
      type: "set-history";
      payload: { history: TPixelArtEditorHistory };
    }
  | {
      /** Apply a transformation to the internal snapshot. */
      type: "set-pixel-art-internal-snapshot";
      payload: {
        setSnapshot: (
          state: TPixelArtEditorInternalSnapShot,
        ) => TPixelArtEditorInternalSnapShot;
      };
    }
  | {
      /** Insert a new frame at an order index. */
      type: "create-frame";
      payload: { order: number };
    }
  | {
      /** Delete a frame by ID. */
      type: "delete-frame";
      payload: { id: Identifider };
    }
  | {
      /** Switch current frame by ID. */
      type: "set-frame";
      payload: { id: Identifider };
    }
  | {
      /** Duplicate an existing frame. */
      type: "duplicate-frame";
      payload: { id: Identifider };
    };

/**
 * Public service interface for interacting with editor snapshots.
 */
export interface IEditorSnapshotService {
  /** Current editor snapshot. */
  editorSnapshot: TPixelArtEditorSnapShot;

  /** Dispatch actions to update the editor state. */
  dispatch: Dispatch<TPixelArtEditorAction>;

  /** Download the snapshot as a JSON file. */
  downloadSnaphot: () => void;

  /** Load a snapshot from a Blob. */
  loadSnapshot: {
    /** Whether the load operation is in progress. */
    isPending: boolean;

    /**
     * Load snapshot from a blob.
     *
     * @param {Blob} blob - Snapshot file.
     * @param {Object} [args]
     * @param {Function} [args.onError] - Called on error.
     * @param {Function} [args.onSettled] - Called after completion.
     */
    onClick: (
      blob: Blob,
      args?: {
        onError?: (e: unknown) => void;
        onSettled?: () => void;
      },
    ) => void;
  };

  /** Reset all internal state. */
  reset: () => void;
}
