import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { selectTree } from "@common/store/hierarchy/hierarchy.selectors";
import { selectTasksMap } from "@common/store/task/task.selectors";
import { TASK_STORAGE_KEY } from "@common/types/tree-storage-key.const";
import { Store } from "@ngrx/store";
import { skip, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskDataChangeService {
  store = inject(Store);
  tasksMap$ = this.store.select(selectTasksMap);

  private destroyRef = inject(DestroyRef);

  watchTaskDataChanges(): void {
    this.tasksMap$
      .pipe(
        skip(1),
        tap((tasksMap) => {
          localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasksMap));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
