import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TaskListComponent } from "../components/task-list/task-list";

@Component({
  selector: 'cu-list-view',
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskListComponent],
})
export class ListViewComponent {}
