import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

//체크 필요
//나는 추가한다!라는 트리거가 있을 때에 태그를 추가하고 싶은 거지 무조건 없다고 추가하고 싶지는 않음
export const useTagSearch = (keyword: string) => {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      if (!keyword) {
        setResults([]);
        return;
      }

      const q = query(
        collection(db, "tags"),
        where("name", ">=", keyword),
        where("name", "<=", keyword + "\uf8ff")
      );

      const snapshot = await getDocs(q);
      const tagNames = snapshot.docs.map(doc => doc.data().name as string);
      setResults(tagNames);
    };

    fetchTags();
  }, [keyword]);

  return results;
};
