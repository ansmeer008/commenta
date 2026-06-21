import { WriteCommentaryForm } from "@/components/commentary/WriteCommentaryForm";
import { StandaloneWrapper } from "@/components/ui/standaloneWrapper";

export default function Create() {
  return (
    <StandaloneWrapper>
      <p className="text-lg font-bold mb-4">코멘터리 작성</p>
      <WriteCommentaryForm />
    </StandaloneWrapper>
  );
}
