import { COLORS } from "../constants";
import { SeederService } from "../services";
import { TFrame, TPixelArtEditorSnapShot } from "../types";

export interface CanvasManagerInit {
  baseCanvas: HTMLCanvasElement;
  editorSnapshot: TPixelArtEditorSnapShot;
}

export interface CanvasManagerState {
  editorSnapshot: TPixelArtEditorSnapShot;
}

export class CanvasManager {
  private baseCanvas: HTMLCanvasElement;
  private _editorSnapshot!: TPixelArtEditorSnapShot;
  private bufferFrame!: TFrame;

  private shouldDraw = false;

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
    const { baseCanvas, editorSnapshot } = init;

    this.baseCanvas = baseCanvas;
    this.editorSnapshot = editorSnapshot;

    this.shouldDraw = true;
    this.draw();
  }

  state(state: CanvasManagerState) {
    const { editorSnapshot } = state;

    this.editorSnapshot = editorSnapshot;
  }

  cleaup() {
    // empty
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
