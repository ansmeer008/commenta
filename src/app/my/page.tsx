import { NoSpoilerModeSection } from "@/components/my/NoSpoilerModeSection";
import { SubscibeSection } from "@/components/my/SubscribeSection";
import { MyCommentariesSection } from "@/components/my/MyCommentariesSection";
import { UserProfileSection } from "@/components/my/UserProfileSection";
import { LogoutButton } from "@/components/my/LogoutButton";

export default function MyPage() {
  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">내정보</h1>
        <LogoutButton />
      </header>
      <main className="flex flex-col gap-6">
        <UserProfileSection />
        <div className="flex flex-col gap-4 md:flex-row">
          <NoSpoilerModeSection />
          <SubscibeSection />
        </div>
        <MyCommentariesSection />
      </main>
    </div>
  );
}
