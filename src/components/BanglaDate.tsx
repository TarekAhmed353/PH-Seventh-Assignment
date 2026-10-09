"use client";

import { useSyncExternalStore } from "react";
import { bnDate } from "@/lib/format";

const subscribe = () => () => {};

export default function BanglaDate({ className = "" }: { className?: string }) {
  const date = useSyncExternalStore(subscribe, bnDate, () => "");

  return <span className={`inline-block min-h-4 ${className}`}>{date}</span>;
}