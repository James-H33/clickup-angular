import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createTaskStart, createTaskSuccess, loadTasksForViewStart, loadTasksForViewSuccess, updateTaskStatusStart, updateTaskStatusSuccess } from "./task.actions";
import { map, switchMap } from "rxjs/operators";
import { FakeTaskService } from "@common/fake-services/fake-task.service";
import { Store } from "@ngrx/store";

export const createTask$ = createEffect(
  (
    actions$ = inject(Actions),
    fakeTaskService = inject(FakeTaskService),
  ) => {
    return actions$.pipe(
      ofType(createTaskStart),
      switchMap((action) => {
        const { name, viewId } = action;

        return fakeTaskService.createTask(name, viewId)
          .pipe(
            map((task) => createTaskSuccess({task}))
          );
      })
    );
}, { functional: true });


export const loadTasksForView$ = createEffect(
  (
    actions$ = inject(Actions),
    fakeTaskService = inject(FakeTaskService),
  ) => {
    return actions$.pipe(
      ofType(loadTasksForViewStart),
      switchMap((action) => {
        const { viewId } = action;

        return fakeTaskService.loadTasksForView(viewId)
          .pipe(
            map((tasksMap) => loadTasksForViewSuccess({ tasksMap }))
          )
      })
    )
}, { functional: true })

export const updateTaskStatus$ = createEffect((
  actions$ = inject(Actions),
  fakeTaskService = inject(FakeTaskService),
) => {
  return actions$.pipe(
    ofType(updateTaskStatusStart),
    switchMap((action) => {
      const { taskId, status } = action;

      return fakeTaskService.updateTaskStatus(taskId, status)
        .pipe(
          map((task) => updateTaskStatusSuccess({ task }))
        )
    })
  )
}, { functional: true })
