import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'cu-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
