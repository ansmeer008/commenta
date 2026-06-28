"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { checkEmailFormat, checkPasswordFormat } from "@/utils/validation";
import { signUpWithEmail } from "@/actions/auth";

export default function SignUpForm({ close }: { close?: () => void }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { values, setFieldValue } = useForm({
    email: "",
    password: "",
    nickname: "",
  });
  const router = useRouter();

  const handleSignUp = async () => {
    if (!values.email || !values.password || !values.nickname) {
      return setErrorMsg("모든 필드를 입력해주세요.");
    }

    if (!checkEmailFormat(values.email)) {
      return setErrorMsg("이메일 형식에 맞게 입력해주세요.");
    }

    const { isValid, errors } = checkPasswordFormat(values.password);
    if (!isValid) {
      return setErrorMsg(errors[0]);
    }

    try {
      const result = await signUpWithEmail(values.email, values.password, values.nickname);

      if (!result.success || !result.user) {
        toast.error(result.error || "회원가입에 실패했습니다.");
        return;
      }

      toast.success("회원가입 완료!");

      useAuthStore.getState().setIsLoggedIn(true);
      useAuthStore.getState().setUser({
        uid: result.user.id,
        email: result.user.email || "",
        nickname: result.user.nickname,
        createdAt: new Date(result.user.created_at),
        subscribes: [],
        isNoSpoilerMode: result.user.is_no_spoiler_mode,
        profileUrl: result.user.profile_url,
      });

      setErrorMsg("");
      if (close) close();
      router.push("/my");
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] grid items-center gap-3">
        <Label htmlFor="email">ID</Label>
        <Input
          id="email"
          name="email"
          type="email"
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
            placeholder="비밀번호를 입력하세요"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          id="nickname"
          name="nickname"
          type="nickname"
          value={values.nickname}
          onChange={e => setFieldValue("nickname", e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
        {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}

        <Button type="button" size="lg" onClick={handleSignUp}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
