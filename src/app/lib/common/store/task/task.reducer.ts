import { Task } from "@common/types/task.model";
import { createFeature, createReducer } from "@ngrx/store";
import { on } from "@ngrx/store";
import { createTaskSuccess } from "../task/task.actions";

interface TaskState {
  tasksMap: Record<string, Task>;
}

export const initialTaskState: TaskState = {
  tasksMap: {}
};

export const taskFeature = createFeature({
  name: 'task',
  reducer: createReducer<TaskState>(initialTaskState,
    on(createTaskSuccess, (state, { task }) => {
      return {
        ...state,
        tasksMap: {
          ...state.tasksMap,
          [task.id]: task
        }
      };
    }),
  )
});
