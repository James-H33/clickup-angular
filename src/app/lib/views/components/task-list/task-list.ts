import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { ButtonIconModule } from "@common/ui/button-icon/button-icon.module";
import { ButtonModule } from "@common/ui/button/button.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'cu-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    ButtonIconModule,
    FontAwesomeModule
  ]
})
export class TaskListComponent {
  faPlus = faPlusSquare;
}
