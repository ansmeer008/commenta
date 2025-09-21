import { WriteCommentaryBtn } from "@/components/commentary/WriteCommentaryBtn";

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WriteCommentaryBtn className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] right-6 md:right-10" />
    </>
  );
}
