"use client";

import { Pencil, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useLoadingStore } from "@/store/loadingStore";
import { useState } from "react";
import { toast } from "sonner";

type ProfileProps = {
  profileUrl: string | null;
  onFileChange: (url: string | null) => void;
  className?: string;
};

export function Profile({ onFileChange, className, profileUrl }: ProfileProps) {
  const { uploadImage } = useImageUpload();
  const { startLoading, stopLoading } = useLoadingStore();
  const [preview, setPreview] = useState<string | null>(profileUrl ?? null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("지원되지 않는 파일 형식입니다. JPG, JPEG, PNG만 업로드 가능합니다.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.");
      return;
    }

    try {
      startLoading();
      const url = await uploadImage(file);
      if (url) {
        onFileChange(url);
      } else {
        onFileChange(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("업로드 중 오류가 발생했습니다.");
      onFileChange(null);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar className="w-20 h-20">
        <AvatarImage src={preview ?? profileUrl ?? ""} alt="Profile" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
      />

      <label
        htmlFor="file-upload"
        className="absolute bottom-3 right-0.5 translate-x-1/4 translate-y-1/4 w-6 h-6 rounded-full shadow-md flex items-center justify-center cursor-pointer bg-primary"
      >
        <Pencil className="w-3 h-3 text-white" />
      </label>
    </div>
  );
}
