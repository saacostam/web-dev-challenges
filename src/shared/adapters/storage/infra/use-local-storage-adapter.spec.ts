import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { useLocalStorageAdapter } from "./use-local-storage-adapter";
import { ClientStorageKeys } from "../domain";

describe("useLocalStorageAdapter", () => {
  const mockGetItem = vi.fn();
  const mockSetItem = vi.fn();

  beforeAll(() => {
    // @ts-expect-error: Global overwrite for test
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
      },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns the adapter functions", () => {
    const { result } = renderHook(() => useLocalStorageAdapter());

    expect(typeof result.current.get).toBe("function");
    expect(typeof result.current.set).toBe("function");
    expect(typeof result.current.unsafeGet).toBe("function");
  });

  it("get() returns parsed JSON when value exists", () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify({ foo: "bar" }));

    const { result } = renderHook(() => useLocalStorageAdapter());
    const value = result.current.get(ClientStorageKeys.POMODORO_SETTINGS);

    expect(mockGetItem).toHaveBeenCalledWith(ClientStorageKeys.POMODORO_SETTINGS);
    expect(value).toEqual({ foo: "bar" });
  });

  it("get() returns null when no value exists", () => {
    mockGetItem.mockReturnValueOnce(null);

    const { result } = renderHook(() => useLocalStorageAdapter());
    const value = result.current.get(ClientStorageKeys.POMODORO_SETTINGS);

    expect(value).toBeNull();
  });

  it("get() returns null on JSON parse error", () => {
    mockGetItem.mockReturnValueOnce("not-json");

    const { result } = renderHook(() => useLocalStorageAdapter());
    const value = result.current.get(ClientStorageKeys.POMODORO_SETTINGS);

    expect(value).toBeNull();
  });

  it("unsafeGet() returns typed value when it exists", () => {
    const mockData = { userId: 123 };
    mockGetItem.mockReturnValueOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => useLocalStorageAdapter());
    const value = result.current.unsafeGet<typeof mockData>(
      ClientStorageKeys.POMODORO_SETTINGS
    );

    expect(value).toEqual(mockData);
  });

  it("unsafeGet() returns null when no value exists", () => {
    mockGetItem.mockReturnValueOnce(null);

    const { result } = renderHook(() => useLocalStorageAdapter());
    const value = result.current.unsafeGet<{ foo: string }>(
      ClientStorageKeys.POMODORO_SETTINGS
    );

    expect(value).toBeNull();
  });

  it("set() stores value as JSON", () => {
    const payload = { name: "Alice" };

    const { result } = renderHook(() => useLocalStorageAdapter());

    // act is good practice even though set() has no state update
    act(() => {
      result.current.set(ClientStorageKeys.POMODORO_SETTINGS, payload);
    });

    expect(mockSetItem).toHaveBeenCalledWith(
      ClientStorageKeys.POMODORO_SETTINGS,
      JSON.stringify(payload)
    );
  });
});
