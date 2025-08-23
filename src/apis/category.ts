import axios from "axios";

export interface Category {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  usageCount: number;
  subscribeCount: number;
}

//작품 추가
export const addCategory = async ({ title, author }: { title: string; author: string }) => {
  try {
    const res = await axios.post("/api/category", { title, author });

    if (res.status !== 200 && res.status !== 201) {
      console.warn("Failed to add category");
      return null;
    }

    return res.data;
  } catch (error) {
    console.error("Error add commentary data:", error);
    return null;
  }
};

//작품 검색
export const searchCategoryList = async (search: string): Promise<Category[] | null> => {
  try {
    const res = await axios.get("/api/category/search", {
      params: { q: search },
    });
    return res.data.categories;
  } catch (error) {
    console.error("카테고리 검색 실패:", error);
    return null;
  }
};
