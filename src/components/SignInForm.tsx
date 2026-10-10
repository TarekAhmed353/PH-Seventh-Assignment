"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";
import SocialButtons from "./SocialButtons";

export default function SignInForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দুটোই লিখুন।");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(authErrorMessage(error));

    toast.success("সাইন ইন সফল হয়েছে!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body gap-4 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" required placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full" />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading && <span className="loading loading-spinner loading-sm" />}
            সাইন ইন
          </button>
        </form>

        <div className="divider my-0 text-xs text-base-content/60">অথবা</div>

        <SocialButtons redirectTo={redirectTo} />

        <p className="text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}