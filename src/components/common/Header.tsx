import { useEffect, useState } from "react";
import { Search, PenSquare, LogIn } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import AuthProfile from "./AuthProfile";
import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const isLogin = useAuthStore((state) => state.isLogin);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [keyword, setKeyword] = useState(search);

  const handleSearch = () => {
    navigate("/posts?search=" + keyword);
  };
  useEffect(() => {
    if (!search) setKeyword("");
  }, [search]);

  return (
    <header className="bg-slate-900 text-white py-5 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold">SULOG</span>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Search"
              className={`bg-slate-800 text-white rounded-full py-1.5 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                isSearchOpen
                  ? "w-40 md:w-60 opacity-100"
                  : "w-0 opacity-0 md:w-40 md:opacity-100"
              }`}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 cursor-pointer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </div>
          <Link
            to="/create-post"
            className="p-1.5 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
            <PenSquare className="h-4 w-4" />
          </Link>
          {!isLogin && (
            <Link
              to="/auth/login"
              className="p-1.5 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              <LogIn className="h-4 w-4" />
            </Link>
          )}

          {/* 로그인 되면 아래 컴포넌트 보여주기 */}
          {isLogin && <AuthProfile />}
        </div>
      </div>
    </header>
  );
}
