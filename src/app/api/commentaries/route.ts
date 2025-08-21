import { NextRequest, NextResponse } from "next/server";
import { fetchCommentaryList } from "@/lib/commentaries";

export async function GET(req: NextRequest) {
  try {
    const categoryIds = req.nextUrl.searchParams.getAll("categoryIds[]");
    const commentaryList = await fetchCommentaryList(categoryIds);

    return NextResponse.json({ data: commentaryList }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
