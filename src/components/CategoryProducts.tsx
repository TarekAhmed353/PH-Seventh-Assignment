"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/lib/types";
import { toBn } from "@/lib/format";
import ProductGrid from "./ProductGrid";

type SortOption = "default" | "low-high" | "high-low";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted =
    sort === "default"
      ? products
      : [...products].sort((a, b) => (sort === "low-high" ? a.today - b.today : b.today - a.today));

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-box border border-base-300 bg-base-100 px-4 py-3">
        <p className="text-sm text-base-content/60">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-base-content/70">সাজান</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="cursor-pointer appearance-none rounded-field border border-base-300 bg-base-100 py-1.5 pl-3 pr-8 font-medium focus:border-primary focus:outline-none"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">দাম: কম থেকে বেশি</option>
              <option value="high-low">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-base-content/60" />
          </span>
        </label>
      </div>

      <ProductGrid products={sorted} />
    </section>
  );
}