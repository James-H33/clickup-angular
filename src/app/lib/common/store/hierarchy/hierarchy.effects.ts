import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createSpaceStart, createSpaceSuccess, setHierarchyFromRoutingEventStart, setHierarchyFromRoutingEventSuccess } from "./hierarchy.actions";
import { map, switchMap } from "rxjs/operators";
import { concatLatestFrom } from "@ngrx/operators";
import { EMPTY, of } from "rxjs";
import { loadTreeStart, loadTreeSuccess } from "./hierarchy.actions";
import { createDummySpace } from "./fake-data-helpers/fake-data-helpers";
import { selectFlattenedTree } from "./hierarchy.selectors";
import { Store } from "@ngrx/store";

export const loadHierarchy$ = createEffect((
  $actions = inject(Actions),
) => {
  return $actions.pipe(
    ofType(loadTreeStart),
    switchMap(() => {
      return of([
        createDummySpace('Development'),
        createDummySpace('Marketing'),
      ]).pipe(
        map(hierarchy => {
          console.log('Loaded hierarchy:', hierarchy);
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
    concatLatestFrom(() => [
      store.select(selectFlattenedTree),
    ]),
    map(([action, flattenedTree]) => {
      console.log('Current flattened tree:', flattenedTree);
      console.log('Handling routing event to set hierarchy:', action?.event.url);

      return setHierarchyFromRoutingEventSuccess({});
    }),
  );
}, { functional: true });
