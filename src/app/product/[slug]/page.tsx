import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { auth } from "@/lib/auth";
import { changeArrow, changeStyles, formatAmount, formatPercent, perUnit, toBn, unitName } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} | বাজার দর` : "পাতাটি পাওয়া যায়নি | বাজার দর" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);

  const markets = product.markets
    .map((market) => ({ ...market, avg: (market.min + market.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const cheapest = markets.reduce((best, market) => (market.min < best.min ? market : best), markets[0]);
  const dearest = markets.reduce((best, market) => (market.max > best.max ? market : best), markets[0]);
  const average = Math.round(markets.reduce((sum, market) => sum + market.avg, 0) / markets.length);

  const unit = unitName(product.unit);
  const style = changeStyles[product.change.dir];
  const difference = Math.abs(product.today - product.yesterday);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="breadcrumbs text-sm text-base-content/70">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
          </li>
          <li className="text-base-content">{product.nameBn}</li>
        </ul>
      </div>

      <section className="rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl sm:size-20 sm:text-5xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-base-content/60">
                <span>{perUnit(product.unit)}</span>
                <Link href={`/category/${product.category}`} className="badge badge-soft badge-primary badge-sm">
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
              </div>
              <p className="mt-2 text-sm">
                {product.change.dir === "flat" ? (
                  <>
                    গতকালের তুলনায় আজ দাম <strong>একই আছে</strong>
                  </>
                ) : (
                  <>
                    গতকালের তুলনায় আজ দাম <strong>{product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
                    {toBn(difference)} টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-box bg-base-200 px-6 py-4 text-center sm:min-w-36">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-4xl font-bold">{toBn(product.today)}</p>
            <p className="text-sm text-base-content/60">টাকা / {unit}</p>
            <p className={`mt-1 text-sm font-semibold ${style.text}`}>
              {changeArrow(product.change.dir)} {formatPercent(product.change.pct)}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-box border border-base-300 p-4">
              <p className="text-sm text-base-content/60">সর্বনিম্ন দাম</p>
              <p className="text-success">
                <span className="text-3xl font-bold">{toBn(cheapest.min)}</span> টাকা
              </p>
              <p className="text-xs text-base-content/60">
                {cheapest.market}, {cheapest.division}
              </p>
            </div>
            <div className="rounded-box border border-base-300 p-4">
              <p className="text-sm text-base-content/60">সর্বাধিক দাম</p>
              <p className="text-error">
                <span className="text-3xl font-bold">{toBn(dearest.max)}</span> টাকা
              </p>
              <p className="text-xs text-base-content/60">
                {dearest.market}, {dearest.division}
              </p>
            </div>
            <div className="rounded-box border border-base-300 p-4">
              <p className="text-sm text-base-content/60">গড় দাম</p>
              <p className="text-primary">
                <span className="text-3xl font-bold">{toBn(average)}</span> টাকা
              </p>
              <p className="text-xs text-base-content/60">প্রতি {unit}-এর হিসাবে, {toBn(markets.length)}টি বাজার থেকে</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table table-zebra">
              <thead>
                <tr className="text-base-content/70">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={market.market}>
                    <td className="whitespace-nowrap font-medium">{market.market}</td>
                    <td className="whitespace-nowrap">{market.division}</td>
                    <td className="whitespace-nowrap text-right">{formatAmount(market.min)} টাকা</td>
                    <td className="whitespace-nowrap text-right">{formatAmount(market.max)} টাকা</td>
                    <td className="whitespace-nowrap text-right font-semibold">{formatAmount(market.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/" className="btn btn-ghost btn-sm sm:btn-md">
          ← হোম পেজে ফিরে যান
        </Link>
        <Link href={`/category/${product.category}`} className="btn btn-primary btn-sm sm:btn-md">
          {product.categoryIcon} সব {product.categoryNameBn} দেখুন
        </Link>
      </div>
    </main>
  );
}