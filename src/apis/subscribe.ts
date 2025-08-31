import apiClient from "@/lib/apiClient";
import { Category } from "./category";
import { Subscribe } from "@/store/authStore";

export type SubscribeCategory = Subscribe & { detail: Category };

export const getSubscribeCategoryList = async (uid: string): Promise<SubscribeCategory[]> => {
  try {
    const { data } = await apiClient.get(`/subscribe/${uid}`);

    return data.data || [];
  } catch (error) {
    console.error("Error fetching user sub data:", error);
    return [];
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
    const res = await apiClient.post(`/subscribe/${uid}`, body);

    return res;
  } catch (error) {
    console.error("Error add subscribe:", error);
    return null;
  }
};

export const updateSubscription = async (
  uid: string,
  body: {
    id: string;
    episode: number | null;
  }
) => {
  try {
    const res = await apiClient.patch(`/subscribe/${uid}`, body);

    return res;
  } catch (error) {
    console.error("Error add subscribe:", error);
    return null;
  }
};

export const deleteSubscription = async (uid: string, id: string) => {
  try {
    const res = await apiClient.delete(`/subscribe/${uid}`, { data: { id } });
    return res;
  } catch (error) {
    console.error("Error delete subscribe:", error);
    return null;
  }
};
