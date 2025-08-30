"use client";

import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/store/authStore";
import { updateUserData } from "@/apis/userData";

export function useImageUpload() {
  const { user } = useAuthStore();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const storage = getStorage();
    const fileId = uuidv4(); // 고유 파일명
    const storageRef = ref(storage, `users/${user?.uid}/profile_${fileId}`);

    try {
      setUploading(true);
      setError(null);

      // Firebase는 uploadBytesResumable로 진행률 추적 가능
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (err: any) {
      console.error("Image upload failed:", err);
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImageFromStorage = async (fileUrl: string): Promise<boolean> => {
    if (!user || !fileUrl) return false;

    try {
      setDeleting(true);
      setError(null);

      // URL → Storage path 변환
      const path = decodeURIComponent(fileUrl.split("/o/")[1].split("?")[0]);
      const storageRef = ref(getStorage(), path);

      await deleteObject(storageRef);

      return true;
    } catch (err: any) {
      console.error("Failed to delete image:", err);
      setError(err.message);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  const deleteProfileImage = async () => {
    if (!user?.profileUrl) return;

    const deleted = await deleteImageFromStorage(user.profileUrl);
    if (!deleted) return;

    // DB에서 프로필 이미지 제거
    const res = await updateUserData(user.uid, { profileUrl: null });
    if (res) {
      console.log("Profile image removed successfully");
    }
  };

  return {
    uploadImage,
    deleteProfileImage,
    uploading,
    deleting,
    error,
  };
}
