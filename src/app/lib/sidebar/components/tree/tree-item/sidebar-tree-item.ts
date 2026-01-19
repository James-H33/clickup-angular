import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { RouterLink } from "@angular/router";
import { getHierarchyLinkByType } from "@common/utils/get-hierarchy-link-by-type.function";

@Component({
  selector: 'cu-sidebar-tree-item',
  templateUrl: './sidebar-tree-item.html',
  styleUrls: ['./sidebar-tree-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class SidebarTreeItem {
  item = input<HierarchyItem>();

  routerLink = computed(() => {
    const item = this.item();

    if (!item) {
      return null;
    }

    return getHierarchyLinkByType(item);
  });
}
