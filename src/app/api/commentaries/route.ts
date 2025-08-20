import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const categoryIds = searchParams.getAll("categoryIds[]");

    let query: FirebaseFirestore.Query = adminDb.collection("commentaries");

    // 조건별 쿼리 조합
    if (categoryIds.length > 0) {
      query = query.where("categoryId", "in", categoryIds.slice(0, 10)); // 최대 10개
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();

    if (snapshot.empty) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const commentaryList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ data: commentaryList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
