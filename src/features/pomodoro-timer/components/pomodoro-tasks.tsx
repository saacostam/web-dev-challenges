import { Dispatch, useRef } from "react";

import { Checkbox } from "@/shared/components";
import { PlusIcon, TrashIcon } from "@/shared/icons";
import { useTasksCRUD } from "../hooks";
import {
  TCreateTask,
  TDeleteTask,
  TPomodoroTimerSnapshotAction,
  TTask,
  TUpdateTask,
} from "../types";

/**
 * Props for the PomodoroTasks component.
 * @interface PomodoroTasksProps
 * @property {Dispatch<TPomodoroTimerSnapshotAction>} dispatcher - The dispatcher for Pomodoro timer snapshot actions.
 * @property {TTask[]} tasks - The list of tasks to be displayed.
 */
export interface PomodoroTasksProps {
  dispatcher: Dispatch<TPomodoroTimerSnapshotAction>;
  tasks: TTask[];
}

/**
 * Component to manage and display tasks for the Pomodoro timer.
 * @component
 */
export function PomodoroTasks({ dispatcher, tasks }: PomodoroTasksProps) {
  const { createTask, deleteTask, updateTask } = useTasksCRUD({
    dispatcher,
  });

  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <PomodoroTask
          key={task.id}
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
            name: "",
            checked: false,
          })
        }
      >
        <PlusIcon /> Add Task
      </button>
    </div>
  );
}

/**
 * Props for the PomodoroTask component.
 * @interface PomodoroTaskProps
 * @property {TTask} task - The task data to be managed.
 * @property {TCreateTask} createTask - Function to create a new task.
 * @property {TDeleteTask} deleteTask - Function to delete an existing task.
 * @property {TUpdateTask} updateTask - Function to update an existing task.
 */
interface PomodoroTaskProps {
  task: TTask;
  createTask: TCreateTask;
  deleteTask: TDeleteTask;
  updateTask: TUpdateTask;
}

/**
 * Component to manage an individual Pomodoro task.
 * @component
 */
function PomodoroTask({ task, deleteTask, updateTask }: PomodoroTaskProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full rounded-2xl shadow my-1 text-base-content flex items-center gap-x-2 p-4">
      <Checkbox
        checked={task.checked}
        onChange={(e) =>
          updateTask(task.id, (state) => ({
            ...state,
            checked: e.target.checked,
          }))
        }
      />
      <form
        className="grow"
        onSubmit={(e) => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
      >
        <input
          className="w-full hover:bg-base-200 input input-ghost input-sm"
          value={task.name}
          onChange={(e) =>
            updateTask(task.id, (state) => ({ ...state, name: e.target.value }))
          }
          placeholder="Add Task Name..."
          ref={inputRef}
        />
      </form>
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
            <button onClick={() => deleteTask(task.id)} className="p-2">
              <TrashIcon className="size-4" /> Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
