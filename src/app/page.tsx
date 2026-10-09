import Hero from "@/components/Hero";
import { getProducts } from "@/lib/api";
import { formatPrice, perUnit } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <ul className="mt-4 space-y-2">
          {products.map((product) => (
            <li key={product.id}>
              {product.image} {product.nameBn} · {perUnit(product.unit)} · {formatPrice(product.today)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}