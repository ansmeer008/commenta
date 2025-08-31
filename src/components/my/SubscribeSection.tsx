import { Flame } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { SubscribeCategory, getSubscribeCategoryList } from "@/apis/subscribe";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { SubscribeModalContent } from "../subscribe/SubscribeModalContent";

export const SubscibeSection = () => {
  const { open, close } = useSimpleModal();
  const { user } = useAuthStore();

  const { data: subscribeList = [] } = useQuery<SubscribeCategory[]>({
    queryKey: ["subscribeList", user?.uid],
    queryFn: () => (user?.uid ? getSubscribeCategoryList(user.uid) : Promise.resolve([])),
    enabled: !!user?.uid, // 로그인 한 경우에만 실행
  });

  const openCategoryInfo = (subscribeData: SubscribeCategory) => {
    open({
      type: "confirm",
      customContent: (
        <SubscribeModalContent
          close={close}
          category={subscribeData.detail}
          subscribeData={subscribeData}
        />
      ),
      message: null,
      buttonList: [],
    });
  };

  return (
    <div className="flex flex-col gap-2 border-1 rounded-lg p-4 flex-1">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-base font-bold">
            나의 구독
            <span className="text-xs font-medium text-gray-500">({subscribeList.length}/10)</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          현재 구독하고 있는 작품들의 코멘터리를 보여줍니다 (최대 10개)
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {subscribeList.map(subscribe => {
          const isHot = subscribe.detail.usageCount > 10 || subscribe.detail.subscribeCount > 10;
          return (
            <Badge
              key={subscribe.detail.id}
              size="lg"
              onClick={() => openCategoryInfo(subscribe)}
              className="cursor-pointer"
            >
              {isHot && <Flame size={14} color="red" fill="red" />}
              {subscribe.detail.title} ({subscribe.detail.author})
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
