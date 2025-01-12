import { SetStateAction } from "react";

export interface TTask {
  id: string;
  checked: boolean;
  name: string;
}

export type TCreateTask = (task: Omit<TTask, "id">) => void;
export type TDeleteTask = (taskId: string) => void;
export type TUpdateTask = (taskId: string, task: SetStateAction<TTask>) => void;
