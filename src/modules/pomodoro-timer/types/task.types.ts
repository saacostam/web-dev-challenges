import { SetStateAction } from "react";

/**
 * Interface representing a task.
 * @typedef {Object} TTask
 * @property {string} id - Unique identifier for the task.
 * @property {boolean} checked - Whether the task is completed or not.
 * @property {string} name - Name or description of the task.
 */
export interface TTask {
  id: string;
  checked: boolean;
  name: string;
}

export type TCreateTask = (task: Omit<TTask, "id">) => void;
export type TDeleteTask = (taskId: string) => void;
export type TUpdateTask = (taskId: string, task: SetStateAction<TTask>) => void;
