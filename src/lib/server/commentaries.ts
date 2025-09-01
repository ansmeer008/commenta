import { adminDb } from "@/lib/admin";
import { Commentary } from "@/apis/commentary";
import { FieldPath } from "firebase-admin/firestore";
import { Subscribe } from "@/store/authStore";

export async function fetchCommentaryList(
  authorId?: string | null,
  categoryIds?: string[],
  subscribes?: Subscribe[]
): Promise<Commentary[]> {
  let query: FirebaseFirestore.Query = adminDb.collection("commentaries");

  if (categoryIds?.length) {
    query = query.where("categoryId", "in", categoryIds.slice(0, 10));
  }

  if (authorId) {
    query = query.where("authorId", "==", authorId);
  }

  const snapshot = await query.orderBy("createdAt", "desc").get();

  let commentaries = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as any),
  }));

  if (commentaries.length === 0) return [];

  // 구독 episode 정보 기반 필터링
  if (subscribes?.length) {
    const subMap = new Map(subscribes.map(s => [s.id, s.episode]));
    commentaries = commentaries.filter(c => {
      const myEpisode = subMap.get(c.categoryId);
      if (myEpisode == null || myEpisode === 0) return true; //구독 정보 없으면 그냥 통과
      return c.episode <= myEpisode; // 스포일러 컷
    });
  }

  // 고유 authorId 추출
  const authorIds = [...new Set(commentaries.map(c => c.authorId))];

  // Firestore `in` 은 30개 제한 → 나눠서 쿼리
  const userDocs: FirebaseFirestore.QueryDocumentSnapshot[] = [];
  for (let i = 0; i < authorIds.length; i += 30) {
    const batchIds = authorIds.slice(i, i + 30);
    const snap = await adminDb
      .collection("users")
      .where(FieldPath.documentId(), "in", batchIds)
      .get();
    userDocs.push(...snap.docs);
  }

  const usersMap = new Map(userDocs.map(doc => [doc.id, doc.data()]));

  return commentaries.map(c => {
    const author = usersMap.get(c.authorId);
    return {
      ...c,
      authorNickName: author?.nickname ?? null,
      authorProfileUrl: author?.profileUrl ?? null,
      createdAt: c.createdAt.toDate().toISOString(),
      updatedAt: c.updatedAt.toDate().toISOString(),
    } as Commentary;
  });
}
