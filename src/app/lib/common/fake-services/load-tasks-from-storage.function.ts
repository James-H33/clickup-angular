import { TASK_STORAGE_KEY } from "@common/types/tree-storage-key.const";

export function loadTasksFromStorage() {
  try {
    const treeJson = localStorage.getItem(TASK_STORAGE_KEY);

    if (treeJson) {
      return JSON.parse(treeJson);
    } else {
      return {};
    }
  } catch (e) {
    return {};
  }
}
