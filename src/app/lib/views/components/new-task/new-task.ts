import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { ViewItem } from "@common/types/view-item.model";
import { AutoFocusDirective } from "@common/ui/auto-focus/auto-focus.directive";
import { InputModule } from "@common/ui/input/input.module";

@Component({
  selector: 'cu-new-task',
  templateUrl: './new-task.html',
  styleUrls: ['./new-task.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cu-cdk-overlay-pane-padding',
  },
  imports: [
    InputModule,
    AutoFocusDirective
  ],
})
export class NewTaskComponent {
  view = input<ViewItem>();

  createTask = output<{
    name: string,
    viewId: string,
    description?: string
  }>();

  onCreateTask(name: string, description?: string): void {
    const view = this.view();

    if (!view) {
      return;
    }

    this.createTask.emit({
      name,
      viewId: view.id,
      description
    });
  }
}
