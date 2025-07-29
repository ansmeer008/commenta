"use client";

import { CommentaryList } from "@/components/commentary/CommentaryList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const recommendCommentaryList = [
  {
    id: "1",
    imgUrl: "",
    title: "어바등...이게 맞냐",
    content:
      "이렇게 내 가슴을 박박 찢어놓고 완결이 나면 다인거임? 나는 이렇게 일상생활이 불가한 몸이 되어버렸는데도..? 왜 나만 두고 떠나가는 것임 이 완결이라는 건...?",
    author: "trieydk23kls3",
    isSpoiler: false,
    genre: ["어바등", "어두운바다의등불이되어"],
  },
  {
    id: "2",
    imgUrl: "",
    title: "책 펴라 여기까지 기말범위다",
    content:
      "류청우 머리 끝부터 발 끝까진 전부 시험 범위니까 외워라. 양궁할 때 류청우? 너무 중요하지. 밤톨머리 아카쨩 시절 류청우? 이건 뭐 말이 필요 없지. 스티어 때 류청우? 그건 이제 변별력 문제다.",
    author: "과녁이꿈인사람",
    isSpoiler: false,
    genre: ["데뷔못하면죽음", "데못죽"],
  },
  {
    id: "3",
    imgUrl: "",
    title: "아니 왤케 주접을 떨어;;했는데 내가 주접이 된 건에 대하여",
    content:
      "금요일의 남자 브라운이 오신다 오셨다 오신다 오셨다 오신다 오셨다 위대한 쇼의 진행자! 브라운이 왔습니다!",
    author: "browntheshowman",
    isSpoiler: true,
    genre: ["괴출", "괴담출근", "백덕수"],
  },
  {
    id: "4",
    imgUrl: "",
    title: "어바등...이게 맞냐",
    content:
      "이렇게 내 가슴을 박박 찢어놓고 완결이 나면 다인거임? 나는 이렇게 일상생활이 불가한 몸이 되어버렸는데도..? 왜 나만 두고 떠나가는 것임 이 완결이라는 건...?",
    author: "trieydk23kls3",
    isSpoiler: false,
    genre: ["어바등", "어두운바다의등불이되어"],
  },
  {
    id: "5",
    imgUrl: "",
    title: "책 펴라 여기까지 기말범위다",
    content:
      "류청우 머리 끝부터 발 끝까진 전부 시험 범위니까 외워라. 양궁할 때 류청우? 너무 중요하지. 밤톨머리 아카쨩 시절 류청우? 이건 뭐 말이 필요 없지. 스티어 때 류청우? 그건 이제 변별력 문제다.",
    author: "과녁이꿈인사람",
    isSpoiler: false,
    genre: ["데뷔못하면죽음", "데못죽", "백덕수"],
  },
  {
    id: "6",
    imgUrl: "",
    title: "아니 왤케 주접을 떨어;;했는데 내가 주접이 된 건에 대하여",
    content:
      "금요일의 남자 브라운이 오신다 오셨다 오신다 오셨다 오신다 오셨다 위대한 쇼의 진행자! 브라운이 왔습니다!",
    author: "browntheshowman",
    isSpoiler: true,
    genre: ["괴출", "괴담출근", "백덕수"],
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full py-6 h-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full py-8 border-b-2">
        <h2 className="text-2xl font-bold">다양한 사람들과 더 많은 코멘터리를 즐기고 싶다면</h2>
        <Button className="w-3/6" onClick={() => router.push("/login")}>
          로그인
        </Button>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold pt-4">실시간 코멘터리</h2>
        <CommentaryList commentaryList={recommendCommentaryList} />
      </div>
    </div>
  );
}
