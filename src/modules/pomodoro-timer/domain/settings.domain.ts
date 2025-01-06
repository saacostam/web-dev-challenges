import { ClientStorage, ClientStorageKeys } from "../../client-storage";
import { DEFAULT_SETTINGS, SETTINGS_CONFIG } from "../constants";
import {
  TPomodoroSettings,
  TPomodoroSettingsReducer,
  TPomodoroTimerState,
} from "../types";

export const pomodoroSettingsReducer: TPomodoroSettingsReducer = (
  state,
  action,
) => {
  switch (action.type) {
    case "durations":
      return {
        ...state,
        durations: {
          ...state.durations,
          [action.payload.state]: Math.max(
            SETTINGS_CONFIG.DURATIONS.MIN,
            Math.min(action.payload.duration, SETTINGS_CONFIG.DURATIONS.MAX),
          ),
        },
      };
    case "long-break-interval":
      return {
        ...state,
        longBreakInterval: Math.max(
          SETTINGS_CONFIG.LONG_BREAK_INTERVAL.MIN,
          Math.min(
            action.payload.interval,
            SETTINGS_CONFIG.LONG_BREAK_INTERVAL.MAX,
          ),
        ),
      };
    case "volume":
      return {
        ...state,
        volume: Math.max(
          SETTINGS_CONFIG.VOLUME.MIN,
          Math.min(action.payload.volume, SETTINGS_CONFIG.VOLUME.MAX),
        ),
      };
    case "notification":
      return {
        ...state,
        notification: action.payload.exists
          ? {
              secTimeBefore: Math.max(
                SETTINGS_CONFIG.NOTIFICATION.SEC_TIME_BEFORE.MIN,
                Math.min(
                  action.payload.secTimeBefore,
                  SETTINGS_CONFIG.NOTIFICATION.SEC_TIME_BEFORE.MAX,
                ),
              ),
            }
          : undefined,
      };
    case "reset-to-default-settings":
      return DEFAULT_SETTINGS;
    case "set":
      return {
        ...action.payload.settings,
      };
  }
};

function validateUnsanitizedPomodoroSettings(
  data: unknown,
): data is TPomodoroSettings {
  if (typeof data !== "object" || data === null) return false;
  const settings = data as TPomodoroSettings;

  if (typeof settings.durations !== "object" || settings.durations === null)
    return false;

  for (const state of Object.values(TPomodoroTimerState)) {
    if (typeof settings.durations[state] !== "number") return false;
  }

  if (
    typeof settings.longBreakInterval !== "number" ||
    typeof settings.volume !== "number"
  )
    return false;

  if (settings.notification) {
    if (typeof settings.notification.secTimeBefore !== "number") return false;
  }

  return true;
}

export function initSettings(): TPomodoroSettings {
  const unsanitizedSettings = ClientStorage.get(
    ClientStorageKeys.POMODORO_SETTINGS,
  );

  if (!validateUnsanitizedPomodoroSettings(unsanitizedSettings))
    return DEFAULT_SETTINGS;
  return unsanitizedSettings;
}
