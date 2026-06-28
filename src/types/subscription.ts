import { Tables, TablesInsert, TablesUpdate } from "./database.types";
import { Work, Category } from "./work";
import { Subscribe } from "@/store/authStore";

export type Subscription = Tables<"subscriptions">;
export type SubscriptionInsert = TablesInsert<"subscriptions">;
export type SubscriptionUpdate = TablesUpdate<"subscriptions">;

export interface SubscriptionWithWork extends Subscription {
  works: Pick<Work, "title" | "author" | "usage_count" | "subscribe_count"> | null;
}

// 프론트엔드 구독 목록 UI용 타입 (Subscribe + 작품 상세)
export type SubscribeCategory = Subscribe & { detail: Category };
