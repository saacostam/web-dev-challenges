import { renderHook, act } from "@testing-library/react";
import useSoundPlayer from "./use-play-sound";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

describe("useSoundPlayer hook", () => {
  let audioPlayMock: ReturnType<typeof vi.spyOn>;
  let audioLoadMock: ReturnType<typeof vi.spyOn>;
  let audioVolumeMock: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    audioPlayMock = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());
    audioLoadMock = vi
      .spyOn(window.HTMLMediaElement.prototype, "load")
      .mockImplementation(() => {});
    audioVolumeMock = vi.spyOn(
      window.HTMLMediaElement.prototype,
      "volume",
      "set",
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize the audio element and set volume", () => {
    renderHook(() => useSoundPlayer({ audioSrc: "test.mp3", volume: 0.5 }));

    expect(audioLoadMock).toHaveBeenCalled();
    expect(audioVolumeMock).toHaveBeenCalledWith(0.5);
  });

  it("should play audio when play function is called", () => {
    const { result } = renderHook(() =>
      useSoundPlayer({ audioSrc: "test.mp3", volume: 0.5 }),
    );

    act(() => {
      result.current.play();
    });

    expect(audioPlayMock).toHaveBeenCalled();
  });

  it("should update volume when the volume prop changes", () => {
    const { rerender } = renderHook(
      () => useSoundPlayer({ audioSrc: "test.mp3", volume: 0.8 }),
      {
        initialProps: { volume: 0.5 },
      },
    );

    rerender({ volume: 0.8 });

    expect(audioVolumeMock).toHaveBeenCalledWith(0.8);
  });
});
