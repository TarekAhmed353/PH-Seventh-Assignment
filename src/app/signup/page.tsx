import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "সাইন আপ | বাজার দর" };

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-base-content/70">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>
      <SignUpForm />
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </main>
  );
}