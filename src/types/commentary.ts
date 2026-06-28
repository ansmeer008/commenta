import { Tables, TablesInsert } from "./database.types";
import { Profile } from "./profile";

export type CommentaryRow = Tables<"commentaries">;
export type CommentaryInsert = TablesInsert<"commentaries">;
export type CommentaryTag = Tables<"commentary_tags">;

export interface CommentaryDetail extends CommentaryRow {
  profiles: Pick<Profile, "nickname" | "profile_url"> | null;
  tags: {
    id: string;
    name: string;
    type: string;
  }[];
}

// 프론트엔드 피드/UI용 camelCase 타입 (조인 데이터 포함)
export interface Commentary {
  id: string;
  imgUrlList?: string[];
  content: string;
  authorId: string;
  authorNickName: string;
  authorProfileUrl: string | null;
  categoryTitle: string;
  categoryId: string;
  isSpoiler?: boolean;
  episode?: number;
  createdAt: Date;
  updatedAt: Date;
}
