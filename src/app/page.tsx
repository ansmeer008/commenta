import { LoginBanner } from "@/components/auth/LoginBanner";
import { CommentaryList } from "@/components/commentary/CommentaryList";
import { fetchCommentaryList } from "@/lib/commentaries";

export default async function Home() {
  const commentaryList = await fetchCommentaryList();

  return (
    <div className="flex flex-col w-full py-6 h-full">
      <LoginBanner />

      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold pt-4">실시간 코멘터리</h2>
        <CommentaryList
          commentaryList={commentaryList ?? []}
          placeholder="지금은 코멘터리가 없어요 🐥"
        />
      </div>
    </div>
  );
}
