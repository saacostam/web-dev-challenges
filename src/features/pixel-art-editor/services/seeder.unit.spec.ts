import { describe, it, expect } from "vitest";
import { SeederService } from "./seeder";

describe("seedFrame", () => {
  it("creates a frame with the correct size and default color", () => {
    const frame = SeederService.seedFrame({
      defaultColor: "#FFFFFF",
      height: 3,
      width: 4,
    });

    expect(frame.id).toBeTruthy();
    expect(typeof frame.id).toBe("string");

    expect(frame.canvas.length).toBe(3);
    expect(frame.canvas[0].length).toBe(4);

    frame.canvas.forEach((row) => {
      row.forEach((cell) => {
        expect(cell.color).toBe("#FFFFFF");
      });
    });
  });

  it("produces different IDs for different frames", () => {
    const frame1 = SeederService.seedFrame({
      defaultColor: "red",
      height: 1,
      width: 1,
    });

    const frame2 = SeederService.seedFrame({
      defaultColor: "red",
      height: 1,
      width: 1,
    });

    expect(frame1.id).not.toBe(frame2.id);
  });
});
