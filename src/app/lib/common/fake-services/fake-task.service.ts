import { Inject, Injectable } from "@angular/core";
import { TaskStatuses } from "@common/types/task-statuses.enum";
import { Task } from "@common/types/task.model";
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
}
