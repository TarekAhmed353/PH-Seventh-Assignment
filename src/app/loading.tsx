import { ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <div className="skeleton h-72 w-full rounded-box" />
      <section>
        <div className="skeleton mb-4 h-7 w-40" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton mb-4 h-7 w-40" />
        <ProductGridSkeleton count={6} />
      </section>
    </main>
  );
}