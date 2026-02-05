import { inject, Inject, Injectable } from "@angular/core";
import { TaskStatuses } from "@common/types/task-statuses.enum";
import { Task } from "@common/types/task.model";
import { TASK_STORAGE_KEY, TREE_STORAGE_KEY } from "@common/types/tree-storage-key.const";
import { map, Observable, of, timer, withLatestFrom } from "rxjs";
import { loadTasksFromStorage } from "./load-tasks-from-storage.function";
import { Store } from "@ngrx/store";
import { selectTasksMap } from "@common/store/task/task.selectors";

const makeId = (): string => {
  return Math.random().toString(36).substring(2, 15);
}

function createFakeTask(
  name: string,
  viewId: string,
): Task {
  return {
    id: makeId(),
    name,
    description: '',
    status: TaskStatuses.TODO,
    startDate: undefined,
    dueDate: undefined,
    views: [viewId],
  };
}

@Injectable({
  providedIn: 'root'
})
export class FakeTaskService {
  store = inject(Store);
  tasksMap$ = this.store.select(selectTasksMap);

  createTask(
    name: string,
    viewId: string,
  ): Observable<Task> {
    return timer(300).pipe(
      map(() => createFakeTask(name, viewId))
    );
  }

  loadTasksForView(viewId: string): Observable<Record<string, Task>> {
    const allTasks = loadTasksFromStorage();

    return timer(300).pipe(
      map(() => allTasks)
    );
  }

  updateTaskStatus(
    taskId: string,
    status: string
  ): Observable<Task> {
    return timer(300)
      .pipe(
        withLatestFrom(this.tasksMap$),
        map(([_, tasksMap]) => {
          const task = tasksMap[taskId];
          const updatedTask = { ...task, status } as Task;

          return updatedTask;
        })
      );
  }
}
