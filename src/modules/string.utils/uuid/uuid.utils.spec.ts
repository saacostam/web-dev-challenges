import { v4 as uuid } from "uuid";
import { describe, expect, it, vi } from "vitest";

import { getUuid } from "./uuid.utils";

vi.mock("uuid", () => ({
  v4: vi.fn(() => "mocked-uuid"),
}));

describe("getUuid", () => {
  it("should return a UUID string", () => {
    const result = getUuid();
    expect(result).toBe("mocked-uuid");
    expect(uuid).toHaveBeenCalled();
  });
});
