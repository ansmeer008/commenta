"use server";

import { createClient } from "@/lib/supabase/server";

interface SignUpResult {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    nickname: string;
    created_at: string;
    is_no_spoiler_mode: boolean;
    profile_url: string | null;
    updated_at: string;
  };
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  nickname: string
): Promise<SignUpResult> => {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname: nickname,
      },
    },
  });

  if (authError || !authData.user) {
    // console.error("회원가입 에러:", authError?.message);
    console.error("❌ 프로필 로드 진짜 에러 원인:", {
      name: authError?.name,
      status: authError?.status,
      message: authError?.message,
    });
    return { success: false, error: authError?.message || "SignUp Failed" };
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profileData) {
    console.error("프로필 로드 실패:", profileError?.message);
    // 프로필 조회 실패 시 가입은 되었으므로 최소한의 유저 정보라도 리턴
    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email || "",
        nickname,
        created_at: new Date().toISOString(),
        is_no_spoiler_mode: false,
        profile_url: null,
        updated_at: new Date().toISOString(),
      },
    };
  }

  return {
    success: true,
    user: {
      id: profileData.id,
      email: profileData.email || "",
      nickname: profileData.nickname,
      created_at: profileData.created_at,
      is_no_spoiler_mode: profileData.is_no_spoiler_mode,
      profile_url: profileData.profile_url,
      updated_at: profileData.updated_at,
    },
  };
};

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    console.error("로그인 에러:", error?.message);
    return { success: false, error: error?.message || "Login Failed" };
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profileData) {
    console.error("프로필 로드 실패:", profileError?.message);
    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || "",
        nickname: data.user.user_metadata?.nickname || "",
        created_at: new Date().toISOString(),
        is_no_spoiler_mode: false,
        profile_url: null,
        updated_at: new Date().toISOString(),
      },
    };
  }

  return {
    success: true,
    user: {
      id: profileData.id,
      email: profileData.email || "",
      nickname: profileData.nickname,
      created_at: profileData.created_at,
      is_no_spoiler_mode: profileData.is_no_spoiler_mode,
      profile_url: profileData.profile_url,
      updated_at: profileData.updated_at,
    },
  };
};

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("로그아웃 에러:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};
