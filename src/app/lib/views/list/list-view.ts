import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core";
import { TaskListComponent } from "../components/task-list/task-list";
import { Store } from "@ngrx/store";
import { selectCurrentView } from "@common/store/hierarchy/hierarchy.selectors";
import { createTaskStart, loadTasksForViewStart, updateTaskStatusStart } from "@common/store/task/task.actions";

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

  constructor() {
    effect(() => {
      const view = this.currentView();

      if (!view) {
        return;
      }

      this.store.dispatch(
        loadTasksForViewStart({ viewId: view.id })
      );
    });
  }

  onCreateTask(event: {
    name: string,
    viewId: string,
    description?: string
  }): void {
    this.store.dispatch(createTaskStart({
      name: event.name,
      viewId: event.viewId,
    }));
  }

  onStatusChanged(event: { status: string, taskId: string }): void {
    console.log('Status changed from ListViewComponent: ', event);

    this.store.dispatch(
      updateTaskStatusStart({
        taskId: event.taskId,
        status: event.status
      })
    );
  }
}
