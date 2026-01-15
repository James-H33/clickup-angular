import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'cu-board-view',
  templateUrl: './board-view.html',
  styleUrls: ['./board-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardViewComponent {}
