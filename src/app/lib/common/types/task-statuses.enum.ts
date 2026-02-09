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

export const TaskStatusesColor = {
  [TaskStatuses.TODO]: '#0000000f',
  [TaskStatuses.IN_PROGRESS]: '#9c2bad',
  [TaskStatuses.DONE]: '#cb1d63',
}

export const DefaultTaskStatuses = [
  {
    key: TaskStatuses.TODO,
    name: TaskStatusesName[TaskStatuses.TODO],
    color: TaskStatusesColor[TaskStatuses.TODO],
  },
  {
    key: TaskStatuses.IN_PROGRESS,
    name: TaskStatusesName[TaskStatuses.IN_PROGRESS],
    color: TaskStatusesColor[TaskStatuses.IN_PROGRESS],
  },
  {
    key: TaskStatuses.DONE,
    name: TaskStatusesName[TaskStatuses.DONE],
    color: TaskStatusesColor[TaskStatuses.DONE],
  },
]
