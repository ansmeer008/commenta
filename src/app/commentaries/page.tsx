"use client";

import { getCommentaryList } from "@/apis/commentaries";
import { Commentary } from "@/apis/commentary";
import { SubscribeCategory, getSubscribeCategoryList } from "@/apis/subscribe";
import { CommentaryList } from "@/components/commentary/CommentaryList";
import { CommentaryFilter, Filter } from "@/components/commentary/CommentaryFilter";
import { Button } from "@/components/ui/button";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Commentaries() {
  const [filterList, setFilterList] = useState<Filter[]>([]);
  const { openRouteModal } = useRouteModal();
  const { user } = useAuthStore();

  const openCreateCommentaryModal = () => {
    openRouteModal("/commentary/create");
  };

  const { data: subscribeList = [] } = useQuery<SubscribeCategory[]>({
    queryKey: ["subscribeList", user?.uid],
    queryFn: () => getSubscribeCategoryList(user!.uid),
    enabled: !!user?.uid,
  });

  const handleToggleFilter = (id: string) => {
    if (id === "all") {
      setFilterList(prev => prev.map(f => ({ ...f, isSelected: true })));
    } else {
      setFilterList(prev => prev.map(f => (f.id === id ? { ...f, isSelected: !f.isSelected } : f)));
    }
  };
  useEffect(() => {
    if (subscribeList && subscribeList.length > 0) {
      const filters = subscribeList.map(item => ({
        isSelected: true,
        title: item.detail.title,
        id: item.detail.id,
      }));
      setFilterList(filters);
    }
  }, [subscribeList]);

  const filterIds = filterList.filter(item => item.isSelected).map(filter => filter.id);
  const { data: commentaryList = [], isFetching } = useQuery<Commentary[] | null>({
    queryKey: ["commentaryList", filterIds], // 필터 값이 바뀌면 자동으로 refetch
    queryFn: () => getCommentaryList(filterIds),
    enabled: filterIds.length > 0, // 필터 초기화가 끝난 후 실행
  });

  return (
    <div className="min-h-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">둘러보기</h1>
        <Button onClick={openCreateCommentaryModal}> 작성하기</Button>
      </header>

      <main>
        <div>
          <CommentaryFilter filterList={filterList} onToggle={handleToggleFilter} />
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
