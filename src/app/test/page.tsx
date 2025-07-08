"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function TestPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
      console.log("가입 완료", userCredential);
      setMessage("✅ 가입 성공!");
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log("✅ 로그인 성공:", userCredential);
      setMessage(`로그인 성공! 환영합니다 ${userCredential.user.email}`);
    } catch (err: any) {
      console.error(err);
      setMessage(`로그인 실패: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">🔐 Firebase 회원가입 테스트 & 로그인 테스트</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 mb-2 block"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={e => setPw(e.target.value)}
        className="border p-2 mb-2 block"
      />
      <div>
        <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">
          회원가입
        </button>
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          로그인
        </button>
      </div>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
