import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { selectTree } from "@common/store/hierarchy/hierarchy.selectors";
import { TREE_STORAGE_KEY } from "@common/types/tree-storage-key.const";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HierarchyDataChangeService {
  store = inject(Store);
  hierarchyChanges$ = this.store.select(selectTree);

  private destroyRef = inject(DestroyRef);

  watchHierarchyDataChanges(): void {
    this.hierarchyChanges$
      .pipe(
        tap((tree) => {
          localStorage.setItem(TREE_STORAGE_KEY, JSON.stringify(tree));
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
