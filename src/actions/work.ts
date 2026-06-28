"use server";

import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types/work";

const mapRowToWork = (row: {
  id: string;
  title: string;
  author: string;
  created_at: string;
  usage_count: number;
  subscribe_count: number;
}): Category => ({
  id: row.id,
  title: row.title,
  author: row.author,
  createdAt: new Date(row.created_at),
  usageCount: row.usage_count,
  subscribeCount: row.subscribe_count,
});

export const searchWorks = async (query: string): Promise<Category[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("works")
    .select("id, title, author, created_at, usage_count, subscribe_count")
    .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
    .order("usage_count", { ascending: false })
    .limit(20);

  if (error || !data) {
    console.error("작품 검색 실패:", error?.message);
    return [];
  }

  return data.map(mapRowToWork);
};

export const addWork = async ({
  title,
  author,
}: {
  title: string;
  author: string;
}): Promise<Category> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("works")
    .insert({ title, author })
    .select("id, title, author, created_at, usage_count, subscribe_count")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "작품 등록 실패");
  }

  return mapRowToWork(data);
};

export const getWorksByCount = async (
  type: "usage" | "subscribe",
  limit: number = 5
): Promise<Category[]> => {
  const supabase = await createClient();

  const orderColumn = type === "usage" ? "usage_count" : "subscribe_count";

  const { data, error } = await supabase
    .from("works")
    .select("id, title, author, created_at, usage_count, subscribe_count")
    .order(orderColumn, { ascending: false })
    .limit(limit);

  if (error || !data) {
    console.error("작품 목록 조회 실패:", error?.message);
    return [];
  }

  return data.map(mapRowToWork);
};
