"use client";

import { CommentaryDetail } from "@/components/CommentaryDetail";
import { use } from "react";

//harn navigation 시 보여줄 코멘터리 상세페이지
export default function CommentaryDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);

  return (
    <div>
      <CommentaryDetail id={id} />
    </div>
  );
}
