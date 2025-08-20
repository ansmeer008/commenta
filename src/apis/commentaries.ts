import axios from "axios";
import { Commentary } from "./commentary";

export const getCommentaryList = async (categoryIds?: string[]): Promise<Commentary[] | null> => {
  try {
    const res = await axios.get(`/api/commentaries`, {
      params: { categoryIds },
    });

    if (res.status !== 200 || !res.data) {
      console.warn(`CommentaryList not found`);
      return null;
    }
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
