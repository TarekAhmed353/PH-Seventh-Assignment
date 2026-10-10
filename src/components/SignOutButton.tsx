"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await authClient.signOut();
    setLoading(false);
    if (error) return toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
    toast.success("সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={loading} className="btn btn-outline btn-error btn-sm sm:btn-md">
      {loading ? <span className="loading loading-spinner loading-sm" /> : <LogOut className="size-4" />}
      সাইন আউট
    </button>
  );
}