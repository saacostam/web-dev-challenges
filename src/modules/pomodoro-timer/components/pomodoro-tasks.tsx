import { Checkbox } from "../../core.components";
import { PlusIcon, TrashIcon } from "../../icons";
import { TTask } from "../types";

interface _TasksMutations {
  createTask: (task: TTask) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, task: TTask) => void;
}

export interface PomodoroTasksProps extends _TasksMutations {
  tasks: TTask[];
}

export function PomodoroTasks({
  createTask,
  deleteTask,
  tasks,
  updateTask,
}: PomodoroTasksProps) {
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <_PomodoroTask
          key={task.name}
          task={task}
          createTask={createTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
      <button
        className="btn btn-primary mt-4"
        onClick={() =>
          createTask({
            name: "🚀 Replace Me",
            checked: false,
          })
        }
      >
        <PlusIcon /> Add Task
      </button>
    </div>
  );
}

export interface _PomodoroTaskProps extends _TasksMutations {
  task: TTask;
}

function _PomodoroTask({ task, deleteTask, updateTask }: _PomodoroTaskProps) {
  return (
    <div className="w-full rounded-2xl shadow my-1 text-base-content flex items-center gap-x-2 p-4">
      <Checkbox />
      <input
        className="grow hover:bg-base-200 input input-ghost input-sm"
        value={task.name}
        onChange={() => updateTask(task.name, task)}
      />
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm btn-ghost btn-square"
        >
          ...
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow-lg"
        >
          <li>
            <button onClick={() => deleteTask(task.name)} className="p-2">
              <TrashIcon className="size-4" /> Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
