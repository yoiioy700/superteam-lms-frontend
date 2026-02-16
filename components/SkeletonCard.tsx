export default function SkeletonCard() {
  return (
    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-20 bg-white/10 rounded" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-white/10 rounded mb-3" />
      <div className="h-4 w-full bg-white/10 rounded mb-2" />
      <div className="h-4 w-2/3 bg-white/10 rounded mb-6" />
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-8 w-28 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
