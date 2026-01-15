import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import * as WorkspaceSelectors from "../common/store/workspace/workspace.selectors";
import { combineLatest, map } from "rxjs";
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

  // vm$ = combineLatest({
  //   workspaceId: this.workspaceId$,
  //   listViewLink: this.workspaceId$.pipe(
  //     map(id => id ? `/${id}/v/l` : null)
  //   ),
  //   boardViewLink: this.workspaceId$.pipe(
  //     map(id => id ? `/${id}/v/b` : null)
  //   ),
  // }).pipe(
  //   map(({ workspaceId, listViewLink, boardViewLink }) => ({
  //     workspaceId,
  //     listViewLink,
  //     boardViewLink,
  //   }))
  // );

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
