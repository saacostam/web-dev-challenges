import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  initSettings,
  pomodoroSettingsReducer,
  initSnapshot,
  snapshotReducer,
  getCurrentStepDurationInSeconds,
} from "../domain";
import {
  TPomodoroSettingsReducer,
  TPomodoroTimerSnapshotReducer,
} from "../types";
import { ClientStorage, ClientStorageKeys } from "../../client-storage";
import { useXSecondsTimer } from "../../time";
import { useSoundPlayer } from "../../sound";
import { SETTINGS_CONFIG } from "../constants";

export function usePomodoroTimer() {
  const [settings, reduceSettings] = useReducer<TPomodoroSettingsReducer>(
    pomodoroSettingsReducer,
    initSettings(),
  );

  const [snapshot, reduceSnapshot] = useReducer<TPomodoroTimerSnapshotReducer>(
    snapshotReducer,
    initSnapshot(settings),
  );

  const currentStepDurationInSeconds = useMemo(
    () => getCurrentStepDurationInSeconds({ snapshot }),
    [snapshot],
  );

  const onTimerEnd = useCallback(
    () =>
      reduceSnapshot({
        type: "update-counter",
      }),
    [],
  );
  useXSecondsTimer({
    secondsInterval: 0.5,
    onTimerEnd,
  });

  const { play: playDing } = useSoundPlayer({
    audioSrc: "/audio/ding.mp3",
    volume: settings.volume / SETTINGS_CONFIG.VOLUME.MAX,
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

  useEffect(() => {
    if (snapshot.state) playDing();
  }, [snapshot.state, playDing]);

  return useMemo(
    () => ({
      currentStepDurationInSeconds,
      reduceSettings,
      reduceSnapshot,
      settings,
      snapshot,
    }),
    [
      currentStepDurationInSeconds,
      reduceSettings,
      reduceSnapshot,
      settings,
      snapshot,
    ],
  );
}
