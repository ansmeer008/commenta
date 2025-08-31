"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { fetchUserData } from "@/apis/userData";
import { useAuthStore } from "@/store/authStore";

export default function SignUpForm({ close }: { close?: () => void }) {
  const [errorMsg, setErrorMsg] = useState("");
  const { values, setFieldValue } = useForm({
    email: "",
    password: "",
    nickname: "",
  });
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      if (!values.email || !values.password || !values.nickname) {
        return toast("모든 필드를 입력해주세요.");
      }

      const { data } = await axios.post("/api/auth/signup", {
        email: values.email,
        password: values.password,
        nickname: values.nickname,
      });

      if (!data?.uid) {
        // 서버에서 예상치 못한 응답이 온 경우
        toast.error("회원가입에 실패했습니다.");
        return;
      }

      toast.success("회원가입 완료! 자동 로그인 중...");

      await signInWithEmailAndPassword(auth, values.email, values.password);

      const userData = await fetchUserData(data.uid);
      if (userData) {
        useAuthStore.getState().setIsLoggedIn(true);
        useAuthStore.getState().setUser(userData);
      }

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
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={e => setFieldValue("password", e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
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
