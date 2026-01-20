import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadWorkspaceId, loadWorkspaceIdSuccess, loadWorkspaceStart, loadWorkspaceSuccess } from "./workspace.actions";
import { catchError, EMPTY, map } from "rxjs";
import { WorkspaceService } from "../../services/workspace.service";

export const loadWorkspaceId$ = createEffect(
  (
    $actions = inject(Actions),
    workspaceService = inject(WorkspaceService),
  ) => {
  return $actions.pipe(
    ofType(loadWorkspaceId),
    map(() => {
      const workspaceId = workspaceService.getWorkspaceId();

      if (!workspaceId) {
        throw new Error('No workspace ID found');
          }

      return loadWorkspaceIdSuccess({ workspaceId });
    }),
    catchError((error) => {
      console.error('Error loading workspace ID:', error);

      return EMPTY;
    })
  );
}, { functional: true });

export const loadWorkspace$ = createEffect(
  (
    $actions = inject(Actions),
  ) => {
  return $actions.pipe(
    ofType(loadWorkspaceStart),
    map(() => {
      return loadWorkspaceSuccess();
    }),
    catchError((error) => {
      console.error('Error loading workspace:', error);

      return EMPTY;
    })
  );
}, { functional: true });
