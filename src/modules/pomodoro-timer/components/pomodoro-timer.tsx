import { Divider, SubHeader, useModal } from "../../core.components";
import { Cog6Tooth } from "../../icons";
import { ALL_POMODORO_TIMER_STATES } from "../constants";
import { usePomodoroTimer } from "../hooks";
import { PomodoroSettingsManagements } from "./pomodoro-settings-management";
import { PomodoroTimerStateTabs } from "./pomodoro-timer-state-tabs";

export function PomodoroTimer() {
  const { settings, reduceSettings, snapshot, reduceSnapshot } =
    usePomodoroTimer();

  const { Modal: SettingsModal, openModal: openSettingsModal } = useModal();

  return (
    <div className="max-w-md mx-auto">
      <section className="flex flex-row justify-between items-center">
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

      {/* MODALS */}
      <SettingsModal>
        <PomodoroSettingsManagements
          reduceSettings={reduceSettings}
          settings={settings}
        />
      </SettingsModal>
    </div>
  );
}
