import { Loader2 } from "lucide-react";

export default function Redirection() {
  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-white">리다이렉션 중...</h2>
      </div>
    </>
  );
}
