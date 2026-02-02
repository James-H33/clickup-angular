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

export const setHierarchyFromRoutingEventStart = createAction(
  '[Hierarchy] Set Hierarchy From Routing Event Start',
  props<{ event: NavigationEnd }>()
);

export const setHierarchyFromRoutingEventSuccess = createAction(
  '[Hierarchy] Set Hierarchy From Routing Event Success',
  props<{ currentViewId: string }>()
);

export const deleteHierarchyItemStart = createAction(
  '[Hierarchy] Delete Hierarchy Item Start',
  props<{
    itemId: string,
    force?: boolean
  }>()
);

export const deleteHierarchyItemSuccess = createAction(
  '[Hierarchy] Delete Hierarchy Item Success',
  props<{ hierarchy: HierarchyItem[] }>()
);

export const renameHierarchyItemStart = createAction(
  '[Hierarchy] Rename Hierarchy Item Start',
  props<{ itemId: string, name: string}>()
);

export const renameHierarchyItemSuccess = createAction(
  '[Hierarchy] Rename Hierarchy Item Success',
  props<{ hierarchy: HierarchyItem[] }>()
);

export const addHierarchyItemStart = createAction(
  '[Hierarchy] Add Hierarchy Item Start',
  props<{
    name: string,
    createType: HierarchyItem['type'],
    parentId?: string,
    redirect?: boolean
  }>()
);

export const addHierarchyItemSuccess = createAction(
  '[Hierarchy] Add Hierarchy Item Success',
  props<{ hierarchy: HierarchyItem[] }>()
);

export const addHierarchyItemSuccessAndRedirect = createAction(
  '[Hierarchy] Add Hierarchy Item Success And Redirect',
  props<{ itemId: string, hierarchy: HierarchyItem[] }>()
);

export const updateHierarchy = createAction(
  '[Hierarchy] Update Hierarchy',
  props<{ hierarchy: HierarchyItem[] }>()
);
