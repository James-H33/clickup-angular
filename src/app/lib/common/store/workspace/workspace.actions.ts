import { createAction, props } from "@ngrx/store";

export const loadWorkspaceId = createAction(
  '[Workspace] Load Workspace ID',
);

export const loadWorkspaceIdSuccess = createAction(
  '[Workspace] Load Workspace ID Success',
  props<{ workspaceId: string }>()
);

export const loadWorkspaceStart = createAction(
  '[Workspace] Load Workspace',
  props<{ id: string }>()
);

export const loadWorkspaceSuccess = createAction(
  '[Workspace] Load Workspace Success',
);

export const setWorkspaceId = createAction(
  '[Workspace] Set Workspace ID',
  props<{ workspaceId: string }>()
);
