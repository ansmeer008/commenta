"use client";

import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/store/authStore";

export function useImageUpload() {
  const { user } = useAuthStore();
  const [uploading, setUploading] = useState(false);
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

  return {
    uploadImage,
    uploading,
    error,
  };
}
