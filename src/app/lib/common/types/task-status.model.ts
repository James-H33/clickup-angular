import { TaskStatuses } from "./task-statuses.enum";

export interface TaskStatus {
  id: string;
  status: TaskStatuses;
}
