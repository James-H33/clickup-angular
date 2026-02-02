import { DialogRef } from "@angular/cdk/dialog";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";

@Component({
  selector: 'cu-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cu-cdk-overlay-pane-padding',
  },
  imports: [],
})
export class Modal {
  title = input<string>();
  dialogRef = inject(DialogRef);

  close(): void {
    this.dialogRef.close();
  }
}
