import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { createFeature, createReducer, on } from "@ngrx/store";
import { createSpaceSuccess, loadTreeSuccess } from "./hierarchy.actions";

export interface HierarchyState {
  currentSpaceId: string | null;
  currentViewId: string | null;
  tree: HierarchyItem[];
}

const initialState: HierarchyState = {
  currentSpaceId: null,
  currentViewId: null,
  tree: [],
}

export const hierarchyFeature = createFeature({
  name: 'hierarchy',

  reducer: createReducer(initialState,
    on(loadTreeSuccess, (state, { hierarchy }) => ({
      ...state,
      tree: hierarchy,
    })),

    on(createSpaceSuccess, (state, { space }) => ({
      ...state,
      tree: [...state.tree, space],
    })),
  ),
})
