import { describe, expect, it, vi } from "vitest";

import { BASE_URL } from "../../../../shared/async-state-management";
import { BrandingRepository } from "./branding-repository";

describe("BrandingRepository", () => {
  it("fetches author data and returns parsed JSON", async () => {
    const mockData = { name: "Santiago", role: "Engineer" };

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        }),
      ),
    );

    const repo = new BrandingRepository();
    const result = await repo.getAuthor();

    expect(fetch).toHaveBeenCalledWith(
      new URL("static-data/me/get.json", BASE_URL),
    );

    expect(result).toEqual(mockData);
  });
});
