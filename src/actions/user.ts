"use server";

import { createClient } from "@/lib/supabase/server";
import { TablesUpdate } from "@/types/database.types";

export interface UserProfileUpdates {
  profileUrl?: string | null;
  isNoSpoilerMode?: boolean;
  nickname?: string;
}

export const updateUserProfile = async (
  userId: string,
  updates: UserProfileUpdates
): Promise<{ profile_url: string | null; is_no_spoiler_mode: boolean; nickname: string }> => {
  const supabase = await createClient();

  const dbUpdates: TablesUpdate<"profiles"> = {};
  if (updates.profileUrl !== undefined) dbUpdates.profile_url = updates.profileUrl;
  if (updates.isNoSpoilerMode !== undefined) dbUpdates.is_no_spoiler_mode = updates.isNoSpoilerMode;
  if (updates.nickname !== undefined) dbUpdates.nickname = updates.nickname;

  const { data, error } = await supabase
    .from("profiles")
    .update(dbUpdates)
    .eq("id", userId)
    .select("profile_url, is_no_spoiler_mode, nickname")
    .single();

  if (error || !data) throw new Error(error?.message || "프로필 업데이트 실패");

  return data;
};
