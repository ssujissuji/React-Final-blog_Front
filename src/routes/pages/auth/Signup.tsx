import { Mail, Lock, Eye, User, EyeClosed } from "lucide-react";
import { useActionState, useState } from "react";
import { axiosInstance } from "../../../api/axios";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [isShowPw, setIsShowPw] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (_: { error: string; payload: FormData }, formData: FormData) => {
      try {
        const email = (formData.get("email") as string) || "";
        const nickname = (formData.get("nickname") as string) || "";
        const password = (formData.get("password") as string) || "";
        const confirmPassword =
          (formData.get("confirmPassword") as string) || "";

        // 입력양식 검사
        if (email.trim() === "")
          return { error: "Email is required", payload: formData };
        if (nickname.trim() === "")
          return { error: "Nickname is required", payload: formData };
        if (password.length <= 6)
          return {
            error: "Password must be at least 6 characters long",
            payload: formData,
          };
        if (password !== confirmPassword)
          return { error: "Password does not match", payload: formData };

        const { status } = await axiosInstance.post("/auth/signup", {
          email,
          nickname,
          password,
        });

        if (status === 201) {
          alert("회원가입에 성공했습니다.");
          navigate("/auth/email-login");
        }
        return { error: "signup failed", payload: formData };
      } catch (e) {
        return {
          error: e instanceof Error ? e.message : "unknown error",
          payload: formData,
        };
      }
    },
    {
      error: "",
      payload: new FormData(),
    },
  );
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to SULOG
            </h1>
            <p className="text-gray-400">Create your account</p>
          </div>

          {/* 에러 메시지 예시 */}
          {state.error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-500 text-sm">{state.error}</p>
            </div>
          )}
          <form action={formAction} className="space-y-4">
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
                  name="email"
                  className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  defaultValue={
                    state.error && String(state.payload?.get("email"))
                  }
                />
              </div>
            </div>

            {/* 닉네임 입력 */}
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-300 mb-2">
                Nickname
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Choose a nickname"
                  defaultValue={
                    state.error && String(state.payload?.get("nickname"))
                  }
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
                  name="password"
                  className="w-full bg-slate-700 text-white pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Create a password"
                  defaultValue={
                    state.error && String(state.payload?.get("password"))
                  }
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

            {/* 비밀번호 확인 입력 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full bg-slate-700 text-white pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Confirm your password"
                  defaultValue={
                    state.error && String(state.payload?.get("confirmPassword"))
                  }
                />
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                disabled={isPending}>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
