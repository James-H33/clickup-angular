import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createTaskStart, createTaskSuccess } from "./task.actions";
import { map, switchMap } from "rxjs/operators";
import { FakeTaskService } from "@common/fake-services/fake-task.service";
import { Store } from "@ngrx/store";

export const createTask$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
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
