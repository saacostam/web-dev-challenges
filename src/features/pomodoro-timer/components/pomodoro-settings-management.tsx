import { Dispatch, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import {
  Checkbox,
  Divider,
  Header,
  Input,
  Range,
  SubHeader,
} from "../../../shared/components";
import { BellAlertIcon, ClockIcon, SpeakerWaveIcon } from "../../../shared/icons";
import { DEFAULT_SETTINGS, SETTINGS_CONFIG } from "../constants";
import {
  TPomodoroSettings,
  TPomodoroSettingsReducerAction,
  TPomodoroTimerState,
} from "../types";

/**
 * Props for the `PomodoroSettingsManagements` component.
 * @typedef {Object} PomodoroSettingsManagementsProps
 * @property {Dispatch<TPomodoroSettingsReducerAction>} reduceSettings - The function to dispatch settings changes.
 * @property {TPomodoroSettings} settings - The current settings object.
 */
export interface PomodoroSettingsManagementsProps {
  reduceSettings: Dispatch<TPomodoroSettingsReducerAction>;
  settings: TPomodoroSettings;
}

export function Label({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <span className={twMerge("text-lg font-bold mb-2 block", className)}>
      {children}
    </span>
  );
}

/**
 * Manages and displays the Pomodoro settings.
 * @component
 */
export function PomodoroSettingsManagements({
  settings,
  reduceSettings,
}: PomodoroSettingsManagementsProps) {
  return (
    <>
      <Header className="flex gap-2 items-center justify-center">
        Settings
      </Header>
      <SubHeader className="flex gap-2 items-center">
        <ClockIcon className="size-7" />
        Timer
      </SubHeader>
      <Label>Duration(s):</Label>
      <div className="flex justify-between mb-4">
        {[
          TPomodoroTimerState.WORK,
          TPomodoroTimerState.SHORT_BREAK,
          TPomodoroTimerState.LONG_BREAK,
        ].map((state) => (
          <div className="flex flex-col items-center" key={state}>
            <span className="mb-1">{state}</span>
            <Input
              key={state}
              min={SETTINGS_CONFIG.DURATIONS.MIN}
              max={SETTINGS_CONFIG.DURATIONS.MAX}
              onChange={(e) =>
                reduceSettings({
                  type: "durations",
                  payload: { state: state, duration: +e.target.value },
                })
              }
              type="number"
              value={settings.durations[state]}
              wrapperClassName="w-fit"
            />
          </div>
        ))}
      </div>
      <Label>Long Break Interval:</Label>
      <Input
        min={SETTINGS_CONFIG.LONG_BREAK_INTERVAL.MIN}
        max={SETTINGS_CONFIG.LONG_BREAK_INTERVAL.MAX}
        onChange={(e) =>
          reduceSettings({
            type: "long-break-interval",
            payload: { interval: +e.target.value },
          })
        }
        type="number"
        value={settings.longBreakInterval}
        wrapperClassName="w-fit"
      />
      <Divider />
      <SubHeader className="flex gap-2 items-center">
        <SpeakerWaveIcon />
        Sound
      </SubHeader>
      <Label>
        Volume{" "}
        <span className="font-normal">
          ({settings.volume}/{SETTINGS_CONFIG.VOLUME.MAX})
        </span>
      </Label>
      <Range
        min={SETTINGS_CONFIG.VOLUME.MIN}
        max={SETTINGS_CONFIG.VOLUME.MAX}
        value={settings.volume}
        onChange={(e) =>
          reduceSettings({
            type: "volume",
            payload: { volume: +e.target.value },
          })
        }
      />
      <Divider />
      <SubHeader className="flex gap-2 items-center">
        <BellAlertIcon />
        Notification
      </SubHeader>
      <Label>Remainder</Label>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={!!settings.notification}
          onChange={() =>
            reduceSettings(
              settings.notification
                ? { type: "notification", payload: { exists: false } }
                : {
                    type: "notification",
                    payload: {
                      exists: true,
                      secTimeBefore:
                        DEFAULT_SETTINGS.notification?.secTimeBefore,
                    },
                  },
            )
          }
        />
        <span>Before</span>
        <Input
          min={SETTINGS_CONFIG.NOTIFICATION.SEC_TIME_BEFORE.MIN}
          max={SETTINGS_CONFIG.NOTIFICATION.SEC_TIME_BEFORE.MAX}
          onChange={(e) =>
            reduceSettings({
              type: "notification",
              payload: settings.notification
                ? {
                    exists: true,
                    secTimeBefore: +e.target.value,
                  }
                : {
                    exists: false,
                  },
            })
          }
          type="number"
          value={
            settings.notification?.secTimeBefore ||
            DEFAULT_SETTINGS.notification?.secTimeBefore
          }
          wrapperClassName="w-fit input-sm"
          disabled={!settings.notification}
        />
        <span>seconds</span>
      </div>
    </>
  );
}
