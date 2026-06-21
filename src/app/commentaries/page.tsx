import { CategoryRecommender } from "@/components/category/CategoryRecommender";
import { FilteredCommentaryList } from "@/components/commentaries/FilteredCommentaryList";

export default function Commentaries() {
  return (
    <div className="min-h-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="flex justify-start mb-8">
        <h1 className="text-3xl font-bold">둘러보기</h1>
      </header>

      <main>
        <div className="flex flex-col gap-8">
          <CategoryRecommender />
          <FilteredCommentaryList />
        </div>
      </main>
    </div>
  );
}
