import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'cu-settings-hub',
  templateUrl: './settings-hub.html',
  styleUrls: ['./settings-hub.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
  ],
})
export class SettingsHubComponent {

}
