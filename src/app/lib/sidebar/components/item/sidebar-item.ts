import { ChangeDetectionStrategy, Component, inject, input, output } from "@angular/core";

import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'cu-sidebar-item',
  templateUrl: './sidebar-item.html',
  styleUrls: ['./sidebar-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontAwesomeModule,
  ],
})
export class SidebarItem {
  icon = input<IconDefinition>();
  isActiveRoute = input<boolean>();
  label = input<string>();
  clicked = output();
}
