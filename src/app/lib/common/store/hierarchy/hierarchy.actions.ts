import { NavigationEnd } from "@angular/router";
import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { createAction, props } from "@ngrx/store";

export const loadTreeStart = createAction(
  '[Hierarchy] Load Tree Start'
);

export const loadTreeSuccess = createAction(
  '[Hierarchy] Load Tree Success',
  props<{ hierarchy: HierarchyItem[] }>()
);

export const createSpaceStart = createAction(
  '[Hierarchy] Create Space Start',
  props<{ name: string }>()
);

export const createSpaceSuccess = createAction(
  '[Hierarchy] Create Space Success',
  props<{ space: HierarchyItem }>()
);

export const setHierarchyFromRoutingEventStart = createAction(
  '[Hierarchy] Set Hierarchy From Routing Event Start',
  props<{ event: NavigationEnd }>()
);

export const setHierarchyFromRoutingEventSuccess = createAction(
  '[Hierarchy] Set Hierarchy From Routing Event Success',
  props<{ hierarchy?: HierarchyItem[] }>()
);
