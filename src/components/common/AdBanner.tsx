type AdBannerProps = {
  size?: "small" | "large";
};
export default function AdBanner({ size = "large" }: AdBannerProps) {
  return (
    <div
      className={`w-full bg-slate-800 rounded-lg flex items-center justify-center ${
        size === "large" ? "h-24" : "h-16"
      }`}
    >
      <p className="text-gray-400 text-sm">Advertisement</p>
      <p className="text-gray-500 text-xs pl-2">
        You can place ads {size === "large" ? "728x90" : "300x50"}
      </p>
    </div>
  );
}
