import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { createFeature, createReducer, on } from "@ngrx/store";
import { addHierarchyItemSuccess, addHierarchyItemSuccessAndRedirect, deleteHierarchyItemSuccess, loadTreeSuccess, renameHierarchyItemSuccess, setHierarchyFromRoutingEventSuccess } from "./hierarchy.actions";

export interface HierarchyState {
  currentViewId: string | null;
  tree: HierarchyItem[];
}

const initialState: HierarchyState = {
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

    on(setHierarchyFromRoutingEventSuccess, (state, { currentViewId }) => ({
      ...state,
      currentViewId,
    })),

    on(deleteHierarchyItemSuccess, (state, { hierarchy }) => {
      return {
        ...state,
        tree: hierarchy,
      };
    }),

    on(renameHierarchyItemSuccess, (state, { hierarchy }) => {
      return {
        ...state,
        tree: hierarchy,
      };
    }),

    on(addHierarchyItemSuccess, (state, { hierarchy }) => {
      return {
        ...state,
        tree: hierarchy,
      };
    }),

    on(addHierarchyItemSuccessAndRedirect, (state, { hierarchy }) => {
      return {
        ...state,
        tree: hierarchy,
      };
    }),
  ),
})
