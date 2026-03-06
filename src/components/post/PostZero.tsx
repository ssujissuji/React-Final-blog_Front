import { FileX, RefreshCw } from "lucide-react";

export default function PostZero({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-800 rounded-lg">
        <div className="bg-slate-700 rounded-full p-6 mb-6">
          <FileX className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {selectedCategory === ""
            ? "No posts found"
            : `No posts in ${selectedCategory}`}
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          {selectedCategory === ""
            ? "There are no blog posts available at the moment."
            : `We couldn't find any posts in the "${selectedCategory}" category.`}
        </p>
        {selectedCategory !== "" ? (
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Show all posts
          </button>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh page
          </button>
        )}
      </div>
    </>
  );
}
