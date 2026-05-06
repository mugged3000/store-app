"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function ContactHero() {
  const textRef  = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (textRef.current) {
      tl.fromTo(
        Array.from(textRef.current.children),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9 },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section
      className="relative w-full bg-[#0a0a0a] overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* BREADCRUMB */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 pt-16 sm:pt-20 pb-0">
        <nav
          className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <Link href="/" className="text-white/35 hover:text-white/65 transition-colors">
            Home
          </Link>
          <span className="text-white/20">{">"}</span>
          <span className="text-white/55">Contact Us</span>
        </nav>
      </div>

      {/* HERO LAYOUT */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between gap-8 py-10 sm:py-14">

        {/* LEFT: text */}
        <div ref={textRef} className="flex flex-col gap-4 max-w-[420px] z-10">
          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.02em",
            }}
          >
            Contact Us
          </h1>

          <p
            className="text-[#C9A84C] font-medium"
            style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(14px, 1.5vw, 18px)" }}
          >
            We are here to help.
          </p>

          <p
            className="text-white/45 leading-relaxed"
            style={{ fontFamily: "var(--font-syne)", fontSize: "13.5px", maxWidth: "340px" }}
          >
            Have a question, feedback, or just want to say hello? Fill out the
            form and we will get back to you as soon as possible.
          </p>
        </div>

        {/* RIGHT: hero image — replace src with your image path */}
        <div
          ref={imageRef}
          className="hidden sm:block relative flex-shrink-0"
          style={{ width: "clamp(280px, 42vw, 560px)", aspectRatio: "5/4" }}
        >
          <Image
            src="/images/telephone.png"
            alt="Contact Nexora"
            fill
            className="object-contain object-right-bottom"
            sizes="(max-width: 1024px) 40vw, 560px"
            priority
          />
        </div>
      </div>

      {/* bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}