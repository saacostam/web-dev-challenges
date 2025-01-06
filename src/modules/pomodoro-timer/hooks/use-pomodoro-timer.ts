import { useMemo, useReducer } from "react";
import { initSettings, pomodoroSettingsReducer } from "../domain";
import { TPomodoroSettingsReducer } from "../types";

export function usePomodoroTimer() {
  const [settings, reduceSettings] = useReducer<TPomodoroSettingsReducer>(
    pomodoroSettingsReducer,
    initSettings(),
  );

  return useMemo(
    () => ({
      reduceSettings,
      settings,
    }),
    [reduceSettings, settings],
  );
}
