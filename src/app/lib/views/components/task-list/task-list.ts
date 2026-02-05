import { ChangeDetectionStrategy, Component, computed, inject, Inject, input, output } from "@angular/core";
import { ButtonIconModule } from "@common/ui/button-icon/button-icon.module";
import { ButtonModule } from "@common/ui/button/button.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "@common/ui/modal/modal";
import { Dialog } from "@angular/cdk/dialog";
import { NewTaskComponent } from "../new-task/new-task";
import { ViewItem } from "@common/types/view-item.model";
import { select, Store } from "@ngrx/store";
import { selectAllTasksForViewId } from "@common/store/task/task.selectors";
import { Task } from "@common/types/task.model";
import { RouterLink } from "@angular/router";
import { TooltipDirective } from "@common/ui/tooltip/tooltip.directive";
import { StatusComponent } from "@common/ui/status/status";

@Component({
  selector: 'cu-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ButtonModule,
    ButtonIconModule,
    FontAwesomeModule,
    Modal,
    NewTaskComponent,
    TooltipDirective,
    StatusComponent,
  ]
})
export class TaskListComponent {
  view = input<ViewItem>();
  createTask = output<any>();
  statusChanged = output<{
    taskId: string,
    status: string
  }>();

  dialog = inject(Dialog);
  store = inject(Store);

  tasksForView = computed<Task[]>(() => {
    const view = this.view();

    if (!view) {
      return [];
    }

    return this.store.selectSignal(selectAllTasksForViewId(view.id))();
  });

  faPlus = faPlusSquare;

  openNewTaskModal(modalTemplate: any): void {
    this.dialog.open(modalTemplate, {
      width: '475px',
    });
  }

  onCreateTask(event: any): void {
    this.createTask.emit(event);
    this.dialog.closeAll();
  }

  onStatusChanged(task: Task, event: { status: string }): void {
    this.statusChanged.emit({
      taskId: task.id,
      status: event.status
    });
  }
}
