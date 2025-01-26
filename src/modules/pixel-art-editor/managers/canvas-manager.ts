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
import { FrameUtils } from "../utils";

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
    mouseout: (e: MouseEvent) => void;
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
      mouseout: this.createMouseEventCallback(TMouseInputType.CANCEL),
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
    this.baseCanvas.addEventListener("mouseout", this.eventCallbacks.mouseout);
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
          (Math.min(Math.max(0, offsetX), clientWidth - 1) / clientWidth) *
            this.bufferFrame.canvas[0].length,
        ),
        y: Math.floor(
          (Math.min(Math.max(0, offsetY), clientHeight - 1) / clientHeight) *
            this.bufferFrame.canvas.length,
        ),
      };

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
    FrameUtils.drawFrame(currentFrame, this.baseCanvas, ctx);

    // Draw the grid if enabled
    if (this.editorSnapshot.showGrid) {
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 2;

      const currentFrame = this.editorSnapshot.frames[0];
      for (let j = 0; j < currentFrame.canvas.length; j++) {
        for (let x = 0; x < currentFrame.canvas[j].length; x++) {
          if (currentFrame.canvas[j][x].color === COLORS.transparent) continue;

          const width = canvasWidth / currentFrame.canvas.length;
          const height = canvasHeight / currentFrame.canvas[j].length;

          const startX = Math.floor(x * width);
          const startY = Math.floor(j * height);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(startX, startY + height);
          ctx.lineTo(startX + width, startY + height);
          ctx.lineTo(startX + width, startY);
          ctx.lineTo(startX, startY);
          ctx.stroke();
        }
      }
    }

    // Draw the buffer frame pixels
    FrameUtils.drawFrame(this.bufferFrame, this.baseCanvas, ctx);

    // Schedule the next frame draw
    if (this.shouldDraw) {
      requestAnimationFrame(() => {
        this.draw();
      });
    }
  }
}
