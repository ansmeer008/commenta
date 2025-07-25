"use client";

import { CommentaryDetail } from "@/components/CommentaryDetail";
import { Dialog } from "@/components/ui/dialog";
import { use } from "react";

//soft navigation 시 보여줄 코멘터리 상세페이지
export default function CommentaryDetailModal(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  return (
    <Dialog>
      <CommentaryDetail id={id} />
    </Dialog>
  );
}
