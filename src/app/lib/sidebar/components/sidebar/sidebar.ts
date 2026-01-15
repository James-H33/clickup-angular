import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonModule } from "@ui/button/button.module";

@Component({
  selector: 'cu-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
  ]
})
export class SidebarComponent {

}
