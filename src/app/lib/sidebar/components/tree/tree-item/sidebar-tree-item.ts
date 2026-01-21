import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { RouterLink } from "@angular/router";
import { getHierarchyLinkByType } from "@common/utils/get-hierarchy-link-by-type.function";
import { SidebarContextMenu } from "../../context-menu/sidebar-context-menu";

@Component({
  selector: 'cu-sidebar-tree-item',
  templateUrl: './sidebar-tree-item.html',
  styleUrls: ['./sidebar-tree-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, SidebarContextMenu],
})
export class SidebarTreeItem {
  item = input<HierarchyItem>();
  isActive = input<boolean>();

  routerLink = computed(() => {
    const item = this.item();

    if (!item) {
      return null;
    }

    return getHierarchyLinkByType(item);
  });
}
