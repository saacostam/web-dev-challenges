import { useCallback, useMemo } from "react";

import { ClientStorageKeys, IStorageAdapter } from "../domain";

export function useLocalStorageAdapter(): IStorageAdapter {
  const get = useCallback(function (key: ClientStorageKeys) {
    try {
      const state = localStorage.getItem(key);
      return state ? (JSON.parse(state) as unknown) : null;
    } catch {
      return null;
    }
  }, []);

  const unsafeGet = useCallback(
    function <T>(key: ClientStorageKeys): T | null {
      const state = get(key);
      return (state as T) || null;
    },
    [get],
  );

  const set = useCallback(function (key: ClientStorageKeys, obj: unknown) {
    localStorage.setItem(key, JSON.stringify(obj));
  }, []);

  return useMemo(
    () => ({
      get,
      unsafeGet,
      set,
    }),
    [get, unsafeGet, set],
  );
}
