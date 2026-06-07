"use client";

import { getCommentaryList } from "@/apis/commentaries";
import { Commentary } from "@/apis/commentary";
import { SubscribeCategory, getSubscribeCategoryList } from "@/apis/subscribe";
import { CommentaryList } from "@/components/commentary/CommentaryList";
import { CommentaryFilter, Filter } from "@/components/commentary/CommentaryFilter";
import { useAuthStore } from "@/store/authStore";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryRecommender } from "@/components/category/CategoryRecommender";

export default function Commentaries() {
  const [unselectedFilterIds, setUnselectedFilterIds] = useState<Set<string>>(() => new Set());
  const { user } = useAuthStore();

  const { data: subscribeList = [] } = useQuery({
    queryKey: ["subscribeList", user?.uid],
    queryFn: () => getSubscribeCategoryList(user!.uid),
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
    queryFn: () => getCommentaryList(filterIds, undefined, user?.subscribes),
    enabled: filterIds.length > 0, // 필터 초기화가 끝난 후 실행
  });

  return (
    <div className="min-h-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="flex justify-start mb-8">
        <h1 className="text-3xl font-bold">둘러보기</h1>
      </header>

      <main>
        <div className="flex flex-col gap-8">
          <CategoryRecommender />
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
      </main>
    </div>
  );
}
