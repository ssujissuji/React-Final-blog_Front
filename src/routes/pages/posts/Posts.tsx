import { Clock, Filter, TrendingUp } from "lucide-react";
import PostCard from "../../../components/post/PostCard";
import AdBanner from "../../../components/common/AdBanner";
import Pagination from "./Pagination";
import { useLoaderData, useSearchParams } from "react-router";
import PostZero from "../../../components/post/PostZero";

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { posts, pagination }: { posts: Post[]; pagination: Pagination } =
    useLoaderData();

  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "newest";
  const category = searchParams.get("category") || "";

  const handleSortChange = (sort: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", sort);
    setSearchParams(next);
  };
  const handleCategoryChange = (category: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("category", category);
    setSearchParams(next);
  };
  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <title>Posts List - SULOG</title>

      {/* Header: Title + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          Blog Posts
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-2 rounded-lg">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select
              className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value={""}>All</option>
              <option value={"Technology"}>Technology</option>
              <option value={"Lifestyle"}>Lifestyle</option>
              <option value={"Travel"}>Travel</option>
              <option value={"Business"}>Business</option>
              <option value={"Economy"}>Economy</option>
              <option value={"Sports"}>Sports</option>
            </select>
          </div>
          <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${sort === "newest" ? "bg-blue-500 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"}`}
              onClick={() => handleSortChange("newest")}>
              <Clock className="w-4 h-4" />
              Latest
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors  ${sort === "views" ? "bg-blue-500 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"}`}
              onClick={() => handleSortChange("views")}>
              <TrendingUp className="w-4 h-4" />
              Popular
            </button>
          </div>
        </div>
      </div>

      {/* Post List - 정적 PostCard 예시 3개 */}
      {posts && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts &&
              posts.map((post) => <PostCard key={post._id} {...post} />)}
          </div>

          {/* Pagination */}
          {pagination.maxPage > 1 && (
            <Pagination
              pageRange={5}
              currentPage={page}
              maxPage={pagination.maxPage}
              onPageChange={(page: number) => handlePageChange(page)}
            />
          )}
        </>
      )}
      {posts && posts.length === 0 && <PostZero selectedCategory={category} />}
      {/* Ad Banner */}
      <div className="mt-12">
        <AdBanner />
      </div>
    </div>
  );
}
