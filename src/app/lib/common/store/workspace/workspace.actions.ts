import { createAction, props } from "@ngrx/store";

export const loadWorkspaceId = createAction(
  '[Workspace] Load Workspace ID',
);

export const loadWorkspaceIdSuccess = createAction(
  '[Workspace] Load Workspace ID Success',
  props<{ workspaceId: string }>()
);

export const setWorkspaceId = createAction(
  '[Workspace] Set Workspace ID',
  props<{ workspaceId: string }>()
);
