import { useForm } from "@/hooks/useForm";
import { Button } from "../ui/button";
import { Category } from "@/apis/category";
import { NumberInput } from "../ui/numberInput";
import { useAuthStore } from "@/store/authStore";
import {
  SubscribeCategory,
  addSubscription,
  deleteSubscription,
  updateSubscription,
} from "@/apis/subscribe";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { useLoadingStore } from "@/store/loadingStore";
import { XIcon } from "lucide-react";

interface SubscribeFormState {
  id: string;
  episode: number | null;
}

export const SubscribeModalContent = ({
  close,
  category,
  subscribeData,
}: {
  close: () => void;
  category: Category;
  subscribeData?: SubscribeCategory;
}) => {
  const { user } = useAuthStore();
  const { open } = useSimpleModal();
  const queryClient = useQueryClient();
  const { startLoading, stopLoading } = useLoadingStore();
  const { values, setFieldValue, reset } = useForm<SubscribeFormState>({
    id: category.id,
    episode: subscribeData?.episode ?? null,
  });
  const { mutate: mutateSubscribe, isPending } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("로그인 정보가 없습니다.");
      if (subscribeData) {
        return updateSubscription(user.uid, {
          id: values.id,
          episode: values.episode,
        });
      } else {
        return addSubscription(user.uid, {
          id: values.id,
          episode: values.episode,
        });
      }
    },
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: () => {
      toast(
        subscribeData
          ? "구독 수정이 완료되었습니다"
          : `${category.title}(${category.author}) 구독이 완료되었습니다`
      );
      queryClient.invalidateQueries({ queryKey: ["subscribeList", user?.uid] });
      reset();
      close();
    },
    onError: (error: any) => {
      const errorMsg = error.response.data.error;
      let message = subscribeData ? "구독 수정 실패" : "구독 등록 실패";
      if (errorMsg === "Already Subscribed") {
        message = "이미 구독한 작품입니다";
      }
      toast.error(message);
    },
  });

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("로그인 정보가 없습니다.");
      if (!subscribeData) throw new Error("삭제할 구독 정보가 없습니다.");
      return deleteSubscription(user.uid, subscribeData.id);
    },
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: () => {
      toast(`${category.title} 구독이 삭제되었습니다`);
      queryClient.invalidateQueries({ queryKey: ["subscribeList", user?.uid] });
      reset();
      close();
    },
    onError: (error: any) => {
      const errorMessage = error.message || "구독 삭제 실패";
      toast(errorMessage);
    },
  });

  const handleSubscriptionRemove = () => {
    open({
      title: "구독 삭제",
      type: "confirm",
      message: "구독을 삭제하시겠습니까?",
      customContent: null,
      buttonList: [
        {
          text: "취소",
          variation: "secondary",
          onClick: close => close(),
        },
        {
          text: "삭제",
          variation: "destructive",
          onClick: () => mutateDelete(),
        },
      ],
    });
  };

  return (
    <div className="relative flex flex-col">
      <div className="mb-4">
        <h2 className="font-bold text-lg">작품 코멘터리 구독</h2>
        <p className="text-xs text-gray-500">
          같은 작품을 읽고 있는 독자들의 코멘터리를 구독합니다.
        </p>
      </div>
      <Button type="button" className="absolute right-0" variant="ghost" onClick={close}>
        <XIcon />
      </Button>
      <div className="border-1 rounded-md p-4 flex flex-col gap-1 mb-6">
        <li className="flex justify-between items-center">
          <span className="text-sm font-bold">작품명</span>
          <span className="text-xs">{category.title}</span>
        </li>
        <li className="flex justify-between items-center">
          <p className="text-sm font-bold">작가명</p>
          <p className="text-xs">{category.author}</p>
        </li>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold">회차 지정(선택)</p>
        <p className="text-xs text-gray-500">
          스포일러 모드를 켜면 지정한 회차 이후의 코멘터리들을 뮤트합니다.
        </p>
        <NumberInput
          value={values.episode || 0}
          onChange={value => {
            setFieldValue("episode", value);
          }}
          min={0}
          max={99999}
          step={1}
          placeholder="모두 노출"
        />
      </div>
      <div className="flex justify-end gap-4 mt-8">
        {subscribeData && (
          <Button
            type="button"
            className="flex-1/2"
            variant="destructive"
            onClick={handleSubscriptionRemove}
            disabled={isDeleting}
          >
            삭제하기
          </Button>
        )}
        <Button
          type="button"
          className="flex-1/2"
          onClick={() => mutateSubscribe()}
          disabled={isPending}
        >
          {subscribeData ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </div>
  );
};
