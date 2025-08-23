import { NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = (searchParams.get("q") || "").trim();

    if (!keyword) {
      return NextResponse.json({ success: true, categories: [] }, { status: 200 });
    }

    // title 검색
    const titleSnap = await adminDb
      .collection("categories")
      .where("title", ">=", keyword)
      .where("title", "<=", keyword + "\uf8ff")
      .get();

    // author 검색
    const authorSnap = await adminDb
      .collection("categories")
      .where("author", ">=", keyword)
      .where("author", "<=", keyword + "\uf8ff")
      .get();

    const titleResults = titleSnap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any),
    }));

    const authorResults = authorSnap.docs
      .filter(doc => !titleSnap.docs.find(t => t.id === doc.id))
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

    return NextResponse.json(
      {
        success: true,
        categories: [...titleResults, ...authorResults],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("검색 실패:", error);
    return NextResponse.json(
      {
        success: false,
        error: "검색 중 오류가 발생했습니다.",
        categories: [],
      },
      { status: 500 }
    );
  }
}
