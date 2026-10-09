import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span className="text-error">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <span className="text-success">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-base-content/60">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}