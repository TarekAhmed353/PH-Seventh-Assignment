export function ProductCardSkeleton() {
  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="skeleton size-12 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-3 w-1/3" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-24" />
          </div>
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}