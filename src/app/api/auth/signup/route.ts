import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname } = await req.json();

    if (!email || !password || !nickname) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Firebase Auth 유저 생성
    const userRecord = await adminAuth.createUser({ email, password });

    // Firestore 유저 문서 생성
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      nickname,
      createdAt: new Date().toISOString(),
      subscribes: [],
      isNoSpoilerMode: false,
    });

    return NextResponse.json({ uid: userRecord.uid });
  } catch (error: any) {
    console.error("회원가입 실패:", error);
    let message = "Server error";
    if (error.code === "auth/email-already-exists") message = "이미 등록된 이메일입니다.";
    if (error.code === "auth/weak-password") message = "비밀번호는 6자 이상이어야 합니다.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
