import { DestroyRef, inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { WORKSPACE_ID } from "../types/workspace-id.const";
import { filter } from "rxjs/internal/operators/filter";
import { loadWorkspaceId } from "../store/workspace/workspace.actions";
import { Store } from "@ngrx/store";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  store = inject(Store);
  routeSnapshot = inject(ActivatedRoute);
  router = inject(Router);
  private destroyRef = inject(DestroyRef)

  init(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.store.dispatch(loadWorkspaceId());
      });
  }

  getWorkspaceId(): string | null {
    const routeSnapshot: ActivatedRouteSnapshot = this.routeSnapshot.snapshot;
    const idFromUrl = routeSnapshot.paramMap.get(WORKSPACE_ID);

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
