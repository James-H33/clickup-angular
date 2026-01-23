import { ChangeDetectionStrategy, Component, effect, inject, inputBinding, signal } from "@angular/core";
import { ButtonModule } from "@ui/button/button.module";
import { SidebarCreateSpaceComponent } from "../create-space/sidebar-create-space";

import {
  CdkMenu,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { Store } from "@ngrx/store";
import { createSpaceStart, deleteHierarchyItemStart, renameHierarchyItemStart } from "@common/store/hierarchy/hierarchy.actions";
import { SidebarTree } from "../tree/sidebar-tree";
import { selectCurrentListId, selectCurrentSpaceId, selectCurrentViewId, selectFlattenedTree, selectTree } from "@common/store/hierarchy/hierarchy.selectors";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { Dialog } from "@angular/cdk/dialog";
import { SidebarRenameItemComponent } from "../rename-item/sidebar-rename-item";

@Component({
  selector: 'cu-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    SidebarCreateSpaceComponent,
    CdkMenuTrigger,
    CdkMenu,
    SidebarTree
  ]
})
export class SidebarComponent {
  private store = inject(Store);
  private dialog = inject(Dialog);

  tree = this.store.selectSignal(selectTree);
  flattenedTree = this.store.selectSignal(selectFlattenedTree);
  currentSpaceId = this.store.selectSignal(selectCurrentSpaceId);
  currentListId = this.store.selectSignal(selectCurrentListId);

  onCreateSpace(event: { name: string }) {
    this.store.dispatch(
      createSpaceStart({ name: event.name }),
    );
  }

  deleteItem(item: HierarchyItem) {
    this.store.dispatch(
      deleteHierarchyItemStart({ itemId: item.id }),
    );
  }

  renameItem(item: HierarchyItem) {
    const dialogRef = this.dialog.open(SidebarRenameItemComponent, {
      width: '375px',
      // height: '300px',
    });

    const componentRef = dialogRef?.componentRef;

    if (componentRef) {
      componentRef.setInput('item', item);
    }

    // Open rename dialog logic to be implemented

    // this.store.dispatch(
    //   renameHierarchyItemStart({ itemId: item.id }),
    // );
  }
}
