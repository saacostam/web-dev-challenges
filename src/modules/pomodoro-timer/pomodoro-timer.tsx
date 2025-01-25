import { Divider, SubHeader, useModal } from "../core.components";
import { Cog6Tooth } from "../icons";
import { ALL_POMODORO_TIMER_STATES } from "./constants";
import { usePomodoroTimer } from "./hooks";
import {
  PomodoroSettingsManagements,
  PomodoroTasks,
  PomodoroTimerCounter,
  PomodoroTimerPlayback,
  PomodoroTimerStateTabs,
} from "./components";

export function PomodoroTimer() {
  const {
    currentStepDurationInSeconds,
    settings,
    reduceSettings,
    snapshot,
    reduceSnapshot,
  } = usePomodoroTimer();

  const { Modal: SettingsModal, openModal: openSettingsModal } = useModal();

  return (
    <div className="max-w-md mx-auto text-base-content">
      <section className="flex flex-row justify-between items-center text-base-content">
        <SubHeader className="mb-0">Pomodoro</SubHeader>
        <button
          className="btn btn-square btn-ghost"
          onClick={openSettingsModal}
        >
          <Cog6Tooth />
        </button>
      </section>
      <Divider className="my-0" />
      <PomodoroTimerStateTabs
        activeTab={snapshot.state}
        tabs={ALL_POMODORO_TIMER_STATES.map((state) => ({
          label: state,
          onClick: (state) =>
            reduceSnapshot({ type: "state", payload: { state: state } }),
        }))}
      />
      <PomodoroTimerCounter
        className="py-6 sm:py-12"
        secondsLeft={currentStepDurationInSeconds - snapshot.secondsCounter}
      />
      <PomodoroTimerPlayback
        isPaused={snapshot.isPaused}
        onSkip={() => reduceSnapshot({ type: "skip" })}
        onTogglePause={() =>
          reduceSnapshot({
            type: "is-paused",
            payload: { isPaused: !snapshot.isPaused },
          })
        }
      />
      <Divider />
      <SubHeader>Tasks</SubHeader>
      <PomodoroTasks dispatcher={reduceSnapshot} tasks={snapshot.tasks} />

      {/* MODALS */}
      <SettingsModal className="text-base-content">
        <PomodoroSettingsManagements
          reduceSettings={reduceSettings}
          settings={settings}
        />
      </SettingsModal>
    </div>
  );
}
