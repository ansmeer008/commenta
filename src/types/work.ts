import { Tables, TablesInsert } from "./database.types";

export type Work = Tables<"works">;
export type WorkInsert = TablesInsert<"works">;

// 가독성을 위한 확장 예시
export interface WorkWithDetail extends Work {
  is_subscribed: boolean;
  tags: string[];
}
