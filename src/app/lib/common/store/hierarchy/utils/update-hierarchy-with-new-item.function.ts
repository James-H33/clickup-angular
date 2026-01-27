import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { HierarchyType } from "@common/types/hierarchy-type.enum";

export function updateHierarchyWithNewItem(
  tree: HierarchyItem[],
  treeMap: Record<string, HierarchyItem>,
  newItem: HierarchyItem,
): HierarchyItem[] {
  let updatedHierarchy = [...tree];

  if (newItem.type === HierarchyType.LIST) {
    const parentId = newItem.parentId as string;
    const parentItem = treeMap[parentId];

    if (parentItem && parentItem.children) {
      const updatedParentItem = {
        ...parentItem,
        children: [...parentItem.children, newItem],
      };

      updatedHierarchy = updatedHierarchy.map(item => {
        return item.id === parentId
          ? updatedParentItem as HierarchyItem
          : item
      });
    }
  } else {
    updatedHierarchy = [...updatedHierarchy, newItem];
  }

  return updatedHierarchy;
}
