import { useCallback, useEffect, useMemo, useReducer } from "react";

import { ClientStorage, ClientStorageKeys } from "../../client-storage";
import { useSoundPlayer } from "../../sound";
import { useXSecondsTimer } from "../../time";
import { SETTINGS_CONFIG } from "../constants";
import {
  getCurrentStepDurationInSeconds,
  initSettings,
  initSnapshot,
  pomodoroSettingsReducer,
  snapshotReducer,
} from "../domain";
import {
  TPomodoroSettingsReducer,
  TPomodoroTimerSnapshotReducer,
} from "../types";

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

  const { play: playNotification } = useSoundPlayer({
    audioSrc: "/audio/alert-before.mp3",
    volume: settings.volume / SETTINGS_CONFIG.VOLUME.MAX,
  });

  const { play: playEnd } = useSoundPlayer({
    audioSrc: "/audio/ding.mp3",
    volume: settings.volume / SETTINGS_CONFIG.VOLUME.MAX,
  });

  useEffect(() => {
    ClientStorage.set(ClientStorageKeys.POMODORO_SNAPSHOT, {
      ...snapshot,
      settings: undefined, // settings is stored separately
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
    // have not already notified
    if (!snapshot.notifiedEnd) {
      playEnd();
      reduceSnapshot({ type: "notified-end" });
    }
  }, [snapshot.notifiedEnd, playEnd]);

  useEffect(() => {
    // shouldNotifyXSecondsBefore
    if (settings.notification?.secTimeBefore !== undefined) {
      const timeLeft = currentStepDurationInSeconds - snapshot.secondsCounter;
      if (
        timeLeft <= settings.notification.secTimeBefore &&
        !snapshot.notifiedAlert // have not already notified
      ) {
        playNotification();
        reduceSnapshot({ type: "notified-alert" });
      }
    }
  }, [currentStepDurationInSeconds, playNotification, settings, snapshot]);

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
