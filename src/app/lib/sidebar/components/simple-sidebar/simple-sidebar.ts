import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarItem } from "../item/sidebar-item";
import { SidebarItemType, SimpleSidebarService } from "./simple-sidebar.service";

@Component({
  selector: 'cu-simple-sidebar',
  templateUrl: './simple-sidebar.html',
  styleUrls: ['./simple-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SidebarItem
  ],
  providers: [SimpleSidebarService]
})
export class SimpleSidebarComponent {
  private sidebarService = inject(SimpleSidebarService);

  itemsWithUrls = this.sidebarService.itemsWithUrls;

  routeUser(item: SidebarItemType) {
    this.sidebarService.routeUser(item);
  }
}
