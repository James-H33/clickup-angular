import { TaskStatus } from "./task-status.model";

export interface Task {
  id: string;
  name: string;
  description?: string;
  startDate?: number;
  dueDate?: number;
  status: TaskStatus;
  lists: string[];
}
