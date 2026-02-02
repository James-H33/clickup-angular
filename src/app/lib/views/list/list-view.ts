import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TaskListComponent } from "../components/task-list/task-list";
import { Store } from "@ngrx/store";
import { selectCurrentView } from "@common/store/hierarchy/hierarchy.selectors";
import { createTaskStart } from "@common/store/task/task.actions";

@Component({
  selector: 'cu-list-view',
  templateUrl: './list-view.html',
  styleUrls: ['./list-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskListComponent],
})
export class ListViewComponent {
  store = inject(Store);

  currentView = this.store.selectSignal(selectCurrentView);

  onCreateTask(event: {
    name: string,
    viewId: string,
    description?: string
  }): void {
    this.store.dispatch(createTaskStart({
      name: event.name,
      viewId: event.viewId,
    }));
    // Handle task creation logic here
  }
}
