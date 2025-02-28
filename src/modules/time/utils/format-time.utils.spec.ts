import { describe, expect, it } from "vitest";

import { FormatTimeUtils } from "./format-time.utils";

describe("FormatTimeUtils.destructureFromSeconds", () => {
  it("should correctly convert seconds into hours, minutes, and seconds", () => {
    expect(FormatTimeUtils.destructureFromSeconds(3661)).toEqual({
      hours: 1,
      minutes: 1,
      seconds: 1,
    });
  });

  it("should return zeroes when input is zero", () => {
    expect(FormatTimeUtils.destructureFromSeconds(0)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should handle negative values by treating them as zero", () => {
    expect(FormatTimeUtils.destructureFromSeconds(-500)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should correctly handle edge cases (exact hours, minutes, seconds)", () => {
    expect(FormatTimeUtils.destructureFromSeconds(3600)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0,
    });

    expect(FormatTimeUtils.destructureFromSeconds(60)).toEqual({
      hours: 0,
      minutes: 1,
      seconds: 0,
    });

    expect(FormatTimeUtils.destructureFromSeconds(1)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 1,
    });
  });
});
