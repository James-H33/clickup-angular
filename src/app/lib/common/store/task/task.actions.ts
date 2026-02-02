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
