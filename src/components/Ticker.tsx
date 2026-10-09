import { getProducts } from "@/lib/api";
import TickerMarquee from "./TickerMarquee";

export default async function Ticker() {
  const products = await getProducts();

  return (
    <div className="border-b border-base-300 bg-base-200">
      <TickerMarquee products={products} />
    </div>
  );
}