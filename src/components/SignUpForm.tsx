"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name) return toast.error("আপনার নাম লিখুন।");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (password !== confirm) return toast.error("দুটি পাসওয়ার্ড মেলেনি।");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return toast.error(authErrorMessage(error));

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body gap-4 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">নাম</span>
            <input name="name" type="text" required placeholder="যেমন: রহিম উদ্দিন" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" required placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
            <input name="confirm" type="password" required placeholder="আবার লিখুন" className="input w-full" />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading && <span className="loading loading-spinner loading-sm" />}
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="divider my-0 text-xs text-base-content/60">অথবা</div>

        <SocialButtons />

        <p className="text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}