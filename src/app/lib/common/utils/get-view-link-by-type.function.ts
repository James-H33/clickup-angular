
import { ViewType } from '../types/view-type.enum';

export function getViewLinkByType(
  type: ViewType,
  viewId: string,
  workspaceId: string,
): string | null {
  switch (type) {
    case ViewType.BOARD:
      return `/${workspaceId}/v/b/${viewId}`;
    case ViewType.LIST:
      return `/${workspaceId}/v/l/${viewId}`;
    default:
      return null;
  }
}
