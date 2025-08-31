import { adminAuth } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

export async function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      uid: null,
      error: NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 }),
    };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { uid: decoded.uid, error: null };
  } catch (e) {
    console.error("Invalid token:", e);
    return {
      uid: null,
      error: NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 }),
    };
  }
}
