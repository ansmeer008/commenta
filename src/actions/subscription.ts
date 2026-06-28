"use server";

import { createClient } from "@/lib/supabase/server";
import { SubscribeCategory } from "@/types/subscription";

export const getUserSubscriptions = async (userId: string): Promise<SubscribeCategory[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("id, episode, works(id, title, author, subscribe_count, usage_count, created_at)")
    .eq("user_id", userId);

  if (error || !data) {
    console.error("구독 목록 조회 실패:", error?.message);
    return [];
  }

  return data.map(sub => {
    const work = sub.works as {
      id: string;
      title: string;
      author: string;
      subscribe_count: number;
      usage_count: number;
      created_at: string;
    };

    return {
      id: sub.id,
      episode: sub.episode,
      detail: {
        id: work.id,
        title: work.title,
        author: work.author,
        createdAt: new Date(work.created_at),
        subscribeCount: work.subscribe_count,
        usageCount: work.usage_count,
      },
    };
  });
};

export const addSubscription = async (
  userId: string,
  body: { id: string; episode: number | null }
): Promise<void> => {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("work_id", body.id)
    .maybeSingle();

  if (existing) {
    throw new Error("Already Subscribed");
  }

  const { error } = await supabase.from("subscriptions").insert({
    user_id: userId,
    work_id: body.id,
    episode: body.episode,
  });

  if (error) throw new Error(error.message);
};

export const updateSubscription = async (
  userId: string,
  body: { id: string; episode: number | null }
): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("subscriptions")
    .update({ episode: body.episode })
    .eq("user_id", userId)
    .eq("work_id", body.id);

  if (error) throw new Error(error.message);
};

export const deleteSubscription = async (
  userId: string,
  subscriptionId: string
): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("subscriptions")
    .delete()
    .eq("id", subscriptionId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
};
