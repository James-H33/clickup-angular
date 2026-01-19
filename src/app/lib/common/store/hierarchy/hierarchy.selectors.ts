import { createSelector } from "@ngrx/store";
import { hierarchyFeature } from "./hierarchy.reducer";
import { HierarchyItem } from "@common/types/hierarchy-item.model";

export const {
  selectHierarchyState,
  selectCurrentSpaceId,
  selectCurrentViewId,
  selectTree,
} = hierarchyFeature;

function flattenTree(
  tree: HierarchyItem[],
  result: HierarchyItem[] = [],
): HierarchyItem[] {
  for (let item of tree) {
    result.push(item);

    if (item.children && item.children.length) {
      flattenTree(item.children, result);
    }
  }

  return result;
}

export const selectFlattenedTree = createSelector(
  selectTree,
  (tree) => {
    return flattenTree(tree, []);
  }
);

export const selectCurrentSpace = createSelector(
  selectTree,
  selectCurrentSpaceId,
  (tree, currentSpaceId) => tree.find(item => item.id === currentSpaceId) || null
);

export const selectCurrentList = createSelector(
  selectTree,
  selectCurrentSpaceId,
  selectCurrentViewId,
  (
    tree,
    currentSpaceId,
    currentViewId
  ) => {
    const currentSpace = tree.find(item => item.id === currentSpaceId);

    if (!currentSpace || !currentSpace.views) {
      return null;
    }

    return currentSpace.views.find(view => view.id === currentViewId) || null;
  }
);

// export const selectCurrentView = createSelector(
//   selectTree,
//   selectCurrentSpaceId,
//   selectCurrentViewId,
//   (
//     tree,
//     currentSpaceId,
//     currentViewId
//   ) => {
//     const currentSpace = tree.find(item => item.id === currentSpaceId);
//     if (!currentSpace || !currentSpace.views) {
//       return null;
//     }
//   }
// );
