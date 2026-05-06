"use client";

import Image from "next/image";

export default function UnisexBanner() {
  return (
    <section className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden">

      {/* IMAGE */}
      <Image
        src="/images/banner.png"
        alt="Unisex Collection"
        fill
        priority
        className="object-cover object-center"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TEXT (YOU CONTROL EVERYTHING HERE) */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-16">

        <div className="max-w-xl space-y-4">

          <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase">
            Unisex Collection
          </p>

          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
            Effortless style.
            <br />
            Designed for everyone.
          </h2>

          <p className="text-white/60 text-sm">
            Timeless essentials. Modern silhouettes.
          </p>

          <button className="
            mt-4
            border border-white/40
            px-6 py-3
            text-xs tracking-[0.15em] uppercase
            text-white
            hover:bg-white hover:text-black
            transition
          ">
            Shop Now
          </button>

        </div>

      </div>

    </section>
  );
}