import { inject, Inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Dialog, DialogModule, DialogRef } from "@angular/cdk/dialog";

@Injectable({
  providedIn: 'root',
})
export class ModalManagerService {
  modals$ = new Subject();
  dialog = inject(Dialog);

  openModal<T>(component: any, data?: any): DialogRef<T> {
    const dialogRef = this.dialog.open(component, {
      data: data,
    });

    return dialogRef as DialogRef<T>;
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
