import { Dispatch } from "react";
import {
  COLORS,
  DEFAULT_EDITOR_SNAPSHOT,
  STATE_MACHINE_CONFIGS,
} from "../constants";
import { SeederService } from "../services";
import {
  TEditorOptionName,
  TFrame,
  TMouseClickType,
  TMouseInputType,
  TPixelArtEditorAction,
  TPixelArtEditorSnapShot,
  TPosition,
} from "../types";

export interface CanvasManagerInit {
  baseCanvas: HTMLCanvasElement;
  editorSnapshot: TPixelArtEditorSnapShot;
  dispatch: Dispatch<TPixelArtEditorAction>;
}

export interface CanvasManagerState {
  editorSnapshot: TPixelArtEditorSnapShot;
  dispatch: Dispatch<TPixelArtEditorAction>;
}

export class CanvasManager {
  private baseCanvas: HTMLCanvasElement;
  private _editorSnapshot!: TPixelArtEditorSnapShot;
  private bufferFrame!: TFrame;
  private dispatch: Dispatch<TPixelArtEditorAction>;

  private shouldDraw = false;
  private eventCallbacks: {
    mousedown: (e: MouseEvent) => void;
    mousemove: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    contextmenu: (e: MouseEvent) => void;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private optionCtx: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private optionStatus: any = "";
  private prevOption: TEditorOptionName =
    DEFAULT_EDITOR_SNAPSHOT.selectedOption;

  get editorSnapshot() {
    return this._editorSnapshot;
  }

  set editorSnapshot(editorSnapshot: TPixelArtEditorSnapShot) {
    this._editorSnapshot = editorSnapshot;
    this.bufferFrame = this.matchFrame({
      frame: editorSnapshot.frames[0],
    });
  }

  private matchFrame(options: {
    frame: TFrame;
    defaultColor?: string;
  }): TFrame {
    return SeederService.seedFrame({
      height: options.frame.canvas.length,
      width: options.frame.canvas[0]?.length || 0,
      defaultColor: options.defaultColor || COLORS.transparent,
    });
  }

  constructor(init: CanvasManagerInit) {
    const { baseCanvas, dispatch, editorSnapshot } = init;

    this.baseCanvas = baseCanvas;
    this.dispatch = dispatch;
    this.editorSnapshot = editorSnapshot;

    this.shouldDraw = true;
    this.draw();

    // Create the event callbacks
    this.eventCallbacks = {
      mousedown: this.createMouseEventCallback(TMouseInputType.CLICK),
      mousemove: this.createMouseEventCallback(TMouseInputType.DRAG),
      mouseup: this.createMouseEventCallback(TMouseInputType.RELEASE),
      contextmenu: (e: MouseEvent) => e.preventDefault(),
    };

    // Attach event listeners to the canvas
    this.baseCanvas.addEventListener(
      "mousedown",
      this.eventCallbacks.mousedown,
    );
    this.baseCanvas.addEventListener(
      "mousemove",
      this.eventCallbacks.mousemove,
    );
    this.baseCanvas.addEventListener("mouseup", this.eventCallbacks.mouseup);
    this.baseCanvas.addEventListener(
      "contextmenu",
      this.eventCallbacks.contextmenu,
    );
  }

  private createMouseEventCallback(mouseInput: TMouseInputType) {
    return (e: MouseEvent) => {
      e.preventDefault();
      const { button, offsetX, offsetY } = e;

      const clickType: TMouseClickType =
        button === 2 ? TMouseClickType.RIGHT : TMouseClickType.LEFT;

      const { clientWidth, clientHeight } = this.baseCanvas;

      const position: TPosition = {
        x: Math.floor(
          (offsetX / clientWidth) * this.bufferFrame.canvas[0].length,
        ),
        y: Math.floor(
          (offsetY / clientHeight) * this.bufferFrame.canvas.length,
        ),
      };

      if (
        position.x >= this.bufferFrame.canvas[0].length ||
        position.y >= this.bufferFrame.canvas.length
      )
        return;

      const stateMachine =
        STATE_MACHINE_CONFIGS[this.editorSnapshot.selectedOption];
      if (!stateMachine.states.includes(this.optionStatus)) {
        this.optionStatus = stateMachine.defaultState;
        this.optionCtx = stateMachine.ctx();
      }

      const next =
        stateMachine.transitions[
          this.optionStatus as (typeof stateMachine.states)[number]
        ][mouseInput];

      this.optionCtx = next.handler({
        bufferFrame: this.bufferFrame,
        clickType: clickType,
        ctx: this.optionCtx,
        dispatch: this.dispatch,
        editorSnapshot: this.editorSnapshot,
        position,
      });
      this.optionStatus = next.nextState;
    };
  }

  state(state: CanvasManagerState) {
    const { dispatch, editorSnapshot } = state;

    this.dispatch = dispatch;
    this.editorSnapshot = editorSnapshot;

    if (this.prevOption !== this.editorSnapshot.selectedOption) {
      const stateMachine =
        STATE_MACHINE_CONFIGS[this.editorSnapshot.selectedOption];

      this.optionStatus = stateMachine.defaultState;
      this.optionCtx = stateMachine.ctx();

      this.prevOption = this.editorSnapshot.selectedOption;
    }
  }

  cleaup() {
    this.shouldDraw = false;

    Object.entries(this.eventCallbacks).forEach(([event, callback]) => {
      this.baseCanvas.removeEventListener(event, callback as EventListener);
    });
  }

  draw() {
    const ctx = this.baseCanvas.getContext("2d");
    if (!ctx) throw new Error("Canvas Context not found");

    const { width: canvasWidth, height: canvasHeight } = this.baseCanvas;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the current frame pixels
    const currentFrame = this.editorSnapshot.frames[0];
    for (let j = 0; j < currentFrame.canvas.length; j++) {
      for (let x = 0; x < currentFrame.canvas[j].length; x++) {
        const width = canvasWidth / currentFrame.canvas.length;
        const height = canvasHeight / currentFrame.canvas[j].length;

        ctx.fillStyle = currentFrame.canvas[j][x].color;
        ctx.fillRect(x * width, j * height, width, height);
      }
    }

    // Draw the buffer frame pixels
    for (let j = 0; j < this.bufferFrame.canvas.length; j++) {
      for (let x = 0; x < this.bufferFrame.canvas[j].length; x++) {
        const width = canvasWidth / this.bufferFrame.canvas.length;
        const height = canvasHeight / this.bufferFrame.canvas[j].length;

        ctx.fillStyle = this.bufferFrame.canvas[j][x].color;
        ctx.fillRect(x * width, j * height, width, height);
      }
    }

    // Schedule the next frame draw
    if (this.shouldDraw) {
      requestAnimationFrame(() => {
        this.draw();
      });
    }
  }
}
