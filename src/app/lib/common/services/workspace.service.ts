import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { WORKSPACE_ID } from "../types/workspace-id.const";
import { filter } from "rxjs/internal/operators/filter";
import { loadWorkspaceId } from "../store/workspace/workspace.actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  store = inject(Store);
  routeSnapshot = inject(ActivatedRoute);
  router = inject(Router);

  init(): void {
    // Listen for route changes if needed
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        console.log('Route event:', event);
        this.store.dispatch(loadWorkspaceId());
      });
  }

  getWorkspaceId(): string | null {
    const routeSnapshot: ActivatedRouteSnapshot = this.routeSnapshot.snapshot;
    const idFromUrl = routeSnapshot.paramMap.get(WORKSPACE_ID);

    console.log('Workspace ID from URL:', idFromUrl);

    if (idFromUrl) {
      return idFromUrl;
    }

    const idFromStorage = localStorage.getItem(WORKSPACE_ID);

    if (idFromStorage) {
      return idFromStorage;
    }

    return null;
  }
}
