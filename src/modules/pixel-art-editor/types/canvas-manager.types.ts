import { Dispatch } from "react";
import { TPosition } from "./core.types";
import {
  TFrame,
  TPixelArtEditorAction,
  TPixelArtEditorSnapShot,
} from "./pixel-art-editor.types";

export enum TMouseInputType {
  CLICK = "click",
  DRAG = "drag",
  RELEASE = "release",
  CANCEL = "cancel",
}

export enum TMouseClickType {
  LEFT = "left",
  RIGHT = "right",
}

export type TTransitionHandler<T> = (input: {
  bufferFrame: TFrame;
  clickType: TMouseClickType;
  ctx: T;
  dispatch: Dispatch<TPixelArtEditorAction>;
  editorSnapshot: TPixelArtEditorSnapShot;
  position: TPosition;
}) => T;

export type TTransitions<S extends string, T> = {
  [state in S]: {
    [transition in TMouseInputType]: {
      nextState: S;
      handler: TTransitionHandler<T>;
    };
  };
};

export interface TStateMachineConfig<T, S extends string = string> {
  ctx: () => T;
  defaultState: S;
  states: S[];
  transitions: TTransitions<S, T>;
}
