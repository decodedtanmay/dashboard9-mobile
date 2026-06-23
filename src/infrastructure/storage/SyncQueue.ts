import { MMKV } from "react-native-mmkv";

export type SyncItemType = "CREATE_TICKET" | "ACKNOWLEDGE_ALERT" | "CREATE_ISSUE_REPORT";

export interface SyncItem {
  id: string;
  type: SyncItemType;
  payload: unknown;
  createdAt: number;
  retryCount: number;
  status: "pending" | "syncing" | "failed" | "completed";
}

const storage = new MMKV({ id: "mahajal-sync-queue" });
const KEY = "items";

export class SyncQueue {
  enqueue(type: SyncItemType, payload: unknown): SyncItem {
    const item: SyncItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      payload,
      createdAt: Date.now(),
      retryCount: 0,
      status: "pending"
    };
    const items = this.getItems();
    storage.set(KEY, JSON.stringify([...items, item]));
    return item;
  }

  getItems(): SyncItem[] {
    const raw = storage.getString(KEY);
    return raw ? (JSON.parse(raw) as SyncItem[]) : [];
  }

  pendingCount(): number {
    return this.getItems().filter((item) => item.status === "pending" || item.status === "failed").length;
  }
}
