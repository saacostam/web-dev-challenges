import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useJsonBlobExportAdapter } from "./use-json-blob-export-adapter";

describe("useJsonBlobExportAdapter", () => {
  it("dumpToBlob returns a JSON blob", () => {
    const { result } = renderHook(() => useJsonBlobExportAdapter());

    const data = { foo: "bar" };

    const blob = result.current.dumpToBlob(data);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("application/json");
  });

  it("readFromBlob returns valid JSON when structure is correct", async () => {
    const { result } = renderHook(() => useJsonBlobExportAdapter());

    const blob = new Blob([JSON.stringify({ a: 1 })], {
      type: "application/json",
    });

    const out = await result.current.readFromBlob(blob);

    expect(out).toEqual({
      type: "valid",
      value: { a: 1 },
    });
  });

  it("readFromBlob returns invalid when blob type is not JSON", async () => {
    const { result } = renderHook(() => useJsonBlobExportAdapter());

    const blob = new Blob(["hello"], { type: "text/plain" });

    const out = await result.current.readFromBlob(blob);

    expect(out).toEqual({
      type: "invalid",
      reason: "Invalid file type",
    });
  });

  it("readFromBlob returns invalid for malformed JSON", async () => {
    const { result } = renderHook(() => useJsonBlobExportAdapter());

    const blob = new Blob(["{ invalid json"], {
      type: "application/json",
    });

    const out = await result.current.readFromBlob(blob);

    expect(out).toEqual({
      type: "invalid",
      reason: "Invalid JSON structure",
    });
  });
});
