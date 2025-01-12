import { useEffect, useMemo, useReducer } from "react";
import {
  initSettings,
  pomodoroSettingsReducer,
  initSnapshot,
  snapshotReducer,
} from "../domain";
import {
  TPomodoroSettingsReducer,
  TPomodoroTimerSnapshotReducer,
} from "../types";
import { ClientStorage, ClientStorageKeys } from "../../client-storage";
import { useXSecondsTimer } from "../../time";

export function usePomodoroTimer() {
  const [settings, reduceSettings] = useReducer<TPomodoroSettingsReducer>(
    pomodoroSettingsReducer,
    initSettings(),
  );

  const [snapshot, reduceSnapshot] = useReducer<TPomodoroTimerSnapshotReducer>(
    snapshotReducer,
    initSnapshot(settings),
  );

  useXSecondsTimer({
    secondsInterval: 1,
    onTimerEnd: () =>
      reduceSnapshot({
        type: "seconds-counter",
        payload: { secondsCounter: snapshot.secondsCounter + 1 },
      }),
  });

  useEffect(() => {
    ClientStorage.set(ClientStorageKeys.POMODORO_SNAPSHOT, {
      ...snapshot,
      settings: undefined,
    });
  }, [snapshot]);

  useEffect(() => {
    ClientStorage.set(ClientStorageKeys.POMODORO_SETTINGS, settings);
    reduceSnapshot({
      type: "settings",
      payload: {
        settings: settings,
      },
    });
  }, [settings]);

  return useMemo(
    () => ({
      reduceSettings,
      reduceSnapshot,
      settings,
      snapshot,
    }),
    [reduceSettings, reduceSnapshot, settings, snapshot],
  );
}
