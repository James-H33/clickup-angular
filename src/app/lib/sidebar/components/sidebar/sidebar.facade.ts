import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class SidebarFacade {
  store = inject(Store);

  deleteItem(itemId: string): void {
    // Implementation for deleting an item
  }

  renameItem(itemId: string): void {
    // Implementation for renaming an item
  }

  openRenameDialog(itemId: string): void {

    // Implementation for opening a rename dialog
  }
}
