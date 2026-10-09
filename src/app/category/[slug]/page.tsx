import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? `${category.nameBn} | বাজার দর` : "পাতাটি পাওয়া যায়নি | বাজার দর" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <section className="rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{category.nameBn}</h1>
            <p className="text-sm text-base-content/60">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      {products.length === 0 ? (
        <section className="flex flex-col items-center rounded-box border border-base-300 bg-base-100 px-4 py-16 text-center">
          <p className="text-5xl">🧺</p>
          <h2 className="mt-4 text-xl font-semibold">এই বিভাগে এখনো কোনো পণ্য নেই</h2>
          <p className="mt-1 text-base-content/70">অন্য একটি বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।</p>
          <Link href="/" className="btn btn-primary btn-sm mt-6 sm:btn-md">
            হোম পেজে ফিরে যান
          </Link>
        </section>
      ) : (
        <CategoryProducts products={products} />
      )}
    </main>
  );
}