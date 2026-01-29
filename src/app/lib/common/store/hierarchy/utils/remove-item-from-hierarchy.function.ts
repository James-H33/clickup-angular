import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { HierarchyType } from "@common/types/hierarchy-type.enum";

export function removeItemFromHierarchy(
  tree: HierarchyItem[],
  treeMap: Record<string, HierarchyItem>,
  itemToRemove: HierarchyItem,
): HierarchyItem[] {
  const item = treeMap[itemToRemove.id];

  let updatedHierarchy = [...tree];

  if (item.type === HierarchyType.LIST) {
    const parentId = item.parentId;

    const parentItem = updatedHierarchy.find(i => i.id === parentId);

    if (parentItem && parentItem.children) {
      const updatedParentItem = {
        ...parentItem,
        children: parentItem.children.filter(child => child.id !== itemToRemove.id),
      };

      updatedHierarchy = updatedHierarchy.map(item => {
        return item.id === parentId
          ? updatedParentItem as HierarchyItem
          : item
      });
    }
  } else {
    updatedHierarchy = updatedHierarchy.filter(i => i.id !== itemToRemove.id);
  }

  return updatedHierarchy;
}
