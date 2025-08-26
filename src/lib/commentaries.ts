import { adminDb } from "@/lib/admin";
import { Commentary } from "@/apis/commentary";

export async function fetchCommentaryList(
  authorId?: string | null,
  categoryIds?: string[]
): Promise<Commentary[]> {
  let query: FirebaseFirestore.Query = adminDb.collection("commentaries");

  if (categoryIds?.length) {
    query = query.where("categoryId", "in", categoryIds.slice(0, 10));
  }

  if (authorId) {
    query = query.where("authorId", "==", authorId);
  }

  const snapshot = await query.orderBy("createdAt", "desc").get();

  return snapshot.docs.map(doc => {
    const data = doc.data() as any;

    return {
      id: doc.id,
      authorId: data.authorId,
      categoryId: data.categoryId,
      content: data.content,
      episode: data.episode,
      authorNickName: data.authorNickName,
      authorProfileUrl: data.authorProfileUrl,
      categoryTitle: data.categoryTitle,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString(),
    };
  });
}
