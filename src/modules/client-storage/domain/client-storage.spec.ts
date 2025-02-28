import { beforeEach, describe, expect, it } from "vitest";

import { ClientStorage } from "../domain";
import { ClientStorageKeys } from "../types";

describe("ClientStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store and retrieve an item", () => {
    ClientStorage.set(ClientStorageKeys.POMODORO_SNAPSHOT, { foo: "bar" });
    const result = ClientStorage.get(ClientStorageKeys.POMODORO_SNAPSHOT);
    expect(result).toEqual({ foo: "bar" });
  });

  it("should return null for a non-existing key", () => {
    const result = ClientStorage.get("NON_EXISTENT_KEY" as ClientStorageKeys);
    expect(result).toBeNull();
  });

  it("should return parsed JSON when using unsafeGet", () => {
    localStorage.setItem(
      ClientStorageKeys.POMODORO_SNAPSHOT,
      JSON.stringify({ foo: "bar" }),
    );
    const result = ClientStorage.unsafeGet<{ foo: string }>(
      ClientStorageKeys.POMODORO_SNAPSHOT,
    );
    expect(result).toEqual({ foo: "bar" });
  });

  it("should return null when unsafeGet is used on a non-existing key", () => {
    const result = ClientStorage.unsafeGet<{ foo: string }>(
      "NON_EXISTENT_KEY" as ClientStorageKeys,
    );
    expect(result).toBeNull();
  });

  it("should return null when JSON parsing fails", () => {
    localStorage.setItem(ClientStorageKeys.POMODORO_SNAPSHOT, "invalid_json");
    const result = ClientStorage.get(ClientStorageKeys.POMODORO_SNAPSHOT);
    expect(result).toBeNull();
  });
});
