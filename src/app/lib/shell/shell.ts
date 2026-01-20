import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavComponent } from "../nav/nav";
import { SidebarComponent } from "../sidebar/components/sidebar/sidebar";
import { SimpleSidebarComponent } from "../sidebar/components/simple-sidebar/simple-sidebar";
import { Store } from "@ngrx/store";
import { HierarchyRoutingEventService } from "@common/services/hierarchy-routing-event.service";
import { WorkspaceService } from "@common/services/workspace.service";
import { loadTreeStart } from "@common/store/hierarchy/hierarchy.actions";

@Component({
  selector: 'cu-shell',
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    SidebarComponent,
    SimpleSidebarComponent,
    NavComponent
],
})
export class ShellComponent {
  private store = inject(Store);
  private workspaceService = inject(WorkspaceService);
  private hierarchyRoutingEventService = inject(HierarchyRoutingEventService);

  ngOnInit(): void {
    this.workspaceService.init();
    // this.store.dispatch(loadTreeStart());
    this.hierarchyRoutingEventService.init();
  }
}
