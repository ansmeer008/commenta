import LoginForm from "@/components/auth/LoginForm";
import { StandaloneWrapper } from "@/components/ui/standaloneWrapper";

export default function Login() {
  return (
    <StandaloneWrapper>
      <div className="flex flex-col w-full py-20 h-full items-center justify-start">
        <h2 className="text-2xl font-bold mb-10">로그인으로 다양한 코멘터리를 즐겨보세요 🥹</h2>
        <LoginForm />
      </div>
    </StandaloneWrapper>
  );
}
