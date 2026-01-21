import { ChangeDetectionStrategy, Component, output } from "@angular/core";
import { AutoFocusDirective } from "@common/ui/auto-focus/auto-focus.directive";
import { ButtonModule } from "@common/ui/button/button.module";

@Component({
  selector: 'cu-sidebar-create-space',
  templateUrl: './sidebar-create-space.html',
  styleUrls: ['./sidebar-create-space.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AutoFocusDirective,
    ButtonModule,
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
