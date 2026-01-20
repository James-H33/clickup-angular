import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { setHierarchyFromRoutingEventStart } from "@common/store/hierarchy/hierarchy.actions";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HierarchyRoutingEventService {
  router = inject(Router);
  store = inject(Store);
  routeSnapshot = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);


 init(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        console.log('NavigationEnd event:', event);
        this.store.dispatch(
          setHierarchyFromRoutingEventStart({ event: event as NavigationEnd }),
        );
      });
  }
}
