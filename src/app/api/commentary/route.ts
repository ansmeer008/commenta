import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      imgUrlList,
      content,
      authorId,
      categoryId,
      categoryTitle,
      isSpoiler = false,
      episode,
    } = body;

    if (!content || !authorId || !categoryId || !categoryTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const now = Timestamp.now();

    const newCommentary = {
      imgUrlList: imgUrlList || null,
      content,
      authorId,
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

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const commentaryId = searchParams.get("id");

    if (!commentaryId) {
      return NextResponse.json({ success: false, error: "Missing commentaryId" }, { status: 400 });
    }

    await adminDb.runTransaction(async t => {
      const commentaryRef = adminDb.collection("commentaries").doc(commentaryId);
      const commentaryDoc = await t.get(commentaryRef);

      if (!commentaryDoc.exists) {
        throw new Error("Commentary not found");
      }

      const { categoryId } = commentaryDoc.data() as { categoryId: string };

      // 코멘터리 삭제
      t.delete(commentaryRef);

      // usageCount 감소
      const categoryRef = adminDb.collection("categories").doc(categoryId);
      t.update(categoryRef, {
        usageCount: FieldValue.increment(-1),
      });
    });

    return NextResponse.json(
      { success: true, message: "Commentary deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting commentary:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
