import { ClientStorageKeys } from "../types";

export const ClientStorage = {
  unsafeGet<T>(key: ClientStorageKeys) {
    const state = localStorage.getItem(key);
    return state as T;
  },
};
