import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useXSecondsTimer } from "./use-x-seconds-timer";

describe("useXSecondsTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call onTimerEnd after the given interval", () => {
    const onTimerEnd = vi.fn();
    renderHook(() => useXSecondsTimer({ onTimerEnd, secondsInterval: 2 }));

    vi.advanceTimersByTime(2000);
    expect(onTimerEnd).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(2000);
    expect(onTimerEnd).toHaveBeenCalledTimes(2);
  });

  it("should clear interval when unmounted", () => {
    const onTimerEnd = vi.fn();
    const { unmount } = renderHook(() =>
      useXSecondsTimer({ onTimerEnd, secondsInterval: 1 }),
    );

    vi.advanceTimersByTime(1000);
    expect(onTimerEnd).toHaveBeenCalledTimes(1);

    unmount();
    vi.advanceTimersByTime(1000);
    expect(onTimerEnd).toHaveBeenCalledTimes(1);
  });
});
