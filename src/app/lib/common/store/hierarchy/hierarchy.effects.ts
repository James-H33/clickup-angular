import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { loadWorkspaceSuccess } from "../workspace/workspace.actions";
import { createDummySpace } from "./fake-data-helpers/fake-data-helpers";
import { createSpaceStart, createSpaceSuccess, loadTreeStart, loadTreeSuccess, setHierarchyFromRoutingEventStart, setHierarchyFromRoutingEventSuccess } from "./hierarchy.actions";
import { Router } from "@angular/router";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { concatLatestFrom } from "@ngrx/operators"
import { selectTree } from "./hierarchy.selectors";
import { selectWorkspaceId } from "../workspace/workspace.selectors";
import { getViewLinkByType } from "@common/utils/get-view-link-by-type.function";
import { ViewType } from "@common/types/view-type.enum";

const treeStorageKey = 'clickup_hierarchy_tree';

function getTreeFromLocalStorage() {
  const treeJson = localStorage.getItem(treeStorageKey);

  if (treeJson) {
    try {
      return JSON.parse(treeJson);
    } catch (e) {
      console.error('Error parsing hierarchy tree from localStorage:', e);
      return null;
    }
  }

  return null;
}

function loadHierarchy(): HierarchyItem[] {
  const storedTree = getTreeFromLocalStorage();

  if (storedTree) {
    return storedTree;
  }

  const dummyHierarchy = [
    createDummySpace('Development'),
    createDummySpace('Marketing'),
  ];

  localStorage.setItem(treeStorageKey, JSON.stringify(dummyHierarchy));

  return dummyHierarchy;
}

export const loadHierarchy$ = createEffect((
  $actions = inject(Actions),
) => {
  return $actions.pipe(
    ofType(loadTreeStart),
    switchMap(() => {
      const tree = loadHierarchy();

      return of(tree).pipe(
        map(hierarchy => {
          return loadTreeSuccess({ hierarchy })
        }),
      )
    })
  );
}, { functional: true });

export const createSpace$ = createEffect((
  $actions = inject(Actions),
) => {
  return $actions.pipe(
    ofType(createSpaceStart),
    switchMap(({ name }) => {
      return of(createDummySpace(name)).pipe(
        map(space => createSpaceSuccess({ space })),
      )
    })
  );
}, { functional: true });

export const setHierarchyFromRoutingEvent$ = createEffect((
  $actions = inject(Actions),
  store = inject(Store),
) => {
  return $actions.pipe(
    ofType(setHierarchyFromRoutingEventStart),
    map((action) => {
      const viewId = action.event.url.split('/').pop();

      return setHierarchyFromRoutingEventSuccess({
        currentViewId: viewId ?? '',
      });
    }),
  );
}, { functional: true });


export const loadTreeForWorkspaceChange$ = createEffect((
  $actions = inject(Actions),
) => {
  return $actions.pipe(
    ofType(loadWorkspaceSuccess),
    switchMap(() => {
      const tree = loadHierarchy();

      return of(tree).pipe(
        map(hierarchy => {
          return loadTreeSuccess({ hierarchy })
        }),
      )
    })
  );
}, { functional: true });

export const updateActiveViewOnLoadTreeSuccess$ = createEffect((
  $actions = inject(Actions),
) => {
  return $actions.pipe(
    ofType(loadTreeSuccess),
    map(() => {
      const viewId = window.location.pathname.split('/').pop() || '';

      return setHierarchyFromRoutingEventSuccess({ currentViewId: viewId });
    }),
  );
}, { functional: true });

export const redirectToSpaceAfterCreation$ = createEffect((
  $actions = inject(Actions),
  store = inject(Store),
  router = inject(Router),
) => {
  return $actions.pipe(
    ofType(createSpaceSuccess),
    concatLatestFrom(() => [
      store.select(selectWorkspaceId),
    ]),
    tap(([{ space }, workspaceId]) => {
      const firstView = space.views?.[0];

      if (!firstView) {
        console.error('No views found for the new space');
        return;
      }

      const viewLink = getViewLinkByType(
        ViewType.LIST,
        firstView.id,
        workspaceId as string,
      );

      if (!viewLink) {
        console.error('No view link found for the new space');
        return;
      }

      router.navigateByUrl(viewLink);
    }),
  );
}, {
  functional: true,
  dispatch: false,
});

export const saveToLocalStorage = createEffect((
  $actions = inject(Actions),
  store = inject(Store),
) => {
  return $actions.pipe(
    ofType(createSpaceSuccess),
    concatLatestFrom(() => [
      store.select(selectTree),
    ]),
    tap(([_, tree]) => {
      localStorage.setItem(treeStorageKey, JSON.stringify(tree));
    }),
  );
}, {
  functional: true,
  dispatch: false,
});
