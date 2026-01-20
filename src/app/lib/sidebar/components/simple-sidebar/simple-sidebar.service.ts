import { Injectable, computed, inject } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map, tap } from "rxjs";
import * as WorkspaceSelectors from "../../../common/store/workspace/workspace.selectors";
import { toSignal } from "@angular/core/rxjs-interop";
import { faChartBar, faHome, faNoteSticky } from "@fortawesome/free-regular-svg-icons";

export type SidebarItemType = {
  id: string;
  icon: any;
  label: string;
  url?: string | null;
  routeDefinition?: string;
  isActiveRoute: boolean;
};

const itemRoutes: SidebarItemType[] = [
  {
    id: 'home',
    icon: faHome,
    label: 'Home',
    routeDefinition: 'home',
    isActiveRoute: false,
  },
  {
    id: 'spaces',
    icon: faChartBar,
    label: 'Spaces',
    routeDefinition: 'v/l',
    isActiveRoute: false,
  },
  {
    id: 'settings',
    icon: faNoteSticky,
    label: 'Settings',
    routeDefinition: 'settings',
    isActiveRoute: false,
  },
];

@Injectable()
export class SimpleSidebarService {
  private store = inject(Store);
  private router = inject(Router);

  readonly items: SidebarItemType[] = itemRoutes;

  readonly workspaceId = this.store.selectSignal(
    WorkspaceSelectors.selectWorkspaceId,
  );

  private activeRoute = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.router.url),
  ));

  readonly itemsWithUrls = computed(() => {
    const workspaceId = this.workspaceId();
    const activeRoute = this.activeRoute();

    return this.items.map(item => {
      const def = item.routeDefinition;
      const route = workspaceId ? `/${workspaceId}/${def}` : null;

      return {
        ...item,
        url: route,
        isActiveRoute: activeRoute === route,
      }
    });
  });

  routeUser(item: SidebarItemType): void {
    this.router.navigate([item.url]);
  }
}
