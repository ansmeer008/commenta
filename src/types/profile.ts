import { Tables, TablesInsert, TablesUpdate } from "./database.types";

// 기본 로우 타입 정의
export type Profile = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;

// 확장 예시 : 비즈니스 로직 전용 확장 타입이 필요하다면 여기에 추가
// 예: 현재 로그인한 유저의 세션 정보와 결합된 프로필
export interface CurrentUserProfile extends Profile {
  is_logged_in: boolean;
}
