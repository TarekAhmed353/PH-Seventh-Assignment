import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-10">
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
        <div className="max-w-xl text-center md:text-left">
          <BanglaDate className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-content" />
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-base-content/70 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম। বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm mt-6 sm:btn-md">
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-52 sm:w-64 md:w-72"
        />
      </div>
    </section>
  );
}