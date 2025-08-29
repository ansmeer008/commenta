import { LoginBanner } from "@/components/auth/LoginBanner";
import { Guide } from "@/components/guide/Guide";

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Guide>
        <LoginBanner />
      </Guide>
    </div>
  );
}
