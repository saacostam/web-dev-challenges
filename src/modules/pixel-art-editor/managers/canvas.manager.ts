import { COLORS } from "../constants";
import { SeederService } from "../services";
import { TFrame } from "../types";

export interface CanvasManagerInit {
  baseCanvas: HTMLCanvasElement;
  currentFrame: TFrame;
}

export interface CanvasManagerState {
  currentFrame: TFrame;
}

export class CanvasManager {
  private baseCanvas: HTMLCanvasElement;
  private _currentFrame!: TFrame;
  private bufferFrame!: TFrame;

  private shouldDraw = false;

  get currentFrame() {
    return this._currentFrame;
  }

  set currentFrame(frame: TFrame) {
    this._currentFrame = frame;
    this.bufferFrame = this.matchFrame({
      frame,
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
    const { baseCanvas, currentFrame } = init;

    this.baseCanvas = baseCanvas;
    this.currentFrame = currentFrame;

    this.shouldDraw = true;

    this.draw();
  }

  state(state: CanvasManagerState) {
    const { currentFrame } = state;

    this.currentFrame = currentFrame;
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
    for (let j = 0; j < this.currentFrame.canvas.length; j++) {
      for (let x = 0; x < this.currentFrame.canvas[j].length; x++) {
        const width = canvasWidth / this.currentFrame.canvas.length;
        const height = canvasHeight / this.currentFrame.canvas[j].length;

        ctx.fillStyle = this.currentFrame.canvas[j][x].color;
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
