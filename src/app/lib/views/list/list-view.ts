import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'cu-list-view',
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {}
