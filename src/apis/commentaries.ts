import axios from "axios";

export interface Commentary {
  id: string;
  imgUrl?: string;
  content: string;
  authorId: string;
  authorNickName: string;
  categoryTitle: string;
  categoryId: string;
  isSpoiler?: boolean;
  episode?: number;
  createdAt: Date;
  updatedAt: Date;
}

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

export const createCommentary = async (
  body: Omit<Commentary, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const res = await axios.post("/api/commentaries", body);

    if (res.status !== 200 && res.status !== 201) {
      console.warn("Failed to create commentary");
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
