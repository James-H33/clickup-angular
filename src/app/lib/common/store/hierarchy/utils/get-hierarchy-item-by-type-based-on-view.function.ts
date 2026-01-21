import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { HierarchyType } from "@common/types/hierarchy-type.enum";
import { ViewItem } from "@common/types/view-item.model";

export function getHierarchyItemByTypeBasedOnView(
  treeMap: Record<string, HierarchyItem>,
  viewsMap: Record<string, ViewItem>,
  currentViewId: string | null,
  type: HierarchyType,
): HierarchyItem | null {
  if (!currentViewId) {
    return null;
  }

  const parentId = viewsMap[currentViewId]?.parentId;

  if (!parentId) {
    return null;
  }

  function walkUpToType(itemId: string): HierarchyItem | null {
    const hierarchyItem = treeMap[itemId];

    if (hierarchyItem.type === type) {
      return hierarchyItem;
    }

    const parentId = hierarchyItem?.parentId;

    if (!parentId) {
      return null;
    }

    return walkUpToType(parentId);
  }

  return walkUpToType(parentId);
}
