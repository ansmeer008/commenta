import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId?: string; authorId?: string } }
) {
  try {
    let query: FirebaseFirestore.Query = adminDb.collection("commentaries");

    // 조건별 쿼리 조합
    if (params?.categoryId) {
      query = query.where("categoryId", "==", params.categoryId);
    }
    if (params?.authorId) {
      query = query.where("authorId", "==", params.authorId);
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

    const docRef = await adminDb.collection("commentaries").add(newCommentary);

    return NextResponse.json({ id: docRef.id, ...newCommentary }, { status: 201 });
  } catch (error) {
    console.error("Error creating commentary:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
