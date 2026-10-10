import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateNameForm from "@/components/UpdateNameForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin?redirect=%2Fprofile%2Fupdate&reason=protected");

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div className="breadcrumbs text-sm text-base-content/70">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href="/profile">আমার প্রোফাইল</Link>
          </li>
          <li className="text-base-content">তথ্য আপডেট</li>
        </ul>
      </div>

      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-base-content/70">প্রোফাইলে যে নাম দেখাবে, সেটি এখানে বদলাতে পারবেন।</p>
      </div>

      <section className="rounded-box border border-base-300 bg-base-100 p-5">
        <h2 className="mb-4 text-lg font-semibold">তথ্য</h2>
        <UpdateNameForm currentName={session.user.name} />
      </section>
    </main>
  );
}