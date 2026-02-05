export enum TaskStatuses {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const TaskStatusesName = {
  [TaskStatuses.TODO]: 'To Do',
  [TaskStatuses.IN_PROGRESS]: 'In Progress',
  [TaskStatuses.DONE]: 'Done',
}

export function taskStatusesList() {
  return Object.values(TaskStatuses).map((statusKey) => ({
    key: statusKey,
    name: TaskStatusesName[statusKey],
  }));
}
