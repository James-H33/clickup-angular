import { HierarchyItem } from "@common/types/hierarchy-item.model";
import { HierarchyType } from "@common/types/hierarchy-type.enum";
import { ViewItem } from "@common/types/view-item.model";
import { ViewType } from "@common/types/view-type.enum";

const makeId = (): string => {
  return Math.random().toString(36).substring(2, 15);
}

export const createDummySpace = (
  name: string,
  parentId?: string,
): HierarchyItem => {
  const id = makeId();

  return {
    id,
    name,
    color: generateRandomColor(),
    type: HierarchyType.SPACE,
    parentId,
    children: [
      createDummyList('General', id),
      createDummyList('Backlog', id),
    ],
    views: [
      createDummyView('Space 1', id, ViewType.LIST),
    ],
  };
}

export const createDummyList = (name: string, parentId?: string): HierarchyItem => {
  const id = makeId();

  return {
    id,
    name,
    color: generateRandomColor(),
    type: HierarchyType.LIST,
    parentId,
    children: [],
    views: [
      createDummyView('List 1', id, ViewType.LIST),
      createDummyView('Board 1', id, ViewType.BOARD),
    ],
  };
}

export const createDummyView = (
  name: string,
  parentId?: string,
  type: ViewType = ViewType.LIST,
): ViewItem => {

  return {
    id: makeId(),
    name: name || 'View 1',
    color: generateRandomColor(),
    type,
    parentId
  };
}

export function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
