import SignUpForm from "@/components/auth/SignUpForm";
import { StandaloneWrapper } from "@/components/ui/standaloneWrapper";

export default function SignUp() {
  return (
    <StandaloneWrapper>
      <div className="flex flex-col w-full py-20 h-full items-center justify-start">
        <h2 className="text-2xl font-bold mb-10">회원가입으로 다양한 코멘터리를 즐겨보세요 🥹</h2>
        <SignUpForm />
      </div>
    </StandaloneWrapper>
  );
}
