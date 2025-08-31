import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id: commentaryId } = await context.params;

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

    const data = docSnap.data() as any;
    let authorNickName = null;
    let authorProfileUrl = null;

    if (data?.authorId) {
      const userSnap = await adminDb.collection("users").doc(data.authorId).get();
      if (userSnap.exists) {
        const userData = userSnap.data() as any;
        authorNickName = userData.nickname ?? null;
        authorProfileUrl = userData.profileUrl ?? null;
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: docSnap.id,
          ...data,
          authorNickName,
          authorProfileUrl,
          createdAt: data.createdAt.toDate().toISOString(),
          updatedAt: data.updatedAt.toDate().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching commentary:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, content, imgUrlList, isSpoiler, episode } = body;

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
    if (imgUrlList !== undefined) updatedData.imgUrlList = imgUrlList;
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
