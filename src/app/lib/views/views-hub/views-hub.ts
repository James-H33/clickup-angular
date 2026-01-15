import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'cu-views-hub',
  templateUrl: './views-hub.html',
  styleUrls: ['./views-hub.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
  ],
})
export class ViewsHubComponent {

}
