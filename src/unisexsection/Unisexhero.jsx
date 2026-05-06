"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { HERO_SLIDES } from "@/unisexsection/Unisexdata";

// ─── FEATURE STRIP DATA ───────────────────────────────────────────────────────
const TimelessIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const PremiumIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ComfortIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const MoveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const GlobalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const FEATURES = [
  { icon: <TimelessIcon />, title: "Timeless Design",    sub: "Built to last." },
  { icon: <PremiumIcon />,  title: "Premium Materials",  sub: "Feel the difference." },
  { icon: <ComfortIcon />,  title: "Everyday Comfort",   sub: "For any moment." },
  { icon: <MoveIcon />,     title: "Made to Move",       sub: "Live in it. All day." },
  { icon: <ShieldIcon />,   title: "Ethically Made",     sub: "With care. Always." },
  { icon: <GlobalIcon />,   title: "Global Craft",       sub: "Made for everyone." },
];

// doubled for seamless infinite marquee
const MARQUEE_ITEMS = [...FEATURES, ...FEATURES];

// ─── MEGA LEAF SVG ────────────────────────────────────────────────────────────
const MegaLeaf = () => (
  <svg
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-[-40px] top-[-60px] h-[115%] w-[72%] pointer-events-none"
    preserveAspectRatio="xMaxYMid meet"
  >
    <defs>
      <radialGradient id="leafGlow" cx="60%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#2a4a22" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0d1a0d" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient glow */}
    <ellipse cx="700" cy="420" rx="380" ry="460" fill="url(#leafGlow)" />

    {/* MAIN BIG LEAF */}
    <path
      d="M1000 -80 C870 20 720 40 640 200 C560 360 580 540 660 650 C740 760 890 790 970 720 C1050 650 1060 520 1020 400 C990 310 980 140 1000 -80Z"
      fill="#1e3a1c" opacity="0.98"
    />
    <path d="M880 -30 C870 150 860 320 900 500 C920 590 940 660 950 700"
      stroke="#2d5228" strokeWidth="2.5" fill="none" opacity="0.7" />
    <line x1="866" y1="180" x2="940" y2="230" stroke="#2d5228" strokeWidth="1.3" opacity="0.5" />
    <line x1="862" y1="300" x2="950" y2="350" stroke="#2d5228" strokeWidth="1.3" opacity="0.5" />
    <line x1="874" y1="410" x2="960" y2="455" stroke="#2d5228" strokeWidth="1.3" opacity="0.5" />
    <line x1="888" y1="510" x2="960" y2="550" stroke="#2d5228" strokeWidth="1.2" opacity="0.45" />

    {/* SECOND LEAF — behind */}
    <path
      d="M980 -150 C850 -40 720 -10 660 170 C600 340 625 490 700 575 C775 660 880 660 940 595 C1000 530 1020 410 990 300 C975 225 970 60 980 -150Z"
      fill="#162b15" opacity="0.85"
    />

    {/* THIRD LEAF — foreground */}
    <path
      d="M1000 120 C930 170 880 250 890 370 C900 480 950 550 990 590 C1020 620 1060 600 1070 560 C1090 500 1080 410 1050 330 C1030 270 1010 200 1000 120Z"
      fill="#253e24" opacity="0.9"
    />
    <path d="M1005 140 C998 230 996 320 1010 420 C1020 490 1030 540 1040 570"
      stroke="#3a5e38" strokeWidth="1.8" fill="none" opacity="0.6" />

    {/* FOURTH LEAF — lower cluster */}
    <path
      d="M980 600 C920 640 880 720 890 810 C900 890 950 940 1000 960 C1040 975 1070 940 1065 900 C1060 840 1040 770 1010 710 C990 660 985 630 980 600Z"
      fill="#1a2f1a" opacity="0.92"
    />

    {/* FIFTH LEAF — lower-right sweep */}
    <path
      d="M1000 750 C930 760 860 790 820 860 C790 920 810 980 860 1000 L1000 1000Z"
      fill="#1e351c" opacity="0.88"
    />

    {/* Tiny accent leaves */}
    <path
      d="M950 -80 C910 -30 900 60 930 130 C950 175 975 170 985 140 C1000 100 995 20 950 -80Z"
      fill="#2a4624" opacity="0.75"
    />
    <path
      d="M930 200 C900 230 895 290 920 330 C935 352 952 348 958 325 C968 295 960 250 930 200Z"
      fill="#1f3b1d" opacity="0.7"
    />

    {/* Deep shadow stems */}
    <path d="M820 -100 C815 50 820 200 840 350 C855 460 870 560 890 640"
      stroke="#162814" strokeWidth="3" fill="none" opacity="0.5" />
    <path d="M870 500 C850 580 845 660 860 740 C870 790 890 830 910 860"
      stroke="#1f3a1d" strokeWidth="2.5" fill="none" opacity="0.4" />

    {/* Texture dots */}
    <circle cx="720" cy="350" r="3" fill="#2a4a22" opacity="0.3" />
    <circle cx="760" cy="430" r="2" fill="#2a4a22" opacity="0.25" />
    <circle cx="800" cy="290" r="2.5" fill="#2a4a22" opacity="0.28" />
  </svg>
);

// ─── PREMIUM IMAGE FRAME ──────────────────────────────────────────────────────
const ImageFrame = ({ slide, index }) => (
  <div
    className="absolute z-[3]"
    style={{
      right: "6%",
      top: "50%",
      transform: "translateY(-50%)",
      width: "clamp(300px, 38%, 520px)",
      aspectRatio: "3/4",
    }}
  >
    {/* Corner bracket deco */}
    <div className="absolute pointer-events-none z-[2]" style={{ inset: "-18px" }}>
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-12 h-12"
        style={{ borderTop: "1.5px solid #C9A84C", borderLeft: "1.5px solid #C9A84C", opacity: 0.8 }} />
      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0 w-12 h-12"
        style={{ borderBottom: "1.5px solid #C9A84C", borderRight: "1.5px solid #C9A84C", opacity: 0.8 }} />
    </div>

    {/* Extra thin deco lines */}
    <div className="absolute z-[2]" style={{ top: "-18px", right: "30px", width: "1px", height: "52px", background: "rgba(201,168,76,0.22)" }} />
    <div className="absolute z-[2]" style={{ bottom: "30px", right: "-18px", width: "52px", height: "1px", background: "rgba(201,168,76,0.22)" }} />

    {/* Main card */}
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#1a1a14" }}>
      {/* Left blend */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to right, #0f0f0f 0%, transparent 28%)" }} />

      {/* Gold stripe left edge */}
      <div className="absolute top-0 bottom-0 left-0 z-[3]"
        style={{
          width: "3px",
          background: "linear-gradient(to bottom, transparent, #C9A84C 30%, #C9A84C 70%, transparent)",
          opacity: 0.6,
        }} />

      {/* SS badge top-right */}
      <div className="absolute top-4 right-4 z-[4]"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: "0.5px solid rgba(201,168,76,0.3)",
          backdropFilter: "blur(6px)",
          padding: "5px 10px",
          fontSize: "8px",
          letterSpacing: "0.25em",
          color: "#C9A84C",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "var(--font-syne)",
        }}>
        SS / 2025
      </div>

      {/* Collection label bottom-left */}
      <div className="absolute bottom-5 left-5 z-[4] flex flex-col gap-1">
        <span style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#C9A84C",
          fontWeight: 600,
          fontFamily: "var(--font-syne)",
        }}>
          No. {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "15px",
          color: "rgba(255,255,255,0.85)",
          fontWeight: 300,
          letterSpacing: "0.04em",
        }}>
          {slide.heading} Collection
        </span>
      </div>

      {/* The actual image */}
      <Image
        src="/images/unisex.png"
        alt="Unisex collection"
        fill
        className="object-cover object-top"
        style={{ mixBlendMode: "luminosity", filter: "contrast(1.05) brightness(0.92)" }}
        priority
      />
    </div>
  </div>
);

// ─── MAIN HERO ────────────────────────────────────────────────────────────────
export default function UnisexHero() {
  const containerRef = useRef(null);
  const tagRef       = useRef(null);
  const h1Ref        = useRef(null);
  const subRef       = useRef(null);
  const bodyRef      = useRef(null);
  const btnsRef      = useRef(null);
  const stripRef     = useRef(null);
  const imageRef     = useRef(null);
  const progressRef  = useRef(null);
  const intervalRef  = useRef(null);

  const [current, setCurrent] = useState(0);
  const TOTAL    = HERO_SLIDES.length;
  const DURATION = 5000;

  // ── Entrance animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(imageRef.current,
          { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.3, ease: "power2.out" })
        .fromTo(tagRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.9")
        .fromTo(h1Ref.current,
          { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, "-=0.6")
        .fromTo(subRef.current,
          { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.6")
        .fromTo(bodyRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(btnsRef.current,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
        .fromTo(stripRef.current,
          { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ── Copy cross-fade ────────────────────────────────────────────────────────
  const animateCopyOut = useCallback(() =>
    gsap.to([tagRef.current, h1Ref.current, subRef.current, bodyRef.current], {
      y: -16, opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.04,
    }), []);

  const animateCopyIn = useCallback((slide) => {
    if (tagRef.current)  tagRef.current.textContent  = slide.tag;
    if (h1Ref.current)   h1Ref.current.textContent   = slide.heading;
    if (subRef.current)  subRef.current.textContent  = slide.sub;
    if (bodyRef.current) bodyRef.current.innerHTML   = slide.body.join("<br />");
    gsap.fromTo(
      [tagRef.current, h1Ref.current, subRef.current, bodyRef.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.06, delay: 0.05 },
    );
  }, []);

  // ── Slide transition ───────────────────────────────────────────────────────
  const goTo = useCallback((next) => {
    if (next === current) return;
    animateCopyOut().then(() => animateCopyIn(HERO_SLIDES[next]));
    setCurrent(next);
  }, [current, animateCopyOut, animateCopyIn]);

  // ── Progress bar ───────────────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(progressRef.current, { scaleX: 1, duration: DURATION / 1000, ease: "none" });
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % TOTAL;
        goTo(next);
        return next;
      });
    }, DURATION);
  }, [goTo, TOTAL]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(intervalRef.current);
  }, [resetTimer]);

  const handleDotClick = (idx) => { goTo(idx); resetTimer(); };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0f0f0f]"
      style={{ minHeight: "92vh" }}
    >
      {/* ── MEGA LEAF ── */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <MegaLeaf />
      </div>

      {/* ── GRADIENT OVERLAYS ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        background: "linear-gradient(to right, #0f0f0f 22%, rgba(15,15,15,0.82) 48%, rgba(15,15,15,0.18) 72%, transparent 88%)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        zIndex: 2,
        height: "42%",
        background: "linear-gradient(to top, #0f0f0f, transparent)",
      }} />
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        zIndex: 2,
        height: "22%",
        background: "linear-gradient(to bottom, #0f0f0f, transparent)",
      }} />

      {/* ── PREMIUM IMAGE FRAME ── */}
      <div ref={imageRef} style={{ opacity: 0 }}>
        <ImageFrame slide={HERO_SLIDES[current]} index={current} />
      </div>

      {/* ── COPY BLOCK ── */}
      <div
        className="relative flex flex-col justify-center h-full px-8 md:px-16 lg:px-20 pt-10 pb-36"
        style={{ zIndex: 4, minHeight: "92vh", maxWidth: "540px" }}
      >
        {/* Tag line */}
        <p
          ref={tagRef}
          className="opacity-0 mb-6 flex items-center gap-2.5"
          style={{
            fontSize: "9px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            fontWeight: 600,
            fontFamily: "var(--font-syne)",
          }}
        >
          <span style={{ display: "block", width: "28px", height: "1px", background: "#C9A84C", opacity: 0.7 }} />
          {HERO_SLIDES[0].tag}
        </p>

        <h1
          ref={h1Ref}
          className="opacity-0 text-white font-light leading-none mb-5"
          style={{
            fontSize: "clamp(72px, 9vw, 116px)",
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-playfair)",
          }}
        >
          {HERO_SLIDES[0].heading}
        </h1>

        <p
          ref={subRef}
          className="opacity-0 text-white font-light mb-4"
          style={{
            fontSize: "clamp(18px, 2vw, 22px)",
            fontFamily: "var(--font-syne)",
            letterSpacing: "0.01em",
          }}
        >
          {HERO_SLIDES[0].sub}
        </p>

        <p
          ref={bodyRef}
          className="opacity-0 text-sm leading-relaxed mb-10"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-syne)" }}
          dangerouslySetInnerHTML={{ __html: HERO_SLIDES[0].body.join("<br />") }}
        />

        <div ref={btnsRef} className="opacity-0 flex flex-wrap gap-4">
          <button
            className="transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{
              padding: "14px 28px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "#C9A84C",
              color: "#111",
              border: "none",
              fontFamily: "var(--font-syne)",
              cursor: "pointer",
            }}
          >
            Shop Collection
          </button>
          <button
            className="transition-all duration-200 hover:bg-white hover:text-[#111] active:scale-[0.98]"
            style={{
              padding: "14px 28px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.28)",
              fontFamily: "var(--font-syne)",
              cursor: "pointer",
            }}
          >
            View Lookbook
          </button>
        </div>
      </div>

      {/* ── SLIDE DOTS ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5" style={{ zIndex: 5 }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="flex items-center justify-center"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span
              className="block transition-all duration-500"
              style={{
                width: "2px",
                height: current === i ? "32px" : "18px",
                background: current === i ? "#C9A84C" : "rgba(255,255,255,0.22)",
                borderRadius: "1px",
              }}
            />
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-[84px] left-8 md:left-20" style={{ zIndex: 5, fontFamily: "var(--font-syne)" }}>
        <span className="text-[10px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.22)" }}>
          <span style={{ color: "#C9A84C", fontWeight: 700 }}>{String(current + 1).padStart(2, "0")}</span>
          {" / "}
          {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* Auto-play progress bar */}
      <div
        className="absolute bottom-[72px] left-0 right-0"
        style={{ zIndex: 5, height: "1px", background: "rgba(255,255,255,0.06)" }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "#C9A84C",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* ── FEATURE MARQUEE STRIP ── */}
      <div
        ref={stripRef}
        className="absolute bottom-0 left-0 right-0 opacity-0 overflow-hidden"
        style={{
          zIndex: 6,
          height: "72px",
          backgroundColor: "rgba(12,11,8,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Pause on hover via CSS — add group class and group-hover:[animation-play-state:paused] */}
        <div
          className="flex items-center h-full"
          style={{
            width: "max-content",
            animation: "marquee 32s linear infinite",
          }}
        >
          {MARQUEE_ITEMS.map(({ icon, title, sub }, i) => (
            <div
              key={i}
              className="flex items-center gap-3 h-full flex-shrink-0"
              style={{
                padding: "0 48px",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex-shrink-0">{icon}</div>
              <div>
                <p style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-syne)",
                  margin: 0,
                }}>
                  {title}
                </p>
                <p style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.32)",
                  marginTop: "2px",
                  fontFamily: "var(--font-syne)",
                  margin: 0,
                }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE KEYFRAME (inject once) ── */}
      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}