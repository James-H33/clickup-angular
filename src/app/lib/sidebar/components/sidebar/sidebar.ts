import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core";
import { ButtonModule } from "@ui/button/button.module";
import { SidebarCreateSpaceComponent } from "../create-space/sidebar-create-space";

import {
  CdkMenu,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { Store } from "@ngrx/store";
import { createSpaceStart } from "@common/store/hierarchy/hierarchy.actions";
import { SidebarTree } from "../tree/sidebar-tree";
import { selectCurrentListId, selectCurrentSpaceId, selectCurrentViewId, selectFlattenedTree, selectTree } from "@common/store/hierarchy/hierarchy.selectors";

@Component({
  selector: 'cu-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    SidebarCreateSpaceComponent,
    CdkMenuTrigger,
    CdkMenu,
    SidebarTree
  ]
})
export class SidebarComponent {
  private store = inject(Store);

  tree = this.store.selectSignal(selectTree);
  flattenedTree = this.store.selectSignal(selectFlattenedTree);
  currentSpaceId = this.store.selectSignal(selectCurrentSpaceId);
  currentListId = this.store.selectSignal(selectCurrentListId);

  onCreateSpace(event: { name: string }) {
    this.store.dispatch(
      createSpaceStart({ name: event.name }),
    );
  }
}
