import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { SidebarTreeItem } from "./tree-item/sidebar-tree-item";
import { HierarchyItem } from "@common/types/hierarchy-item.model";

@Component({
  selector: 'cu-sidebar-tree',
  templateUrl: './sidebar-tree.html',
  styleUrls: ['./sidebar-tree.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidebarTreeItem
  ]
})
export class SidebarTree {
  tree = input<HierarchyItem[]>();
}
