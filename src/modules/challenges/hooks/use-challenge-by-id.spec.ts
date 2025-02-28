import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useChallengeById } from "./use-challenge-by-id";

vi.mock("../constants", () => ({
  CHALLENGES: [
    { id: "1", name: "Challenge One" },
    { id: "2", name: "Challenge Two" },
  ],
}));

describe("useChallengeById", () => {
  it("should return the challenge with the given id", () => {
    const { result } = renderHook(() => useChallengeById({ id: "1" }));
    expect(result.current.challenge).toEqual({
      id: "1",
      name: "Challenge One",
    });
  });

  it("should return undefined if the id does not match any challenge", () => {
    const { result } = renderHook(() => useChallengeById({ id: "999" }));
    expect(result.current.challenge).toBeUndefined();
  });

  it("should return undefined if id is not provided", () => {
    const { result } = renderHook(() => useChallengeById({}));
    expect(result.current.challenge).toBeUndefined();
  });
});
