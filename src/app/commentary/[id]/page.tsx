import { CommentaryDetail } from "@/components/commentary/CommentaryDetail";
import { StandaloneWrapper } from "@/components/ui/standaloneWrapper";
import { use } from "react";

export default function Detail(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  return (
    <StandaloneWrapper>
      <CommentaryDetail id={id} />
    </StandaloneWrapper>
  );
}
