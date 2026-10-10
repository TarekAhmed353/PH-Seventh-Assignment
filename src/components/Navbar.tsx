import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { getCategories } from "@/lib/api";
import { auth } from "@/lib/auth";
import BanglaDate from "./BanglaDate";
import CategoryLinks from "./CategoryLinks";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const [categories, session] = await Promise.all([
    getCategories(),
    auth.api.getSession({ headers: await headers() }),
  ]);

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

        {session ? (
          <UserMenu user={{ name: session.user.name, email: session.user.email, image: session.user.image }} />
        ) : (
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      <div className="border-t border-base-300 bg-base-200/50">
        <CategoryLinks categories={categories} />
      </div>
    </header>
  );
}