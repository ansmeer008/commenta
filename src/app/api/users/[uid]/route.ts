import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";

export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const { uid } = await params;
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
