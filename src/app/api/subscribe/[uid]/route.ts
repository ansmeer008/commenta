import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { UserData } from "@/store/authStore";

export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const { uid } = await params;

    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() as UserData;

    // subscribeCategory가 없거나 빈 배열일 경우
    if (!userData.subscribeCategory || userData.subscribeCategory.length === 0) {
      return NextResponse.json({ categories: [] });
    }

    const categoriesSnap = await adminDb
      .collection("categories")
      .where("id", "in", userData.subscribeCategory)
      .get();

    const categories = categoriesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
