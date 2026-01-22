import { ChangeDetectionStrategy, Component, computed, input, output } from "@angular/core";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { RouterLink } from "@angular/router";
import { getHierarchyLinkByType } from "@common/utils/get-hierarchy-link-by-type.function";
import { DropdownMenuComponent } from "@common/ui/dropdown-menu/dropdown-menu";
import { FirstCharPipe } from "@common/pipes/first-char.pipe";
import { faMap, faPenToSquare, faRectangleList, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ButtonIconDirective } from "@common/ui/button-icon/button-icon.directive";
import { Nullable } from "@common/types/nullable";

@Component({
  selector: 'cu-sidebar-tree-item',
  templateUrl: './sidebar-tree-item.html',
  styleUrls: ['./sidebar-tree-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    DropdownMenuComponent,
    FaIconComponent,
    ButtonIconDirective,
    FirstCharPipe,
  ],
})
export class SidebarTreeItem {
  item = input<HierarchyItem>();
  isActive = input<boolean>();

  itemDeleted = output<HierarchyItem>();

  faRectangleList = faRectangleList;
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  routerLink = computed(() => {
    const item = this.item();

    if (!item) {
      return null;
    }

    return getHierarchyLinkByType(item);
  });

  deleteItem(
    item: Nullable<HierarchyItem>
  ) {
    if (!item) {
      return;
    }

    console.log('Delete item:', item);

    this.itemDeleted.emit(item);
  }
}
