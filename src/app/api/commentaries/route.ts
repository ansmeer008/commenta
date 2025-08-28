import { NextRequest, NextResponse } from "next/server";
import { fetchCommentaryList } from "@/lib/commentaries";

export async function POST(req: NextRequest) {
  const { authorId, categoryIds, subscribes } = await req.json();
  const commentaries = await fetchCommentaryList(authorId, categoryIds, subscribes);
  return NextResponse.json(commentaries);
}

// export async function GET(req: NextRequest) {
//   try {
//     const categoryIds = req.nextUrl.searchParams.getAll("categoryIds[]");
//     const authorId = req.nextUrl.searchParams.get("authorId");
//     const commentaryList = await fetchCommentaryList(authorId, categoryIds);

//     return NextResponse.json({ data: commentaryList }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
