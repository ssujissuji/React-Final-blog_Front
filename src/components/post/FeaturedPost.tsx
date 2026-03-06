import { CalendarDays } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
      <img
        alt="The Impact of Technology on the Workplace: How Technology Is Changing"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        src={post.thumbnail}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
        <div className="mb-4">
          <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
            {post.category}
          </span>
        </div>
        <Link to={`/post/${post._id}`}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
        </Link>
        <div className="flex items-center">
          <img
            src={post.author.profilImage}
            className="w-8 h-8 rounded-full mr-3"
            alt={post.author.nickname}
          />
          <div className="text-white">
            <p className="text-sm font-medium"></p>
            <div className="flex items-center text-xs text-gray-300">
              <CalendarDays className="h-3 w-3 mr-1" aria-hidden="true" />
              <span>
                {format(new Date(post.createdAt), "yyyy-mm-dd HH:mm")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
