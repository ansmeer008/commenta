import { LoginBanner } from "@/components/auth/LoginBanner";
import { Guide } from "@/components/guide/Guide";

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full pb-10">
      <Guide>
        <LoginBanner />
      </Guide>
    </div>
  );
}
