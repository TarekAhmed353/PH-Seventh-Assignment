import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="skeleton h-24 w-full rounded-box" />
      <div className="skeleton h-14 w-full rounded-box" />
      <ProductGridSkeleton count={6} />
    </main>
  );
}