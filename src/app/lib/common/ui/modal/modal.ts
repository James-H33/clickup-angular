import { Component, inject } from "@angular/core";
import { ModalManagerService } from "@common/services/modal-manager.service";

@Component({
  selector: 'cu-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
})
export class ModalComponent {
  modalManagerService = inject(ModalManagerService);

  modals = this.modalManagerService.modals$;
}
