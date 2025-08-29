import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/admin";

const normalizeForComparison = (str: string) => str.replace(/\s+/g, "").toLowerCase();

export async function POST(req: Request) {
  try {
    let { title, author } = await req.json();

    if (!title || !author) {
      return NextResponse.json(
        { success: false, error: "제목과 작가명을 입력해주세요." },
        { status: 400 }
      );
    }

    // 저장할 값 (앞뒤 공백만 제거)
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    // 비교용 값 (모든 공백 제거 + 소문자 변환)
    const normalizedTitle = normalizeForComparison(trimmedTitle);
    const normalizedAuthor = normalizeForComparison(trimmedAuthor);

    const snapshot = await adminDb
      .collection("categories")
      .where("title", "==", trimmedTitle)
      .get();

    const isDuplicate = snapshot.docs.some(doc => {
      const data = doc.data();
      const existingTitle = normalizeForComparison(data.title);
      const existingAuthor = normalizeForComparison(data.author);
      return existingTitle === normalizedTitle && existingAuthor === normalizedAuthor;
    });

    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: "이미 동일한 제목과 작가명의 작품이 존재합니다." },
        { status: 409 }
      );
    }

    const newDoc = {
      title: trimmedTitle,
      author: trimmedAuthor,
      createdAt: Timestamp.now(),
      usageCount: 0,
      subscribeCount: 0,
    };

    const docRef = await adminDb.collection("categories").add(newDoc);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        ...newDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ success: false, error: "작품 등록 실패" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "usage"; // "usage" | "subscribe"
    const limitCount = Number(searchParams.get("limit") || 5);

    let query;

    if (type === "subscribe") {
      query = adminDb.collection("categories").orderBy("subscribeCount", "desc").limit(limitCount);
    } else {
      query = adminDb.collection("categories").orderBy("usageCount", "desc").limit(limitCount);
    }

    const snapshot = await query.get();

    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any),
    }));

    return NextResponse.json(
      {
        success: true,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("추천 카테고리 조회 실패:", error);
    return NextResponse.json(
      {
        success: false,
        error: "추천 카테고리 조회 중 오류가 발생했습니다.",
        categories: [],
      },
      { status: 500 }
    );
  }
}
