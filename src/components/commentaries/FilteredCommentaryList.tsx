"use client";

import { useMemo, useState } from "react";
import { CommentaryFilter, Filter } from "../commentary/CommentaryFilter";
import { CommentaryList } from "../commentary/CommentaryList";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { SubscribeCategory } from "@/types/subscription";
import { Commentary } from "@/types/commentary";
import { getUserSubscriptions } from "@/actions/subscription";
import { getCommentariesByWorkIds } from "@/actions/commentary";

export const FilteredCommentaryList = () => {
  const [unselectedFilterIds, setUnselectedFilterIds] = useState<Set<string>>(() => new Set());
  const { user } = useAuthStore();

  const { data: subscribeList = [] } = useQuery({
    queryKey: ["subscribeList", user?.uid],
    queryFn: () => getUserSubscriptions(user!.uid),
    enabled: !!user?.uid,
  });

  const handleToggleFilter = (id: string) => {
    if (id === "all") {
      setUnselectedFilterIds(new Set());
    } else {
      setUnselectedFilterIds(prev => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        return next;
      });
    }
  };

  const filterList = useMemo<Filter[]>(
    () =>
      subscribeList.map((item: SubscribeCategory) => ({
        title: item.detail.title,
        id: item.detail.id,
        isSelected: !unselectedFilterIds.has(item.detail.id),
      })),
    [subscribeList, unselectedFilterIds]
  );

  const filterIds = filterList.filter(item => item.isSelected).map(filter => filter.id);
  const { data: commentaryList = [], isFetching } = useQuery<Commentary[] | null>({
    queryKey: ["commentaryList", filterIds], // 필터 값이 바뀌면 자동으로 refetch
    queryFn: () => getCommentariesByWorkIds(filterIds),
    enabled: filterIds.length > 0, // 필터 초기화가 끝난 후 실행
  });

  return (
    <div>
      {filterList.length > 0 && (
        <CommentaryFilter filterList={filterList} onToggle={handleToggleFilter} />
      )}
      <CommentaryList
        commentaryList={commentaryList || []}
        isLoading={isFetching}
        placeholder={
          filterList.length
            ? "아직 작성된 코멘터리가 없어요...직접 작성해보세요! 🧐"
            : "구독하면 코멘터리가 생겨요 🤩"
        }
      />
    </div>
  );
};
