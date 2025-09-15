import React from "react";
import { CommentaryList } from "../commentary/CommentaryList";
import Image from "next/image";

export const Guide = ({ children }: { children?: React.ReactNode }) => {
  const mockList = [
    {
      id: "test-1",
      content: "월넛 선생님에게 딱밤 맞고 바보같이 웃는 삶을 살고 싶다.",
      authorId: "author-test-1",
      authorNickName: "망개떡",
      authorProfileUrl:
        "https://firebasestorage.googleapis.com/v0/b/commenta-b0743.firebasestorage.app/o/assets%2F7309675.jpg?alt=media&token=4ee3a5cb-d970-4ce2-8902-f5cadc48e8ab",
      categoryTitle: "룬의 아이들",
      categoryId: "category-test-1",
      episode: 125,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test-4",
      content:
        "이 장르는 치실과 치간 칫솔을 규칙적으로 하는 습관을 기르게 도와줍니다. 주황색 고래 인형을 발견하면 조금 아련해지고 말지요.",
      authorId: "author-test-3",
      authorNickName: "치실을가지고온구원자님",
      authorProfileUrl:
        "https://firebasestorage.googleapis.com/v0/b/commenta-b0743.firebasestorage.app/o/assets%2Fvladimir-nikolic-t8woY5xlB1c-unsplash.jpg?alt=media&token=6a0e576c-7d4e-46ae-8df5-f0913f72f9ac",
      categoryTitle: "어두운 바다의 등불이 되어",
      categoryId: "category-test-3",
      episode: 200,
      isSpoiler: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test-2",
      content:
        "원작도 좋지만 웹툰화 된 내용도 너무 좋음. 특히나 김독자와 유중혁의 관계를 너무 잘 살렸다고 밖에 생각할 수 없는데...",
      authorId: "author-test-2",
      authorNickName: "푸린",
      authorProfileUrl:
        "https://firebasestorage.googleapis.com/v0/b/commenta-b0743.firebasestorage.app/o/assets%2F7309700.jpg?alt=media&token=9c0bb166-5e33-4033-bf33-1caed49a6a5e",
      categoryTitle: "전지적 독자 시점",
      categoryId: "category-test-1",
      episode: 125,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      id: "test-3",
      content:
        "류청우가 아육대를 못나가는 건 연예계적 손실이라고 생각합니다. 류청우 아육대 참가 서명 운동 같이 하실 분 구함.",
      authorId: "author-test-3",
      authorNickName: "과녁이되고싶은사람",
      authorProfileUrl:
        "https://firebasestorage.googleapis.com/v0/b/commenta-b0743.firebasestorage.app/o/assets%2Fround-icons-VdTIxSJvIO4-unsplash.jpg?alt=media&token=79665cf8-037b-490e-b8ae-78ba8168a4b8",
      categoryTitle: "데뷔 못 하면 죽는 병 걸림",
      categoryId: "category-test-3",
      episode: 125,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "test-8",
      content: "오늘 브라운은 정말 앙큼하고 귀여웠음;;",
      authorId: "author-test-8",
      authorNickName: "thegreatestshowhost",
      authorProfileUrl: null,
      categoryTitle: "괴담에 떨어져도 출근을 해야 하는구나",
      categoryId: "category-test-8",
      episode: 248,
      isSpoiler: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="flex flex-col items-center px-8">
      <div className="relative w-120 h-30">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/commenta-b0743.firebasestorage.app/o/assets%2FCommenta_logo.png?alt=media&token=d6105a26-7777-493b-b053-74cbbf81cb4d"
          alt="Commenta logo"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <section>
        <h2 className="text-xl font-bold text-center text-gray-600">
          다양한 사람들과 코멘터리를 나눠보세요
        </h2>
        {children}

        <p className="text-xs text-gray-500 pt-4 text-center">*아래 코멘터리들은 예시입니다</p>
        <div className="border-2 mt-4 rounded-4xl h-100 overflow-hidden">
          <div className="h-full px-10">
            <div className="flex flex-col animate-[scroll-up_20s_linear_infinite]">
              <CommentaryList commentaryList={mockList} isClickable={false} />
              <CommentaryList commentaryList={mockList} isClickable={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
