import { getUuid } from "@/features/string.utils";
import { TCanvas, TFrame } from "../types";

export interface seedFrameProps {
  defaultColor: string;
  height: number;
  width: number;
}

export function seedFrame({
  defaultColor,
  height,
  width,
}: seedFrameProps): TFrame {
  const canvas: TCanvas = [];

  for (let i = 0; i < height; i++) {
    canvas[i] = [];
    for (let j = 0; j < width; j++) {
      canvas[i][j] = {
        color: defaultColor,
      };
    }
  }

  return {
    id: getUuid(),
    canvas,
  };
}

export const SeederService = {
  seedFrame,
};
