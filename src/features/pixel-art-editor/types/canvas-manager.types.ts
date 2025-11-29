import { Dispatch } from "react";

import { TPosition } from "./core.types";
import {
  TFrame,
  TPixelArtEditorAction,
  TPixelArtEditorSnapShot,
} from "./pixel-art-editor.types";

/**
 * Mouse input types that trigger transitions in the state machine.
 */
export enum TMouseInputType {
  CLICK = "click",
  DRAG = "drag",
  RELEASE = "release",
  CANCEL = "cancel",
}

/**
 * Indicates which mouse button was used.
 */
export enum TMouseClickType {
  LEFT = "left",
  RIGHT = "right",
}

/**
 * A transition handler receives full contextual data and returns
 * the next context value.
 */
export type TTransitionHandler<T> = (input: {
  /** Buffered frame data used during drawing operations */
  buffer: {
    frame: TFrame;
    enabled: boolean;
  };
  /** The mouse button used for the action */
  clickType: TMouseClickType;
  /** The current context object */
  ctx: T;
  /** Dispatch method used to update the editor state */
  dispatch: Dispatch<TPixelArtEditorAction>;
  /** The full current editor snapshot */
  editorSnapshot: TPixelArtEditorSnapShot;
  /** The pixel position where the event occurred */
  position: TPosition;
}) => T;

/**
 * Transition table mapping each state to a set of mouse input transitions.
 *
 * For every state and input type, defines:
 *  - nextState: the state to move to
 *  - handler: the function to compute the next context
 */
export type TTransitions<S extends string, T> = {
  [state in S]: {
    [transition in TMouseInputType]: {
      nextState: S;
      handler: TTransitionHandler<T>;
    };
  };
};

/**
 * Configuration object used to construct a finite state machine.
 *
 * @template T - The context type managed by the machine.
 * @template S - The string literal union representing valid states.
 */
export interface TStateMachineConfig<T, S extends string = string> {
  /** Factory that creates the initial context object */
  ctx: () => T;

  /** Default state on initialization */
  defaultState: S;

  /** All valid states the machine can occupy */
  states: S[];

  /** Definition of all transitions for each state */
  transitions: TTransitions<S, T>;
}
