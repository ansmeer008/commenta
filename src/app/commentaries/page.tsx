"use client";

import { Commentary, getCommentaryList } from "@/apis/commentaries";
import { getSubscribeCategoryList } from "@/apis/subscribe";
import { CommentaryList } from "@/components/commentary/CommentaryList";
import { CommentaryFilter, Filter } from "@/components/commentary/CommentaryFilter";
import { Button } from "@/components/ui/button";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function Commentaries() {
  const [filterList, setFilterList] = useState<Filter[]>([]);
  const [commentaryList, setCommentaryList] = useState<Commentary[]>([]);
  const { openRouteModal } = useRouteModal();
  const { user } = useAuthStore();

  const openCreateCommentaryModal = () => {
    openRouteModal("/commentary/create");
  };

  const initFilter = async () => {
    if (user?.uid) {
      const subscribeList = (await getSubscribeCategoryList(user.uid)) || [];
      const filters = subscribeList.map(item => {
        return {
          isSelected: false,
          title: item.title,
          id: item.id,
        };
      });

      setFilterList(filters);
    }
  };

  const initCommentaryList = async () => {
    const filterIds = filterList.filter(item => item.isSelected).map(filter => filter.id);
    const list = await getCommentaryList(filterIds);
    if (list) {
      setCommentaryList(list);
    }
  };

  const handleToggleFilter = (id: string | null) => {
    if (id === null) {
      // All 클릭 → 전체 선택 해제
      setFilterList(prev => prev.map(f => ({ ...f, isSelected: false })));
    } else {
      setFilterList(prev => prev.map(f => (f.id === id ? { ...f, isSelected: !f.isSelected } : f)));
    }
  };

  useEffect(() => {
    initFilter();
  }, [user?.uid]);

  useEffect(() => {
    initCommentaryList();
  }, [filterList]);

  return (
    <div className="min-h-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">둘러보기</h1>
        <Button onClick={openCreateCommentaryModal}> 작성하기</Button>
      </header>

      <main>
        <div>
          <CommentaryFilter filterList={filterList} onToggle={handleToggleFilter} />
          <CommentaryList commentaryList={commentaryList} />
        </div>
      </main>
    </div>
  );
}
