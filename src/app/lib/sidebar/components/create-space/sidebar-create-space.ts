import { ChangeDetectionStrategy, Component, output } from "@angular/core";
import { ButtonModule } from "@common/ui/button/button.module";

@Component({
  selector: 'cu-sidebar-create-space',
  templateUrl: './sidebar-create-space.html',
  styleUrls: ['./sidebar-create-space.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule
  ]
})
export class SidebarCreateSpaceComponent {
  created = output<{ name: string}>();

  createSpace(nameInput: HTMLInputElement) {
    const name = nameInput.value.trim();

    if (name) {
      this.created.emit({ name });
      nameInput.value = '';
    }
  }
}
