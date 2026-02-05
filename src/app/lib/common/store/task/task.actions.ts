import { Task } from "@common/types/task.model";
import { createAction, props } from "@ngrx/store";

export const createTaskStart = createAction(
  '[Task] Create Task Start',
  props<{
    name: string,
    viewId: string,
    description?: string
  }>()
);

export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: Task }>()
);

export const loadTasksForViewStart = createAction(
  '[Task] Load Tasks For View Start',
  props<{ viewId: string }>()
);

export const loadTasksForViewSuccess = createAction(
  '[Task] Load Tasks For View Success',
  props<{ tasksMap: Record<string, Task> }>()
);

export const updateTaskStatusStart = createAction(
  '[Task] Update Task Status Start',
  props<{
    taskId: string,
    status: string
  }>()
);

export const updateTaskStatusSuccess = createAction(
  '[Task] Update Task Status Success',
  props<{ task: Task }>()
);
