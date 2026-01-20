import { ChangeDetectionStrategy, Component, effect, input } from "@angular/core";
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
  spaceId = input<string | null>();
  listId = input<string | null>();

  constructor() {
    effect(() => {
      const tree = this.tree();
      const spaceId = this.spaceId();
      const listId = this.listId();

      console.log('SidebarTree - tree:', tree);
      console.log('SidebarTree - spaceId:', spaceId);
      console.log('SidebarTree - listId:', listId);
    })
  }
}
