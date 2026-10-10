import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "সাইন ইন | বাজার দর" };

type Props = {
  searchParams: Promise<{ redirect?: string; reason?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const { redirect: target, reason } = await searchParams;
  const redirectTo = target && target.startsWith("/") && !target.startsWith("//") ? target : "/";

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect(redirectTo);

  const notice = reason === "protected" ? "এই পাতাটি দেখতে আগে সাইন ইন করুন।" : undefined;

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm text-base-content/70">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>
      <SignInForm redirectTo={redirectTo} notice={notice} />
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </main>
  );
}