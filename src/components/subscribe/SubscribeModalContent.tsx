import { useForm } from "@/hooks/useForm";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Category } from "@/apis/category";
import { NumberInput } from "../ui/numberInput";
import { useAuthStore } from "@/store/authStore";
import { addSubscription } from "@/apis/subscribe";
import { toast } from "sonner";

interface SubscribeFormState {
  id: string;
  episode: number | null;
}

export const SubscribeModalContent = ({
  close,
  category,
}: {
  close: () => void;
  category: Category;
}) => {
  const { user } = useAuthStore();
  const { values, setFieldValue, reset } = useForm<SubscribeFormState>({
    id: category.id,
    episode: null,
  });

  const handleSubmit = async () => {
    if (!user) return;
    const result = await addSubscription(user.uid, {
      id: values.id,
      episode: values.episode,
    });

    if (result) {
      toast(`${category.title}(${category.author}) 구독이 완료되었습니다`);
      reset();
      close();
    }
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="mb-4">
        <h2 className="font-bold text-lg">작품 코멘터리 구독하기</h2>
        <p className="text-xs text-gray-500">
          같은 작품을 읽고 있는 독자들의 코멘터리를 구독합니다.
        </p>
      </div>
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
        <p className="text-sm font-bold">회차 지정</p>
        <p className="text-xs text-gray-500">
          회차를 지정하면 현 회차 이후의 코멘터리들을 뮤트 됩니다.
        </p>
        <NumberInput
          value={values.episode || 0}
          onChange={value => {
            setFieldValue("episode", value);
          }}
          min={0}
          max={99999}
          step={1}
        />
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Button className="flex-1/2" variant="secondary" onClick={close}>
          취소
        </Button>
        <Button className="flex-1/2" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
};
