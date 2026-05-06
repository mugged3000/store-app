"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    label: "Summer Collection '26",
    heading: "Designed\nTo Stand Out.",
    sub: "Elevated essentials. Timeless fits.\nCrafted for comfort. Made for everyone.",
    mainSrc:  "/images/t-shirt1.png",
    mainAlt:  "Look 1 – Essential Hoodie",
    thumbSrc: "/images/t-shirt1.png",
  },
  {
    id: 2,
    label: "Summer Collection '26",
    heading: "Designed\nTo Stand Out.",
    sub: "Elevated essentials. Timeless fits.\nCrafted for comfort. Made for everyone.",
    mainSrc:  "/images/t-shirt2.png",
    mainAlt:  "Look 2 – Relaxed Sweatshirt",
    thumbSrc: "/images/t-shirt2.png",
  },
  {
    id: 3,
    label: "Summer Collection '26",
    heading: "Refined.\nUnrestrained.",
    sub: "Premium streetwear built for\neveryday movement.",
    mainSrc:  "/images/t-shirt3.png",
    mainAlt:  "Look 3 – Heavyweight Tee",
    thumbSrc: "/images/t-shirt3.png",
  },
  {
    id: 4,
    label: "Accessories Edit",
    heading: "The Details\nMatter Most.",
    sub: "Curated accessories to complete\nany look, any occasion.",
    mainSrc:  "/images/t-babe1.png",
    mainAlt:  "Look 4 – Canvas Tote",
    thumbSrc: "/images/t-babe1.png",
  },
  {
    id: 5,
    label: "Headwear Drop",
    heading: "Top It\nAll Off.",
    sub: "Caps and hats designed for\nthe modern minimalist.",
    mainSrc:  "/images/t-babe2.png",
    mainAlt:  "Look 5 – Classic Cap",
    thumbSrc: "/images/t-babe2.png",
  },
  {
    id: 6,
    label: "New Arrivals",
    heading: "Minimal.\nMaximal Impact.",
    sub: "Clean silhouettes. Quality materials.\nLasting style.",
    mainSrc:  "/images/t-babe3.png",
    mainAlt:  "Look 6 – Minimal Hoodie",
    thumbSrc: "/images/t-babe3.png",
  },
];

const TRUST_BASE = [
  { title: "Free Shipping",   sub: "On all orders over $150"       },
  { title: "Easy Returns",    sub: "30-day return policy"           },
  { title: "Secure Payment",  sub: "100% secure checkout"           },
  { title: "Premium Quality", sub: "Built to last, made to impress" },
  { title: "24/7 Support",    sub: "We're here to help"             },
];
const TRUST_ITEMS = [...TRUST_BASE, ...TRUST_BASE];

export default function HeroSection() {
  const [active,    setActive]    = useState(0);
  const [animating, setAnimating] = useState(false);

  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const lightRef   = useRef(null);
  const textRef    = useRef(null);
  const tickerRef  = useRef(null);
  const thumbsRef  = useRef([]);

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(lightRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.4 }, 0)
        .fromTo(imgRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.1 }, 0.1)
        .fromTo(Array.from(textRef.current?.children ?? []),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 0.45)
        .fromTo(thumbsRef.current.filter(Boolean),
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, duration: 0.38, stagger: 0.065 }, 0.52);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Light ray breathe ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.to(lightRef.current, {
      opacity: 0.55, scale: 1.08, duration: 3.8,
      ease: "sine.inOut", yoyo: true, repeat: -1,
    });
  }, []);

  // ── Ticker ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const track = tickerRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    const t = gsap.to(track, {
      x: -half, duration: 28, ease: "none", repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % half) },
    });
    return () => t.kill();
  }, []);

  // ── Slide switch ────────────────────────────────────────────────────────
  const goTo = useCallback((idx) => {
    if (animating || idx === active) return;
    setAnimating(true);
    gsap.to(imgRef.current, {
      opacity: 0, scale: 1.03, duration: 0.26, ease: "power2.in",
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(imgRef.current,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.48, ease: "power2.out",
            onComplete: () => setAnimating(false) });
      },
    });
  }, [animating, active]);

  const goNext = () => goTo((active + 1) % SLIDES.length);
  const goPrev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length);

 // ── Auto-slide (mobile only) ────────────────────────────────────────────
useEffect(() => {
  if (window.innerWidth >= 768) return;
  const timer = setInterval(() => {
    goNext();
  }, 4000);
  return () => clearInterval(timer);
}, [active, animating]);

  const slide = SLIDES[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0f0e0c] overflow-hidden"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      <div className="relative w-full h-[100dvh] min-h-[640px]">

        {/* Ambient light ray */}
        <div
          ref={lightRef}
          className="absolute pointer-events-none z-10"
          style={{
            top: "-8%", right: "18%",
            width: "clamp(280px, 40vw, 620px)",
            height: "clamp(280px, 40vw, 620px)",
            background: "radial-gradient(ellipse 58% 78% at 58% 22%, rgba(220,180,100,0.16) 0%, rgba(200,155,60,0.08) 32%, rgba(255,200,80,0.03) 60%, transparent 78%)",
            transform: "rotate(-26deg)",
            filter: "blur(3px)",
          }}
        />

        {/* ── MAIN HERO IMAGE ─────────────────────────────────────────────── */}
        <div ref={imgRef} className="absolute inset-0 z-0">
          <Image
            src={slide.mainSrc}
            alt={slide.mainAlt}
            fill priority
            className="object-cover object-[center_40%] scale-[1.05]"
            sizes="100vw"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(108deg, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.55) 42%, rgba(10,9,8,0.12) 72%, transparent 100%)" }} />
          <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to top, #0f0e0c, transparent)" }} />
        </div>

        {/* ── CONTENT ROW ─────────────────────────────────────────────────── */}
        <div className="relative z-20 h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* TEXT BLOCK */}
          <div ref={textRef} className="flex flex-col max-w-[540px] w-full">

            <p className="text-[#C9A84C] text-[10.5px] font-semibold tracking-[0.22em] uppercase mb-4 sm:mb-5" style={{ opacity: 0 }}>
              {slide.label}
            </p>

            <h1
              className="font-bold text-white mb-5 leading-[1.0]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(36px, 5.6vw, 84px)",
                letterSpacing: "-0.022em",
                opacity: 0,
                whiteSpace: "pre-line",
              }}
            >
              {slide.heading}
            </h1>

            <p className="text-white/50 text-[13px] sm:text-[14px] leading-relaxed font-light mb-8 sm:mb-9"
              style={{ opacity: 0, whiteSpace: "pre-line" }}>
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-3 mb-8 sm:mb-10" style={{ opacity: 0 }}>
              <button className="px-7 py-3 text-[10.5px] font-bold tracking-[0.15em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200">
                Shop New In
              </button>
              <button className="px-7 py-3 text-[10.5px] font-bold tracking-[0.15em] uppercase text-white border border-white/25 hover:border-white/55 hover:bg-white/5 active:scale-[0.98] transition-all duration-200">
                Explore Collections
              </button>
            </div>

            <div className="flex items-center gap-4" style={{ opacity: 0 }}>
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0f0e0c] bg-[#2a2520] overflow-hidden"
                    style={{ zIndex: 4 - i }}>
                    <Image src={`/images/avatar-${i}.png`} alt={`Customer ${i}`} width={32} height={32} className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10.5px] font-semibold text-white tracking-[0.06em] uppercase mb-0.5">
                  Join 20K+ Happy Customers
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={9.5} className="text-[#C9A84C] fill-[#C9A84C]" />)}
                  <span className="text-[10.5px] text-white/35 ml-1">4.9 (2.3K Reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── THUMBNAIL RAIL ───────────────────────────────────────────── */}
          <div className="hidden md:flex flex-col items-center gap-1.5 self-center shrink-0 ml-4">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                ref={(el) => (thumbsRef.current[idx] = el)}
                onClick={() => goTo(idx)}
                aria-label={`View look ${idx + 1}`}
                style={{ opacity: 0 }}
                className={[
                  "relative overflow-hidden shrink-0 transition-all duration-250 cursor-pointer",
                  "w-[58px] h-[68px] lg:w-[66px] lg:h-[76px]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]",
                  active === idx
                    ? "ring-[1.5px] ring-[#C9A84C] ring-offset-[2px] ring-offset-[#0f0e0c] opacity-100 scale-[1.03]"
                    : "opacity-40 hover:opacity-75 hover:scale-[1.02]",
                ].join(" ")}
              >
                <Image
                  src={slide.thumbSrc}
                  alt={`Look ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
                {active === idx && (
                  <div className="absolute inset-0 bg-[#C9A84C]/10" />
                )}
                <span
                  className="absolute bottom-1 right-1 text-[8px] font-bold text-white/60 tabular-nums leading-none"
                  style={{ fontFamily: "var(--font-syne)", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </button>
            ))}

            <div className="flex items-center gap-2 mt-1 pt-1.5 border-t border-white/[0.08] w-full justify-center">
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="text-white/30 hover:text-[#C9A84C] transition-colors duration-200 p-0.5"
              >
                <ChevronLeft size={11} strokeWidth={2} />
              </button>
              <span className="text-[9px] text-white/35 tracking-widest tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>
                {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="text-white/30 hover:text-[#C9A84C] transition-colors duration-200 p-0.5"
              >
                <ChevronRight size={11} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Mobile dots */}
          <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
            {SLIDES.map((_, idx) => (
              <button key={idx} onClick={() => goTo(idx)} aria-label={`Slide ${idx + 1}`}
                className={["rounded-full transition-all duration-300",
                  active === idx ? "w-5 h-1.5 bg-[#C9A84C]" : "w-1.5 h-1.5 bg-white/30"].join(" ")} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ TRUST BAR ══════════════════════════════════════════════════════════ */}
      <div className="relative w-full bg-[#141210] border-t border-white/[0.06] overflow-hidden py-[16px]">
        <div className="absolute inset-y-0 left-0 w-14 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #141210, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-14 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #141210, transparent)" }} />
        <div ref={tickerRef} className="flex items-center" style={{ width: "max-content" }}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="inline-flex items-center gap-3 px-7 sm:px-10 shrink-0">
              {i > 0 && <span className="w-px h-5 bg-white/[0.08] mr-6 shrink-0" />}
              <div>
                <p className="text-white text-[11px] font-semibold tracking-[0.07em] uppercase leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                  {item.title}
                </p>
                <p className="text-white/32 text-[10px] tracking-wide mt-0.5" style={{ fontFamily: "var(--font-syne)" }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}