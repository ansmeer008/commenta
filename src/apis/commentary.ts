import apiClient from "@/lib/apiClient";

export interface Commentary {
  id: string;
  imgUrlList?: string[];
  content: string;
  authorId: string;
  authorNickName: string;
  authorProfileUrl: string | null;
  categoryTitle: string;
  categoryId: string;
  isSpoiler?: boolean;
  episode?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getCommentary = async (commentaryId: string): Promise<Commentary | null> => {
  try {
    const res = await apiClient.get(`/commentary/${commentaryId}`);

    if (res.status !== 200 && res.status !== 201) {
      console.warn("Failed to get commentary");
      return null;
    }

    return res.data.data;
  } catch (error) {
    console.error("Error get commentary data:", error);
    return null;
  }
};

export const createCommentary = async (
  body: Omit<Commentary, "id" | "createdAt" | "updatedAt" | "authorNickName" | "authorProfileUrl">
) => {
  try {
    const res = await apiClient.post("/commentary", body);

    if (res.status !== 200 && res.status !== 201) {
      console.warn("Failed to create commentary");
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("Error add commentary data:", error);
    return null;
  }
};

export const deleteCommentary = async (commentaryId: string) => {
  try {
    const res = await apiClient.delete(`/commentary?id=${commentaryId}`);

    if (res.status !== 200 && res.status !== 201) {
      console.warn("Failed to delete commentary");
      return null;
    }

    return res.data.success;
  } catch (error) {
    console.error("Error delete commentary data:", error);
    return null;
  }
};

export const editCommentary = async (
  body: {
    id: string;
  } & Partial<Omit<Commentary, "id">>
) => {
  try {
    const res = await apiClient.patch(`/commentary/${body.id}`, body);

    if (res.status !== 200 && res.status !== 201) {
      console.warn("Failed to edit commentary");
      return null;
    }

    return res.data.success;
  } catch (error) {
    console.error("Error edit commentary data:", error);
    return null;
  }
};
