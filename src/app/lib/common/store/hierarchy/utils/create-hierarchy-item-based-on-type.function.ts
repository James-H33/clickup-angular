import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { HierarchyType } from "@common/types/hierarchy-type.enum";
import { createDummySpace, createDummyList } from "../fake-data-helpers/fake-data-helpers";

export function createHierarchyItemBasedOnType(
  name: string,
  parentId: string,
  createType: HierarchyType,
): HierarchyItem {

  if (createType === HierarchyType.SPACE) {
    return createDummySpace(name);
  }

  return createDummyList(name, parentId);
}
