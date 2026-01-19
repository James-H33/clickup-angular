import { HierarchyItem } from "@common/types/hierarchy-item.model";

export const getHierarchyLinkByType = (item: HierarchyItem): string => {
  switch (item.type) {
    case 'space': {
      const firstList = item.children?.find(child => child.type === 'list');
      const firstView = firstList?.views[0];

      if (firstView && firstList) {
        return `v/l/${firstView.id}`;
      }

      return `v/${item.id}`;
    }
    case 'list': {
      const firstView = item.views[0];

      if (firstView) {
        return `v/l/${firstView.id}`;
      }

      return `v/${item.id}`;
    }
    default:
      return '/';
  }
}
