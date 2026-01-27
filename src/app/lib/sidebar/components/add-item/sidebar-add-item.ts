import { DialogRef } from "@angular/cdk/dialog";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { addHierarchyItemStart, renameHierarchyItemStart } from "@common/store/hierarchy/hierarchy.actions";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { HierarchyType } from "@common/types/hierarchy-type.enum";
import { Store } from "@ngrx/store";

@Component({
  selector: 'cu-sidebar-add-item',
  templateUrl: './sidebar-add-item.html',
  styleUrls: ['./sidebar-add-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cu-cdk-overlay-pane-padding',
  },
})
export class SidebarAddItemComponent {
  store = inject(Store);
  dialogRef = inject(DialogRef);

  parentItem = input<HierarchyItem>();

  add(name: string): void {
    const item = this.parentItem();

    if (!item || !name.trim()) {
      return;
    }

    this.store.dispatch(
      addHierarchyItemStart({
        parentId: item.id,
        createType: HierarchyType.LIST,
        name: name.trim(),
        redirect: true,
      }),
    );

    this.dialogRef.close();
  }
}
