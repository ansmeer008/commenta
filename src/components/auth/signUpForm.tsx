"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpForm({ close }: { close?: () => void }) {
  const [errorMsg, setErrorMsg] = useState("");
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      if (!values.email.length || !values.password.length) {
        return toast("이메일과 비밀번호를 입력해주세요.");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("회원가입 성공:", userCredential.user);

      toast("회원가입 완료! 자동 로그인 중...");
      setErrorMsg("");

      if (close) {
        close();
      }

      // 회원가입 후 자동 로그인 → 리디렉션
      router.push("/my");
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("이미 등록된 이메일입니다.");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("비밀번호는 6자 이상이어야 합니다.");
      } else {
        setErrorMsg("회원가입 중 오류가 발생했습니다.");
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

        <Button size="lg" onClick={handleSignUp}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
