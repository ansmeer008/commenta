import { NextRequest, NextResponse } from "next/server";
import { fetchCommentaryList } from "@/lib/server/commentaries";
import { verifyAuth } from "@/lib/server/auth";

export async function POST(req: NextRequest) {
  const { uid, error } = await verifyAuth(req);
  if (!uid) return error!;

  const { authorId, categoryIds, subscribes } = await req.json();
  const commentaries = await fetchCommentaryList(authorId, categoryIds, subscribes);
  return NextResponse.json(commentaries);
}
