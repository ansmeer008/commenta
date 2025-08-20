import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: commentaryId } = await params;

    if (!commentaryId) {
      return NextResponse.json(
        { success: false, error: "commentaryId is required" },
        { status: 400 }
      );
    }

    const docRef = adminDb.collection("commentaries").doc(commentaryId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, error: "Commentary not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: { id: docSnap.id, ...docSnap.data() } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching commentary:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
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

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, content, imgUrl, isSpoiler, episode } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing commentaryId" }, { status: 400 });
    }

    const commentaryRef = adminDb.collection("commentaries").doc(id);
    const commentaryDoc = await commentaryRef.get();

    if (!commentaryDoc.exists) {
      return NextResponse.json({ success: false, error: "Commentary not found" }, { status: 404 });
    }

    const updatedData: any = {
      updatedAt: Timestamp.now(),
    };

    if (content !== undefined) updatedData.content = content;
    if (imgUrl !== undefined) updatedData.imgUrl = imgUrl;
    if (isSpoiler !== undefined) updatedData.isSpoiler = isSpoiler;
    if (episode !== undefined) updatedData.episode = episode;

    await commentaryRef.update(updatedData);

    return NextResponse.json(
      { success: true, message: "Commentary updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating commentary:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
