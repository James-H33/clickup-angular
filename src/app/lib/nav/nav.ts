import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import * as WorkspaceSelectors from "../common/store/workspace/workspace.selectors";
import { ButtonModule } from "../common/ui/button/button.module";

@Component({
  selector: 'cu-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonModule,
  ],
})
export class NavComponent {
  private store = inject(Store);

  workspaceId = this.store.selectSignal(WorkspaceSelectors.selectWorkspaceId);

  vm = computed(() => {
    const workspaceId = this.workspaceId();
    const listViewLink = workspaceId ? `/${workspaceId}/v/l` : null;
    const boardViewLink = workspaceId ? `/${workspaceId}/v/b` : null;

    return {
      workspaceId,
      listViewLink,
      boardViewLink,
    };
  })
}
