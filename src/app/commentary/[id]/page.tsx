import { CommentaryDetail } from "@/components/commentary/CommentaryDetail";
import { StandaloneWrapper } from "@/components/ui/standaloneWrapper";

export default function Detail(props: { params: Promise<{ id: string }> }) {
  return (
    <StandaloneWrapper>
      <CommentaryDetail paramsPromise={props.params} />
    </StandaloneWrapper>
  );
}
