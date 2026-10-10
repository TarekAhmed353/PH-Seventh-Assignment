"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

type Props = {
  user: { name: string; email: string; image?: string | null };
};

export default function UserMenu({ user }: Props) {
  const router = useRouter();

  function closeMenu() {
    (document.activeElement as HTMLElement | null)?.blur();
  }

  async function handleSignOut() {
    closeMenu();
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
    toast.success("সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm h-auto gap-2 px-1 py-1 sm:btn-md sm:h-auto sm:px-2">
        <Avatar name={user.name} image={user.image} size={36} />
        <span className="hidden max-w-28 truncate font-medium sm:inline">{user.name.split(" ")[0]}</span>
        <ChevronDown className="size-3.5 text-base-content/60" />
      </div>

      <div tabIndex={0} className="dropdown-content z-50 mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
        <div className="px-3 py-2">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs text-base-content/60">{user.email}</p>
        </div>
        <ul className="menu w-full p-0">
          <li>
            <Link href="/profile" onClick={closeMenu}>
              <UserRound className="size-4" />
              আমার প্রোফাইল
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleSignOut} className="text-error">
              <LogOut className="size-4" />
              সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}