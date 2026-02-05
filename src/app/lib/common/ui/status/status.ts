import { ChangeDetectionStrategy, Component, computed, input, output, viewChild } from "@angular/core";
import { TaskStatuses, taskStatusesList, TaskStatusesName } from "@common/types/task-statuses.enum";
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
    const key = this.status();

    return key !== undefined ? TaskStatusesName[key] : undefined;
  });

  allStatuses = taskStatusesList();
  faCheck = faCheckSquare

  setStatus(status: TaskStatuses) {
    this.statusChanged.emit({ status });
    this.dropdownMenu()?.close();
  }
}
