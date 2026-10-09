import Link from "next/link";
import type { Product } from "@/lib/types";
import { changeArrow, changeStyles, formatPercent, perUnit, toBn } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const style = changeStyles[product.change.dir];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card border border-base-300 bg-base-100 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="card-body gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{product.nameBn}</h3>
            <p className="text-xs text-base-content/60">{perUnit(product.unit)}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg">
              <span className="font-bold">{toBn(product.today)}</span> টাকা
            </p>
          </div>
          <span className={`badge badge-soft badge-sm font-semibold ${style.badge}`}>
            {changeArrow(product.change.dir)} {formatPercent(product.change.pct)}
          </span>
        </div>
      </div>
    </Link>
  );
}