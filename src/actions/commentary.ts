"use server";

import { createClient } from "@/lib/supabase/server";
import { Commentary } from "@/types/commentary";
import { TablesUpdate } from "@/types/database.types";

const SELECT_COMMENTARY_FIELDS = `
  id, content, episode, img_urls, is_spoiler, created_at, updated_at, author_id, work_id,
  works(title),
  profiles!commentaries_author_id_fkey(nickname, profile_url)
`;

const mapRowToCommentary = (item: any): Commentary => {
  const work = item.works as { title: string } | null;
  const profile = item.profiles as { nickname: string; profile_url: string | null } | null;

  return {
    id: item.id,
    content: item.content,
    authorId: item.author_id,
    authorNickName: profile?.nickname ?? "",
    authorProfileUrl: profile?.profile_url ?? null,
    categoryTitle: work?.title ?? "",
    categoryId: item.work_id,
    imgUrlList: item.img_urls,
    isSpoiler: item.is_spoiler,
    episode: item.episode ?? undefined,
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  };
};

export const getMyCommentaries = async (authorId: string): Promise<Commentary[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commentaries")
    .select(SELECT_COMMENTARY_FIELDS)
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("코멘터리 목록 조회 실패:", error?.message);
    return [];
  }

  return data.map(mapRowToCommentary);
};

export const getCommentariesByWorkIds = async (workIds: string[]): Promise<Commentary[]> => {
  if (!workIds.length) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commentaries")
    .select(SELECT_COMMENTARY_FIELDS)
    .in("work_id", workIds)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("코멘터리 목록 조회 실패:", error?.message);
    return [];
  }

  return data.map(mapRowToCommentary);
};

export const getCommentary = async (commentaryId: string): Promise<Commentary | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commentaries")
    .select(SELECT_COMMENTARY_FIELDS)
    .eq("id", commentaryId)
    .single();

  if (error || !data) {
    console.error("코멘터리 조회 실패:", error?.message);
    return null;
  }

  return mapRowToCommentary(data);
};

export const createCommentary = async (
  body: Omit<Commentary, "id" | "createdAt" | "updatedAt" | "authorNickName" | "authorProfileUrl">
): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.from("commentaries").insert({
    author_id: body.authorId,
    work_id: body.categoryId,
    content: body.content,
    episode: body.episode ?? null,
    img_urls: body.imgUrlList ?? [],
    is_spoiler: body.isSpoiler ?? false,
  });

  if (error) throw new Error(error.message);
};

export const editCommentary = async (
  body: { id: string } & Partial<
    Omit<Commentary, "id" | "createdAt" | "updatedAt" | "authorNickName" | "authorProfileUrl">
  >
): Promise<void> => {
  const supabase = await createClient();

  const updates: TablesUpdate<"commentaries"> = {};
  if (body.content !== undefined) updates.content = body.content;
  if (body.episode !== undefined) updates.episode = body.episode ?? null;
  if (body.imgUrlList !== undefined) updates.img_urls = body.imgUrlList;
  if (body.isSpoiler !== undefined) updates.is_spoiler = body.isSpoiler;
  if (body.categoryId !== undefined) updates.work_id = body.categoryId;

  const { error } = await supabase
    .from("commentaries")
    .update(updates)
    .eq("id", body.id);

  if (error) throw new Error(error.message);
};

export const deleteCommentary = async (commentaryId: string): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.from("commentaries").delete().eq("id", commentaryId);

  if (error) throw new Error(error.message);
};
