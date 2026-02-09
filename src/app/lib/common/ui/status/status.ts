import { ChangeDetectionStrategy, Component, computed, input, output, viewChild } from "@angular/core";
import { DefaultTaskStatuses, TaskStatuses, TaskStatusesColor, TaskStatusesName } from "@common/types/task-statuses.enum";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { DropdownMenuComponent } from "../dropdown-menu/dropdown-menu";

@Component({
  selector: 'cu-status',
  templateUrl: './status.html',
  styleUrls: ['./status.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownMenuComponent,
    FontAwesomeModule,
  ],
})
export class StatusComponent {
  status = input<TaskStatuses>();
  statusChanged = output<{ status: TaskStatuses }>()
  dropdownMenu = viewChild(DropdownMenuComponent);

  currentStatusName = computed(() => {
    const key = this.status() ?? TaskStatuses.TODO;

    return TaskStatusesName[key];
  });

  currentStatusColor = computed(() => {
    const key = this.status() ?? TaskStatuses.TODO;

    return TaskStatusesColor[key];
  });

  allStatuses = DefaultTaskStatuses;
  statusKeyMap = TaskStatuses;
  statusColorMap = TaskStatusesColor;
  faCheck = faCheckSquare

  setStatus(status: TaskStatuses): void {
    this.statusChanged.emit({ status });
    this.dropdownMenu()?.close();
  }
}
