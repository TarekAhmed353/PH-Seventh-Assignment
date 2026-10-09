"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const active = pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            className={`btn btn-sm shrink-0 gap-1.5 font-semibold ${active ? "btn-primary" : "btn-ghost"}`}
          >
            <span>{category.icon}</span>
            {category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}