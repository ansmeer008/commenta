import { SubscribeModalContent } from "./../components/subscribe/SubscribeModalContent";
import axios from "axios";
import { Category } from "./category";

export const getSubscribeCategoryList = async (uid: string): Promise<Category[] | null> => {
  try {
    const { data } = await axios.get(`/api/subscribe/${uid}`);

    return data.data || [];
  } catch (error) {
    console.error("Error fetching user sub data:", error);
    return null;
  }
};

export const addSubscription = async (
  uid: string,
  body: {
    id: string;
    episode: number | null;
  }
) => {
  try {
    const res = await axios.post(`/api/subscribe/${uid}`, body);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error add subscribe:", error);
    return null;
  }
};
