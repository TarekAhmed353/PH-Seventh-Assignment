"use client";

import Marquee from "react-fast-marquee";
import type { Product } from "@/lib/types";
import { changeArrow, changeStyles, formatPercent, toBn, unitName } from "@/lib/format";

export default function TickerMarquee({ products }: { products: Product[] }) {
  return (
    <Marquee speed={60} pauseOnHover gradient={false} autoFill>
      {products.map((product) => (
        <span
          key={product.id}
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-base-300 px-4 py-2 text-sm"
        >
          <span>{product.image}</span>
          <span className="font-medium">{product.nameBn}</span>
          <span className="text-base-content/70">
            {toBn(product.today)} টাকা/{unitName(product.unit)}
          </span>
          <span className={`font-semibold ${changeStyles[product.change.dir].text}`}>
            {changeArrow(product.change.dir)} {formatPercent(product.change.pct)}
          </span>
        </span>
      ))}
    </Marquee>
  );
}