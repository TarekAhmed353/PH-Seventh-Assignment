import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
      <p className="text-6xl">🧺</p>
      <h1 className="mt-4 text-5xl font-bold text-primary">৪০৪</h1>
      <p className="mt-2 text-xl font-semibold">পাতাটি খুঁজে পাওয়া যায়নি</p>
      <p className="mt-1 max-w-md text-base-content/70">
        আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link href="/" className="btn btn-primary btn-sm mt-6 sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}