import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      imgUrl,
      content,
      authorId,
      authorNickName,
      categoryId,
      categoryTitle,
      isSpoiler = false,
      episode,
    } = body;

    if (!content || !authorId || !authorNickName || !categoryId || !categoryTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const now = Timestamp.now();

    const newCommentary = {
      imgUrl: imgUrl || null,
      content,
      authorId,
      authorNickName,
      categoryId,
      categoryTitle,
      isSpoiler,
      episode: episode || null,
      createdAt: now,
      updatedAt: now,
    };

    await adminDb.runTransaction(async t => {
      const categoryRef = adminDb.collection("categories").doc(categoryId);

      const categoryDoc = await t.get(categoryRef);
      if (!categoryDoc.exists) {
        throw new Error("Category not found");
      }

      // 코멘터리 등록
      const commentaryRef = adminDb.collection("commentaries").doc();
      t.set(commentaryRef, newCommentary);

      // usageCount 증가
      t.update(categoryRef, {
        usageCount: FieldValue.increment(1),
      });
    });

    return NextResponse.json({ data: newCommentary }, { status: 201 });
  } catch (error) {
    console.error("Error creating commentary:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
