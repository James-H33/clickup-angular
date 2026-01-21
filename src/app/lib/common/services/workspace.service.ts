import { DestroyRef, inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { WORKSPACE_ID } from "../types/workspace-id.const";
import { filter } from "rxjs/internal/operators/filter";
import { loadWorkspaceStart, setWorkspaceId } from "../store/workspace/workspace.actions";
import { Store } from "@ngrx/store";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { combineLatest, distinctUntilChanged, map, Subject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  store = inject(Store);
  routeSnapshot = inject(ActivatedRoute);
  router = inject(Router);
  private destroyRef = inject(DestroyRef)

  private workspaceId: string | null = null;

  init(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getWorkspaceId()),
        distinctUntilChanged((prev, curr) => prev === curr || curr === this.workspaceId),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((id) => {
        this.workspaceId = id as string;
        this.setWorkspaceId(this.workspaceId);
        this.loadWorkspace(this.workspaceId);
      });

    // Initial load
    const initialId = this.getWorkspaceId();

    if (initialId) {
      this.workspaceId = initialId;
      this.setWorkspaceId(this.workspaceId);
      this.loadWorkspace(this.workspaceId);
    }
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

  private loadWorkspace(id: string): void {
    this.store.dispatch(loadWorkspaceStart({ id }));
  }

  private setWorkspaceId(id: string): void {
    this.store.dispatch(setWorkspaceId({ workspaceId: id }));
  }
}
