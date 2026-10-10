"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();

    if (!name) return toast.error("নাম খালি রাখা যাবে না।");
    if (name === currentName) return toast.error("আগের নামটিই আছে, নতুন একটি নাম লিখুন।");

    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) return toast.error(authErrorMessage(error));

    toast.success("আপনার তথ্য আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">নাম</span>
        <input
          name="name"
          type="text"
          required
          maxLength={50}
          defaultValue={currentName}
          placeholder="আপনার নাম লিখুন"
          className="input w-full"
        />
      </label>
      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading && <span className="loading loading-spinner loading-sm" />}
        আপডেট
      </button>
      <Link href="/profile" className="btn btn-ghost w-full">
        বাতিল করুন
      </Link>
    </form>
  );
}