import { Mail, Lock, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../../../api/axios";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router";

export default function EmailLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPw, setIsShowPw] = useState(false);

  const setUserData = useAuthStore((state) => state.setUserData);

  const handleLogin = async () => {
    setError("");
    try {
      if (email.trim() === "") {
        setError("Email required");
        return;
      }
      if (password.trim().length <= 6) {
        setError("Password 는 6자 이상");
        return;
      }
      const {
        data: { accessToken, user },
      } = await axiosInstance.post("auth/login", {
        email,
        password,
      });

      const userData = {
        id: user._id,
        kakaoId: user.kakaoId,
        profileImage: user.profileImage,
        nickname: user.nickname,
        email: user.email,
      };
      sessionStorage.setItem("access_token", accessToken);
      setUserData(userData);

      navigate("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown error");
    }
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to SULOG
            </h1>
            <p className="text-gray-400">
              Please enter your credentials to continue
            </p>
          </div>

          {/* 에러 */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form action={handleLogin} className="space-y-4">
            {/* 이메일 입력 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={isShowPw ? "text" : "password"}
                  id="password"
                  className="w-full bg-slate-700 text-white pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setIsShowPw((show) => !show)}>
                  {isShowPw ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeClosed className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
