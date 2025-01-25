import { Dispatch } from "react";
import { TPosition } from "./core.types";
import {
  TFrame,
  TPixelArtEditorAction,
  TPixelArtEditorSnapShot,
} from "./pixel-art-editor.types";

export enum TMouseInputTypes {
  CLICK = "click",
  DRAG = "drag",
  RELEASE = "release",
}

type TransitionHandler<T> = (input: {
  ctx: T;
  bufferFrame: TFrame;
  dispatch: Dispatch<TPixelArtEditorAction>;
  editorSnapshot: TPixelArtEditorSnapShot;
  position: TPosition;
}) => T;

type Transitions<S extends string, T> = {
  [state in S]: {
    [transition in TMouseInputTypes]: {
      nextState: S;
      handler: TransitionHandler<T>;
    };
  };
};

export interface StateMachineConfig<S extends string, T> {
  toolOption: string;
  ctx: T;
  states: S[];
  transitions: Transitions<S, T>;
}
