import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  const newDoc = {
    title,
    author,
    createdAt: serverTimestamp(),
    usageCount: 0,
    subscribeCount: 0,
  };

  const docRef = await addDoc(collection(db, "categories"), newDoc);

  // UI에 쓰기 위해 doc.id 붙여서 반환
  return { ...newDoc, id: docRef.id };
};

//작품 검색
export const searchCategoryList = async (search: string): Promise<Category[]> => {
  const keyword = search.trim();
  if (!keyword) return [];

  try {
    const titleQuery = query(
      collection(db, "categories"),
      where("title", ">=", keyword),
      where("title", "<=", keyword + "\uf8ff")
    );
    const authorQuery = query(
      collection(db, "categories"),
      where("author", ">=", keyword),
      where("author", "<=", keyword + "\uf8ff")
    );

    const [titleSnap, authorSnap] = await Promise.all([getDocs(titleQuery), getDocs(authorQuery)]);

    const titleResults = titleSnap.docs.map(doc => ({
      ...(doc.data() as Omit<Category, "id">),
      id: doc.id,
    }));

    const authorResults = authorSnap.docs
      .filter(doc => !titleSnap.docs.find(t => t.id === doc.id))
      .map(doc => ({
        ...(doc.data() as Omit<Category, "id">),
        id: doc.id,
      }));

    return [...titleResults, ...authorResults];
  } catch (error) {
    console.error("검색 실패:", error);
    return [];
  }
};
