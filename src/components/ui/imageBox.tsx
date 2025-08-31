"use client";

import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useLoadingStore } from "@/store/loadingStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Image } from "./image";

type ImgBoxProps = {
  images: string[]; // 여러 개 이미지 URL
  onImagesChange: (urls: string[]) => void;
  className?: string;
  maxImages?: number; // 최대 업로드 이미지 수
};

export function ImageBox({ images, onImagesChange, className, maxImages = 5 }: ImgBoxProps) {
  const { uploadImage } = useImageUpload();
  const { startLoading, stopLoading } = useLoadingStore();
  const [previews, setPreviews] = useState<string[]>(images ?? []);
  const [isInitialSetting, setIsInitialSetting] = useState(true);

  useEffect(() => {
    if (isInitialSetting && images?.length) {
      setPreviews(images);
      setIsInitialSetting(false);
    }
  }, [images, isInitialSetting]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previews.length >= maxImages) {
      toast.error(`최대 ${maxImages}개까지 업로드 가능합니다.`);
      return;
    }

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
        const updated = [...previews, url];
        setPreviews(updated);
        onImagesChange(updated);
      }
    } catch (error) {
      console.error(error);
      toast.error("업로드 중 오류가 발생했습니다.");
    } finally {
      stopLoading();
    }
  };

  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onImagesChange(updated);
  };

  return (
    <div className={cn("flex items-end justify-between", className)}>
      <div className="flex gap-2 flex-wrap">
        {previews.map((url, idx) => (
          <Image key={url} url={url} removeHandler={() => handleRemove(idx)} />
        ))}

        {previews.length < maxImages && (
          <label className="w-24 h-24 rounded-lg border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-gray-400 text-sm">
              <Plus />
            </span>
          </label>
        )}
      </div>
      {maxImages && (
        <span className="text-xs text-gray-400">
          {previews.length}/{maxImages}
        </span>
      )}
    </div>
  );
}
