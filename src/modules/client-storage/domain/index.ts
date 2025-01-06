import { ClientStorageKeys } from "../types";

export const ClientStorage = {
  unsafeGet<T>(key: ClientStorageKeys) {
    try {
      const state = localStorage.getItem(key);
      return state ? (JSON.parse(state) as T) : null;
    } catch {
      return null;
    }
  },
  set(key: ClientStorageKeys, obj: unknown) {
    localStorage.setItem(key, JSON.stringify(obj));
  },
};
