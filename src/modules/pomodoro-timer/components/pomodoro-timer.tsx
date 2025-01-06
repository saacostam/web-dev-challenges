import { Divider, SubHeader, useModal } from "../../core.components";
import { Cog6Tooth } from "../../icons";
import { usePomodoroTimer } from "../hooks";
import { PomodoroSettingsManagements } from "./pomodoro-settings-management";

export function PomodoroTimer() {
  const { settings, reduceSettings } = usePomodoroTimer();

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
      <Divider className="mt-0" />
      <SettingsModal>
        <PomodoroSettingsManagements
          reduceSettings={reduceSettings}
          settings={settings}
        />
      </SettingsModal>
    </div>
  );
}
