import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

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
