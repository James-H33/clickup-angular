import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { ButtonModule } from "@common/ui/button/button.module";
import { Store } from "@ngrx/store";
import { InputDirective } from "@common/ui/input/input.directive";
import { renameHierarchyItemStart } from "@common/store/hierarchy/hierarchy.actions";
import { DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'cu-sidebar-rename-item',
  templateUrl: './sidebar-rename-item.html',
  styleUrls: ['./sidebar-rename-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
    class: 'cu-cdk-overlay-pane-padding',
  },
  imports: [
    ButtonModule,
    InputDirective
  ]
})
export class SidebarRenameItemComponent {
  store = inject(Store);
  dialogRef = inject(DialogRef);

  item = input<HierarchyItem>();

  rename(newName: string): void {
    const item = this.item();

    if (!item || !newName.trim() || newName.trim() === item.name) {
      return;
    }

    this.store.dispatch(
      renameHierarchyItemStart({ itemId: item.id, name: newName.trim() }),
    );

    this.dialogRef.close();
  }
}
