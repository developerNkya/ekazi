import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("animate-pulse rounded-md bg-slate-200/60", className)} />;
}

export function JobListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="card divide-y divide-slate-100 overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-5 flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2.5">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="card p-5 space-y-4">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}