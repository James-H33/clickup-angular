import { ViewType } from "./view-type.enum";

export interface ViewItem {
  id: string;
  name: string;
  color: string;
  type: ViewType;
  parentId?: string;
}
