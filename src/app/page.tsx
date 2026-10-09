export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">বাজার দর</h1>
      <p className="mt-2 text-base-content/70">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
      <div className="mt-4 flex items-center gap-3">
        <button className="btn btn-primary">সব পণ্য দেখুন</button>
        <span className="badge badge-soft badge-error">▲ ১২.৫%</span>
        <span className="badge badge-soft badge-success">▼ ৬.২%</span>
      </div>
    </main>
  );
}