import { Inject, Injectable } from "@angular/core";
import { TaskStatuses } from "@common/types/task-statuses.enum";
import { Task } from "@common/types/task.model";
import { TASK_STORAGE_KEY, TREE_STORAGE_KEY } from "@common/types/tree-storage-key.const";
import { map, Observable, of, timer } from "rxjs";

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
  createTask(
    name: string,
    viewId: string,
  ): Observable<Task> {
    return timer(300).pipe(
      map(() => createFakeTask(name, viewId))
    );
  }

  loadTasksForView(viewId: string): Observable<Record<string, Task>> {
    const allTasks = this.loadTasksFromStorage();

    return timer(300).pipe(
      map(() => allTasks)
    );
  }

  private loadTasksFromStorage() {
    try {
      const treeJson = localStorage.getItem(TASK_STORAGE_KEY);

      if (treeJson) {
        return JSON.parse(treeJson);
      } else {
        return {};
      }
    } catch (e) {
      return {};
    }
  }
}
