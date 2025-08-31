import axios from "axios";
import { Commentary } from "./commentary";
import { Subscribe } from "@/store/authStore";

export const getCommentaryList = async (
  categoryIds?: string[],
  authorId?: string,
  subscribes?: Subscribe[]
): Promise<Commentary[] | null> => {
  try {
    const res = await axios.post(`/api/commentaries`, {
      categoryIds,
      authorId,
      subscribes,
    });

    if (res.status !== 200 || !res.data) {
      console.warn(`CommentaryList not found`);
      return null;
    }
    return res.data || [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};
