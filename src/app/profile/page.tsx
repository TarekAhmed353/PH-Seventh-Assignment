import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Pencil } from "lucide-react";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin?redirect=%2Fprofile&reason=protected");

  const { user } = session;
  const joined = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date(user.createdAt));

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={user.name} image={user.image} size={64} />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-base-content/60">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-box border border-base-300 bg-base-100 p-5">
        <h2 className="mb-2 text-lg font-semibold">তথ্য</h2>
        <dl className="divide-y divide-base-300 text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-base-content/60">নাম</dt>
            <dd className="text-right font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-base-content/60">ইমেইল</dt>
            <dd className="break-all text-right font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-base-content/60">সদস্য হয়েছেন</dt>
            <dd className="text-right font-medium">{joined}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-4 w-full">
          <Pencil className="size-4" />
          তথ্য আপডেট করুন
        </Link>
      </section>
    </main>
  );
}