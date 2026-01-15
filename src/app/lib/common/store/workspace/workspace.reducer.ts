import { createFeature, createReducer, on } from "@ngrx/store";
import { loadWorkspaceIdSuccess, setWorkspaceId } from "./workspace.actions";

interface WorkspaceState {
  workspaceId: string | null;
}

const initialState: WorkspaceState = {
  workspaceId: null,
}

export const workspaceFeature = createFeature({
  name: 'workspace',

  reducer: createReducer<WorkspaceState>(initialState,
    on(setWorkspaceId, (state, { workspaceId }) => ({
      ...state,
      workspaceId,
    })),

    on(loadWorkspaceIdSuccess, (state, { workspaceId }) => ({
      ...state,
      workspaceId,
    })),

  ),
});
