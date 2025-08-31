import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useLoadingStore } from "@/store/loadingStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function LoginForm({ close }: { close?: () => void }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { values, setFieldValue } = useForm({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { openRouteModal } = useRouteModal();
  const { startLoading, stopLoading } = useLoadingStore();

  const handleLogin = async () => {
    try {
      startLoading();

      if (!values.email.length || !values.password.length) {
        return toast("check email or password");
      }

      await signInWithEmailAndPassword(auth, values.email, values.password);

      setErrorMsg("");
      if (close) {
        close();
      }
      router.replace("/my");
    } catch (error: any) {
      console.error("로그인 실패:", error);
      setErrorMsg("이메일 또는 비밀번호를 다시 확인해주세요.");
    } finally {
      stopLoading();
    }
  };

  const goSignUp = () => {
    openRouteModal("/signup");
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] grid items-center gap-3">
        <Label htmlFor="email">ID</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={e => setFieldValue("email", e.target.value)}
          placeholder="example@email.com"
        />
        <Label htmlFor="password">Password</Label>

        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={e => setFieldValue("password", e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        <Button type="button" size="lg" onClick={handleLogin}>
          로그인
        </Button>
        <Button type="button" size="lg" onClick={goSignUp}>
          회원 가입 하러 가기
        </Button>
      </div>
    </div>
  );
}
