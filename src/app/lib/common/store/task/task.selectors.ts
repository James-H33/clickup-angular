import { createSelector } from "@ngrx/store";
import { taskFeature } from "./task.reducer";

export const {
  selectTasksMap
} = taskFeature;

export const selectAllTasksForViewId = (viewId: string) => createSelector(
  selectTasksMap,
  (tasksMap) => {
    const tasks = Object.values(tasksMap) ?? [];
    const tasksForView = [];

    for (const task of tasks) {
      if (task.views.includes(viewId)) {
        tasksForView.push(task);
      }
    }

    return tasksForView;
  }
)
