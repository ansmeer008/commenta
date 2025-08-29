"use client";

import { getCategoriesByCount } from "@/apis/category";
import { Badge } from "../ui/badge";
import type { Category } from "@/apis/category";
import { Flame } from "lucide-react";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { SubscribeModalContent } from "../subscribe/SubscribeModalContent";
import { useQuery } from "@tanstack/react-query";

export const CategoryRecommender = () => {
  const { open, close } = useSimpleModal();

  const handleSubscribe = (category: Category) => {
    open({
      type: "confirm",
      message: null,
      customContent: <SubscribeModalContent close={close} category={category} />,
      buttonList: [],
    });
  };

  const { data: usageTop5 = [] } = useQuery<Category[] | null>({
    queryKey: ["categories", "usageTop5"],
    queryFn: () => getCategoriesByCount("usage"),
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });

  const { data: subscribeTop5 = [] } = useQuery<Category[] | null>({
    queryKey: ["categories", "subscribeTop5"],
    queryFn: () => getCategoriesByCount("subscribe"),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex justify-center iitems-stretch gap-4">
      {usageTop5 && (
        <div className="flex flex-col flex-1 flex-start rounded-2xl bg-gray-100 p-4">
          <div className="flex justify-start items-center gap-2 text-md font-bold mb-2">
            <Flame color="red" />
            <span>지금 가장 많이 쓰인 코멘터리 Top 5</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {usageTop5.map(category => (
              <Badge
                className="cursor-pointer"
                variant="default"
                size="lg"
                onClick={() => handleSubscribe(category)}
              >
                {category.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {subscribeTop5 && (
        <div className="flex flex-col flex-1 flex-start rounded-2xl bg-gray-100 p-4">
          <div className="flex justify-start items-center gap-2  text-md font-bold mb-2">
            <Flame color="red" />
            <span> 지금 가장 많이 구독한 코멘터리 Top 5</span>
          </div>
          <div className="flex flex-wrap  gap-2">
            {subscribeTop5.map(category => (
              <Badge
                className="cursor-pointer"
                variant="default"
                size="lg"
                onClick={() => handleSubscribe(category)}
              >
                {category.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
