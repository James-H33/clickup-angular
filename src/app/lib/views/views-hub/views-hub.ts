import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ButtonIconModule } from "@common/ui/button-icon/button-icon.module";
import { ButtonModule } from "@common/ui/button/button.module";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'cu-views-hub',
  templateUrl: './views-hub.html',
  styleUrls: ['./views-hub.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    ButtonModule,
    ButtonIconModule,
    FaIconComponent
],
})
export class ViewsHubComponent {
  faChartBar = faChartBar;
}
