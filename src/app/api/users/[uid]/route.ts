import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";

export async function GET(req: NextRequest, context: any) {
  try {
    const { uid } = await context.params;
    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

const IMMUTABLE_FIELDS = ["id", "uid", "createdAt"];

export async function PATCH(req: NextRequest, context: any) {
  try {
    const { uid } = await context.params;
    const body = await req.json();

    // 수정 불가 필드는 제거
    const updates = Object.fromEntries(
      Object.entries(body).filter(([key]) => !IMMUTABLE_FIELDS.includes(key))
    );

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    await userRef.update(updates);

    const updatedDoc = await userRef.get();
    return NextResponse.json({ success: true, data: updatedDoc.data() }, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
