import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import BanglaDate from "./BanglaDate";
import CategoryLinks from "./CategoryLinks";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary p-1.5 sm:size-12">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold sm:text-xl">বাজার দর</span>
            <BanglaDate className="text-xs text-base-content/70" />
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="border-t border-base-300 bg-base-200/50">
        <CategoryLinks categories={categories} />
      </div>
    </header>
  );
}