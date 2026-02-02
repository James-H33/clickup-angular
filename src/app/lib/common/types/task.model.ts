import { TaskStatuses } from "./task-statuses.enum";

export interface Task {
  id: string;
  name: string;
  description?: string;
  startDate?: number;
  dueDate?: number;
  status: TaskStatuses;
  views: string[];
}
