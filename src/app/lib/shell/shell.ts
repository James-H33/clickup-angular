import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HierarchyRoutingEventService } from "@common/services/hierarchy-routing-event.service";
import { WorkspaceService } from "@common/services/workspace.service";
import { NavComponent } from "../nav/nav";
import { SidebarComponent } from "../sidebar/components/sidebar/sidebar";
import { SimpleSidebarComponent } from "../sidebar/components/simple-sidebar/simple-sidebar";

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
  private workspaceService = inject(WorkspaceService);
  private hierarchyRoutingEventService = inject(HierarchyRoutingEventService);

  ngOnInit(): void {
    this.workspaceService.init();
    this.hierarchyRoutingEventService.init();
  }
}
