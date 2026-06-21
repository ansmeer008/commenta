import { Tables, TablesInsert } from "./database.types";
import { Profile } from "./profile";

export type Commentary = Tables<"commentaries">;
export type CommentaryInsert = TablesInsert<"commentaries">;
export type CommentaryTag = Tables<"commentary_tags">;

// 예시 : 프론트엔드 화면(피드, 상세페이지)에서 가장 많이 쓰일 조인 타입 정의
export interface CommentaryDetail extends Commentary {
  // 릴레이션십에 의해 조인되어 들어오는 데이터 구조 매핑
  profiles: Pick<Profile, "nickname" | "profile_url"> | null;
  tags: {
    id: string;
    name: string;
    type: string;
  }[];
}
