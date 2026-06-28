import { Tables, TablesInsert } from "./database.types";

export type Work = Tables<"works">;
export type WorkInsert = TablesInsert<"works">;

export interface WorkWithDetail extends Work {
  is_subscribed: boolean;
  tags: string[];
}

// 프론트엔드 피드/UI용 camelCase 타입 (works 테이블 row 기반)
export interface Category {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  usageCount: number;
  subscribeCount: number;
}
