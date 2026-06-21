import { Tables, TablesInsert, TablesUpdate } from "./database.types";
import { Work } from "./work";

export type Subscription = Tables<"subscriptions">;
export type SubscriptionInsert = TablesInsert<"subscriptions">;
export type SubscriptionUpdate = TablesUpdate<"subscriptions">;

// 확장 예시: 마이 페이지나 '내가 구독한 작품 목록' 탭에서 작품의 썸네일, 제목 등을 함께 보여줄 때 사용합니다.
export interface SubscriptionWithWork extends Subscription {
  works: Pick<Work, "title" | "author" | "usage_count" | "subscribe_count"> | null;
}
