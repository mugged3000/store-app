"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";

// 💡 Replace these with your real men's hero image paths in /public/images/
const HERO_IMG  = "/images/menset1.png";   // main full-bleed photo
const HERO_IMG2 = "/images/t-shirt1.png";  // accent/inset image (right panel)
const HERO_IMG3 = "/images/t-shirt2.png";  // second accent

const STATS = [
  { value: "180+", label: "Men's Styles" },
  { value: "6",    label: "Collections"  },
  { value: "4.9★", label: "Avg. Rating"  },
];

export default function MenHero() {
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const lightRef    = useRef(null);
  const tagRef      = useRef(null);
  const h1Ref       = useRef(null);
  const subRef      = useRef(null);
  const btnsRef     = useRef(null);
  const statsRef    = useRef(null);
  const panelRef    = useRef(null);
  const scrollRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // background
      tl.fromTo(bgRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }, 0)

      // light ray
      .fromTo(lightRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.5 }, 0.1)

      // right panel
      .fromTo(panelRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.85 }, 0.3)

      // text cascade
      .fromTo(tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 }, 0.55)
      .fromTo(h1Ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65 }, 0.68)
      .fromTo(subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 }, 0.82)
      .fromTo(btnsRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45 }, 0.94)
      .fromTo(statsRef.current?.children ?? [],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 1.05)
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }, 1.2);

      // scroll cue bounce
      gsap.to(scrollRef.current, {
        y: 6, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5,
      });

      // light breathe
      gsap.to(lightRef.current, {
        opacity: 0.5, scale: 1.1, duration: 4,
        ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0c0b09]"
      style={{ fontFamily: "var(--font-syne)", minHeight: "100dvh" }}
    >
      {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ opacity: 0 }}>
        {/* 💡 MEN HERO BG — replace HERO_IMG with your men's photo */}
        <Image
          src={HERO_IMG}
          alt="Men's Collection"
          fill priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        {/* dark left-side overlay so text is legible */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(8,7,6,0.92) 0%, rgba(8,7,6,0.65) 40%, rgba(8,7,6,0.20) 70%, transparent 100%)" }} />
        {/* bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0c0b09, transparent)" }} />
      </div>

      {/* ── LIGHT RAY ──────────────────────────────────────────────────── */}
      <div
        ref={lightRef}
        className="absolute pointer-events-none z-10"
        style={{
          top: "-10%", right: "28%",
          width: "clamp(240px, 35vw, 560px)",
          height: "clamp(240px, 35vw, 560px)",
          background: "radial-gradient(ellipse 55% 75% at 55% 20%, rgba(220,180,100,0.14) 0%, rgba(200,155,60,0.07) 36%, rgba(255,200,80,0.03) 62%, transparent 80%)",
          transform: "rotate(-30deg)",
          filter: "blur(3px)",
          opacity: 0,
        }}
      />

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6"
        style={{ minHeight: "100dvh", paddingTop: "clamp(80px, 12vh, 120px)", paddingBottom: "clamp(60px, 8vh, 80px)" }}>

        {/* ── LEFT: TEXT ─────────────────────────────────────────────── */}
        <div className="flex flex-col max-w-[560px] w-full">

          {/* Eyebrow tag */}
          <div ref={tagRef} className="flex items-center gap-3 mb-5 sm:mb-6" style={{ opacity: 0 }}>
            <span className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[10.5px] font-bold tracking-[0.24em] uppercase">
              Men's Collection · SS '26
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="text-white font-bold leading-[1.0] mb-5 sm:mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(44px, 6.2vw, 96px)",
              letterSpacing: "-0.025em",
              opacity: 0,
            }}
          >
            Built for the<br />
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Modern</em><br />
            Man.
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-white/52 text-[13.5px] sm:text-[15px] leading-[1.75] font-light mb-8 sm:mb-10 max-w-[420px]"
            style={{ opacity: 0 }}
          >
            Premium essentials, sharp silhouettes and timeless cuts —
            designed for those who move through the world with intent.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-wrap gap-3 mb-10 sm:mb-14" style={{ opacity: 0 }}>
            <Link
              href="#men-products"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase text-[#0c0b09] bg-[#C9A84C] hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200"
            >
              Shop Men's
              <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="#men-products"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase text-white border border-white/22 hover:border-white/50 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
            >
              View Lookbook
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex items-center gap-8 sm:gap-10 pt-6 border-t border-white/[0.08]">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-white font-bold text-[22px] sm:text-[26px] leading-none mb-1"
                  style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}>
                  {value}
                </p>
                <p className="text-white/38 text-[10px] tracking-[0.14em] uppercase font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: IMAGE PANEL ─────────────────────────────────────── */}
        <div
          ref={panelRef}
          className="hidden lg:flex flex-col gap-3 shrink-0 self-center"
          style={{ opacity: 0 }}
        >
          {/* Tall main card */}
          {/* 💡 Replace HERO_IMG2 with your men's editorial photo */}
          <div className="relative w-[220px] xl:w-[260px] h-[320px] xl:h-[380px] overflow-hidden bg-[#1a1814]">
            <Image src={HERO_IMG2} alt="Men look 1" fill className="object-cover object-top transition-transform duration-700 hover:scale-[1.04]" sizes="280px" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-[12px] font-semibold tracking-wider uppercase mb-0.5">Essential Hoodie</p>
              <p className="text-[#C9A84C] text-[11px] font-bold">$89.00</p>
            </div>
            <div className="absolute top-3 left-3 px-2 py-1 bg-[#C9A84C] text-[#1a1000] text-[8px] font-bold tracking-[0.1em] uppercase">NEW</div>
          </div>

          {/* Second smaller card */}
          {/* 💡 Replace HERO_IMG3 with your second men's product photo */}
          <div className="relative w-[220px] xl:w-[260px] h-[180px] xl:h-[210px] overflow-hidden bg-[#1a1814]">
            <Image src={HERO_IMG3} alt="Men look 2" fill className="object-cover object-top transition-transform duration-700 hover:scale-[1.04]" sizes="280px" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-[12px] font-semibold tracking-wider uppercase mb-0.5">Relaxed Sweatshirt</p>
              <p className="text-[#C9A84C] text-[11px] font-bold">$69.00</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── SCROLL CUE ─────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        style={{ opacity: 0 }}
      >
        <span className="text-white/28 text-[9px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
        <ChevronDown size={13} className="text-white/28" strokeWidth={2} />
      </div>
    </section>
  );
}