import { createSelector } from "@ngrx/store";
import { hierarchyFeature } from "./hierarchy.reducer";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { ViewItem } from "@common/types/view-item.model";

export const {
  selectHierarchyState,
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

export const selectTreeMap = createSelector(
  selectFlattenedTree,
  (tree) => {
    const map: Record<string, HierarchyItem> = {};

    for (let item of tree) {
      map[item.id] = item;
    }

    return map;
  }
);

export const selectViewsMap = createSelector(
  selectFlattenedTree,
  (flattenedTree) => {
    const viewsMap: Record<string, ViewItem> = {};

    for (let item of flattenedTree) {
      if (item.views && item.views.length) {
        for (let view of item.views) {
          viewsMap[view.id] = view;
        }
      }
    }

    return viewsMap;
  }
);

export const selectCurrentView = createSelector(
  selectViewsMap,
  selectCurrentViewId,
  (viewsMap, currentViewId) => {
    if (!currentViewId) {
      return null;
    }

    return viewsMap[currentViewId] || null;
  }
);

export const selectCurrentSpace = createSelector(
  selectTreeMap,
  selectViewsMap,
  selectCurrentViewId,
  (tree, viewsMap, currentViewId) => {
    if (!currentViewId) {
      return null;
    }

    const listId  = viewsMap[currentViewId]?.parentId as string;
    const spaceId = tree[listId]?.parentId as string;

    return tree[spaceId] || null;
  }
);

export const selectCurrentList = createSelector(
  selectTreeMap,
  selectViewsMap,
  selectCurrentViewId,
  (tree, viewsMap, currentViewId) => {
    if (!currentViewId) {
      return null;
    }

    const listId = viewsMap[currentViewId]?.parentId as string;

    return tree[listId] || null;
  }
);

export const selectCurrentSpaceId = createSelector(
  selectCurrentSpace,
  (space) => space?.id || null,
);

export const selectCurrentListId = createSelector(
  selectCurrentList,
  (list) => list?.id || null,
);
