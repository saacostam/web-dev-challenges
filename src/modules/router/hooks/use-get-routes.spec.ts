import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GetHrefProps, TRoute } from "../types";
import { useGetRoutes } from "./use-get-routes";

describe("useGetRoutes", () => {
  it("should return HOME route", () => {
    const { result } = renderHook(() => useGetRoutes());
    expect(result.current.getHref({ type: TRoute.HOME })).toBe("/");
  });

  it("should return CHALLENGE_BY_ID route", () => {
    const { result } = renderHook(() => useGetRoutes());
    expect(
      result.current.getHref({ type: TRoute.CHALLENGE_BY_ID, id: "123" }),
    ).toBe("/123");
  });

  it("should return default route", () => {
    const { result } = renderHook(() => useGetRoutes());
    expect(result.current.getHref({} as GetHrefProps)).toBe("#");
  });
});
