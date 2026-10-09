import { getProducts } from "@/lib/api";
import { bnDate, changeArrow, formatPercent, formatPrice, perUnit } from "@/lib/format";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-base-content/70">{bnDate()}</p>
      <h1 className="text-3xl font-bold">মোট {products.length}টি পণ্য</h1>
      <ul className="mt-4 space-y-1">
        {products.slice(0, 6).map((product) => (
          <li key={product.id}>
            {product.image} {product.nameBn} · {perUnit(product.unit)} · {formatPrice(product.today)} ·{" "}
            {changeArrow(product.change.dir)} {formatPercent(product.change.pct)}
          </li>
        ))}
      </ul>
    </main>
  );
}