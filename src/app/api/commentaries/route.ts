import { NextRequest, NextResponse } from "next/server";
import { fetchCommentaryList } from "@/lib/server/commentaries";

export async function POST(req: NextRequest) {
  const { authorId, categoryIds, subscribes } = await req.json();
  const commentaries = await fetchCommentaryList(authorId, categoryIds, subscribes);
  return NextResponse.json(commentaries);
}
