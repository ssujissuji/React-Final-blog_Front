import { useOptimistic, useState } from "react";
import { CalendarDays, Trash2, Pencil, Eye } from "lucide-react";
import AdBanner from "../../../components/common/AdBanner";
import PostGrid from "../../../components/post/PostGrid";
import CommentForm from "../../../components/comment/CommentForm";
import CommentComponent from "../../../components/comment/CommentComponent";
import { useLoaderData, useNavigate } from "react-router";
import { format } from "date-fns";
import { useAuthStore } from "../../../store/authStore";
import { axiosInstance } from "../../../api/axios";

export default function PostRead() {
  const navigate = useNavigate();
  const { post, relatedPosts }: { post: Post; relatedPosts: Post[] } =
    useLoaderData();
  const user = useAuthStore((state) => state.user);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [optimisticComments, addOptimisticComments] = useOptimistic<
    Comment[],
    Comment
  >(comments, (comment, value) => [...comment, value]);

  const deletePost = async () => {
    try {
      await axiosInstance.delete("/posts/" + post._id);
      navigate("/");
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "unknown error");
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await axiosInstance.delete(`/posts/${post._id}/comments/${commentId}`);
      setComments((comments) =>
        comments.filter((comment) => comment._id !== commentId),
      );
    } catch (e) {
      alert(e instanceof Error ? e.message : "Unknown error");
    }
  };
  // 게시글이 없으면
  if (!post)
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center flex flex-col justify-center min-h-[calc(100vh-76px)]">
        <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
        <p className="text-gray-400">
          The post you're looking for doesn't exist.
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <title>{`${post.title} - SULOG`}</title>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-md">
            {post.category}
          </span>
          {post.author._id === user?.id && (
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => navigate(`/edit/${post._id}`)}>
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(true);
                  deletePost();
                }}>
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center">
            <img
              src={post.author.profilImage}
              alt={post.author.nickname}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-white font-medium">{post.author.nickname}</p>
              <div className="flex items-center text-sm text-gray-400">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>
                  {format(new Date(post.createdAt), "yyyy-MM-dd HH:mm")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Eye className="h-4 w-4 mr-1" />
            <span>{post.viewCount}</span>
          </div>
        </div>

        <div className="mb-8">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none mb-12 text-white text-lg whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Delete Post</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t border-slate-700 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-8">Comments</h2>

          <CommentForm
            addOptimisticComments={addOptimisticComments}
            setComments={setComments}
          />

          <div className="mt-8 space-y-6">
            {optimisticComments &&
              optimisticComments.map((comment) => (
                <CommentComponent
                  key={comment._id}
                  deleteComment={deleteComment}
                  {...comment}
                />
              ))}
          </div>
        </div>

        <div className="my-12">
          <AdBanner />
        </div>

        <div className="mb-12">
          <PostGrid title="Related Posts" posts={relatedPosts} />
        </div>
      </div>
    </div>
  );
}
