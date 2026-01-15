import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, filter, map, tap } from "rxjs";
import * as WorkspaceSelectors from "../../../common/store/workspace/workspace.selectors";
import { CommonModule } from "@angular/common";
import { SidebarItem } from "../item/sidebar-item";
import { faChartBar, faHome, faNoteSticky } from "@fortawesome/free-regular-svg-icons";

type SidebarItemType = {
  id: string;
  icon: any;
  label: string;
  url?: string | null;
  isActiveRoute?: boolean | null;
};

@Component({
  selector: 'cu-simple-sidebar',
  templateUrl: './simple-sidebar.html',
  styleUrls: ['./simple-sidebar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SidebarItem
  ],
})
export class SimpleSidebarComponent {
  private store = inject(Store);
  private router = inject(Router);

  private activeRoute = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router.url),
    tap((url) => console.log('Active URL:', url)),
  ));

  items: SidebarItemType[] = [
    { id: 'home', icon: faHome, label: 'Home' },
    { id: 'spaces', icon: faChartBar, label: 'Spaces' },
    { id: 'settings', icon: faNoteSticky, label: 'Settings' },
  ];

  urlDefinitions: Record<string, string> = {
    home: 'home',
    spaces: 'v/l',
    settings: 'settings',
  };

  workspaceId = this.store.selectSignal(WorkspaceSelectors.selectWorkspaceId);

  itemsWithUrls = computed(() => {
    const workspaceId = this.workspaceId();
    const activeRoute = this.activeRoute();
    const def = this.urlDefinitions;

    return this.items.map(item => {
      const route = workspaceId ? `/${workspaceId}/${def[item.id]}` : null;
      return {
        ...item,
        url: route,
        isActiveRoute: activeRoute === route ? route : null,
      }
    });
  });

  routeUser(item: SidebarItemType): void {
    this.router.navigate([item.url]);
  }
}
