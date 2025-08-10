import { EllipsisVertical, Flame, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useSimpleModal } from "@/hooks/useSimpleModal";

//TODO:: props category data interface 교체
export const SubscibeSection = ({ subscribeList }: { subscribeList: any[] }) => {
  const { open } = useSimpleModal();

  //just test
  //TODO:: 회차 정보 처음에는 input으로 받고 추후에 업데이트 시킬 땐 + - 버튼으로 쉽게 올리거나 내릴 수 있게 하기
  const openCategoryInfo = () => {
    open({
      type: "confirm",
      customContent: <>작품 정보랑 회차 정보 드러감</>,
      message: null,
      buttonList: [],
    });
  };

  return (
    <div className="flex flex-col gap-2 border-1 rounded-lg p-4 flex-1">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold">나의 구독</span>
          <Button type="button" variant="ghost">
            <EllipsisVertical size={20} />
          </Button>
        </div>
        <p className="text-xs text-gray-500">언급이 많은 작품에는 활활 타오르는 표시가 붙어요</p>
      </div>
      {/* TODO:: 알록달록..? */}
      <div className="flex flex-wrap gap-2">
        <Badge size="lg" onClick={openCategoryInfo}>
          <Flame size={14} color="red" fill="red" />
          데못죽(백덕수)
        </Badge>
        <Badge size="lg">
          <Flame size={14} color="red" fill="red" />
          괴담출근(백덕수)
        </Badge>
        <Badge size="lg">어두운바다의등불이되어(연산호)</Badge>
        <Badge size="lg">
          <Plus size={10} />
          10
        </Badge>
      </div>
    </div>
  );
};
