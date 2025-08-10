import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm({ close }: { close?: () => void }) {
  const [errorMsg, setErrorMsg] = useState("");
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!values.email.length || !values.password.length) {
        return toast("check email or password");
      }

      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("로그인 성공:", userCredential.user);
      setErrorMsg("");
      if (close) {
        close();
      }
      router.replace("/my");
    } catch (error: any) {
      console.error("로그인 실패:", error);
      setErrorMsg("이메일 또는 비밀번호를 다시 확인해주세요.");
    }
  };

  const goSignUp = () => {
    router.push("/signup");
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
          onChange={handleChange}
          placeholder="example@email.com"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />

        {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}

        <p className="text-sm text-gray-700">아직 가입 전이라면?</p>
        <Button size="lg" onClick={goSignUp}>
          회원 가입 하러 가기
        </Button>

        <Button size="lg" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </div>
  );
}
