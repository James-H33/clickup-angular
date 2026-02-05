import { CdkMenu, CdkMenuTrigger } from "@angular/cdk/menu";
import { ChangeDetectionStrategy, Component, viewChild } from "@angular/core";

@Component({
  selector: 'cu-dropdown-menu',
  templateUrl: './dropdown-menu.html',
  styleUrls: ['./dropdown-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkMenuTrigger,
    CdkMenu,
  ]
})
export class DropdownMenuComponent {
  cdkMenu = viewChild(CdkMenu);
  cdkMenuTrigger = viewChild(CdkMenuTrigger);

  close(): void {
    const menu = this.cdkMenu();
    menu?.menuStack.closeAll();
  }
}
