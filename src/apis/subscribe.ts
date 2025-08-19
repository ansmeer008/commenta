import axios from "axios";
import { Category } from "./category";

export const getSubscribeCategoryList = async (uid: string): Promise<Category[] | null> => {
  try {
    const { data } = await axios.get(`/api/subscribe/${uid}`);

    return data.data || [];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
