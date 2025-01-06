import { ClientStorageKeys } from "../types";

function unsafeGet<T>(key: ClientStorageKeys) {
  const state = get(key);
  return (state as T) || null;
}

function get(key: ClientStorageKeys) {
  try {
    const state = localStorage.getItem(key);
    return state ? (JSON.parse(state) as unknown) : null;
  } catch {
    return null;
  }
}

export const ClientStorage = {
  get,
  unsafeGet,
  set(key: ClientStorageKeys, obj: unknown) {
    localStorage.setItem(key, JSON.stringify(obj));
  },
};
