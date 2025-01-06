import { useEffect, useMemo, useReducer } from "react";
import { initSettings, pomodoroSettingsReducer } from "../domain";
import { TPomodoroSettingsReducer } from "../types";
import { ClientStorage, ClientStorageKeys } from "../../client-storage";

export function usePomodoroTimer() {
  const [settings, reduceSettings] = useReducer<TPomodoroSettingsReducer>(
    pomodoroSettingsReducer,
    initSettings(),
  );

  useEffect(() => {
    ClientStorage.set(ClientStorageKeys.POMODORO_SETTINGS, settings);
  }, [settings]);

  return useMemo(
    () => ({
      reduceSettings,
      settings,
    }),
    [reduceSettings, settings],
  );
}
