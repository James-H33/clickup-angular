import { CdkMenu, CdkMenuTrigger } from "@angular/cdk/menu";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'cu-sidebar-context-menu',
  templateUrl: './sidebar-context-menu.html',
  styleUrls: ['./sidebar-context-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkMenuTrigger,
    CdkMenu,
  ]
})
export class SidebarContextMenu {

}
