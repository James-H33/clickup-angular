import { HierarchyType } from "./hierarchy-type.enum";
import { ViewItem } from "./view-item.model";

export interface HierarchyItem {
  id: string;
  name: string;
  color: string;
  type: HierarchyType;
  views: ViewItem[];
  children?: HierarchyItem[];
  parentId?: string;
}
