"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

// ── Replace with your real women's image paths ────────────────────────────────
const HERO_IMG  = "/images/womenset1.png";
const HERO_IMG2 = "/images/women-look1.png";

const STATS = [
  { value: "240+", label: "Women's Styles" },
  { value: "8",    label: "Collections"    },
  { value: "4.9★", label: "Avg. Rating"    },
];

// ─── WARM BOTANICAL SVG — light brown/sand rose tones ─────────────────────────
const BotanicalBg = () => (
  <svg
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute pointer-events-none"
    style={{ right: "-50px", top: "-70px", width: "74%", height: "118%", opacity: 1 }}
    preserveAspectRatio="xMaxYMid meet"
  >
    <defs>
      <radialGradient id="warmGlow" cx="55%" cy="38%" r="55%">
        <stop offset="0%"   stopColor="#8b6040" stopOpacity="0.45" />
        <stop offset="60%"  stopColor="#5a3a20" stopOpacity="0.2"  />
        <stop offset="100%" stopColor="#2a1a08" stopOpacity="0"    />
      </radialGradient>
    </defs>

    {/* Ambient warm glow */}
    <ellipse cx="650" cy="400" rx="420" ry="500" fill="url(#warmGlow)" />

    {/* MAIN LARGE ROSE — upper right — warm brown/sand tones */}
    <path d="M790 60 C835 5 920 -5 958 58 C995 118 972 205 918 235 C865 262 800 240 768 188 C748 150 755 105 790 60Z"
      fill="#6b4020" opacity="0.88" />
    <path d="M875 38 C935 -5 995 18 1005 82 C1015 128 990 180 948 196 C905 212 865 185 850 148 C836 112 840 68 875 38Z"
      fill="#5a3218" opacity="0.82" />
    <path d="M950 105 C1000 65 1030 108 1018 165 C1006 208 970 228 944 212 C918 196 912 165 928 138 C935 124 942 114 950 105Z"
      fill="#7a4c28" opacity="0.85" />
    <path d="M728 155 C750 82 815 52 866 94 C906 128 904 192 872 228 C840 260 788 260 758 232 C732 210 720 180 728 155Z"
      fill="#604028" opacity="0.78" />
    <path d="M768 275 C790 210 855 200 892 242 C922 275 915 328 884 352 C852 375 805 366 778 340 C756 318 752 295 768 275Z"
      fill="#6b4428" opacity="0.75" />
    <path d="M838 138 C864 102 906 103 924 134 C938 158 926 192 903 206 C878 220 846 210 832 187 C820 168 820 155 838 138Z"
      fill="#8b5830" opacity="0.92" />
    <path d="M876 168 C896 145 920 152 928 176 C934 196 922 218 904 222 C884 226 866 212 862 193 C858 178 862 182 876 168Z"
      fill="#9e6838" opacity="0.9" />
    <ellipse cx="894" cy="188" rx="26" ry="24" fill="#b07840" opacity="0.95" />
    <ellipse cx="894" cy="188" rx="15" ry="13" fill="#c48848" opacity="0.88" />
    <ellipse cx="894" cy="188" rx="7"  ry="6"  fill="#d4a055" opacity="0.92" />
    <circle cx="887" cy="184" r="2.2" fill="#e8be78" opacity="0.72" />
    <circle cx="900" cy="182" r="1.8" fill="#e8be78" opacity="0.65" />
    <circle cx="894" cy="178" r="1.5" fill="#f0cc88" opacity="0.62" />
    <circle cx="882" cy="192" r="1.5" fill="#e8be78" opacity="0.55" />
    <circle cx="905" cy="194" r="1.8" fill="#d4a055" opacity="0.5"  />

    {/* SECOND ROSE — mid right */}
    <path d="M905 375 C948 322 1008 332 1016 390 C1024 436 994 478 958 488 C922 498 886 474 874 444 C863 418 870 400 905 375Z"
      fill="#5a3218" opacity="0.85" />
    <path d="M852 416 C878 368 930 368 946 410 C958 442 944 476 916 486 C888 496 860 478 852 452 C844 430 844 438 852 416Z"
      fill="#6b4020" opacity="0.8" />
    <path d="M924 408 C950 386 975 402 972 430 C970 453 948 468 930 460 C912 453 906 434 915 415 C918 410 920 408 924 408Z"
      fill="#7a4c28" opacity="0.88" />
    <ellipse cx="932" cy="438" rx="20" ry="18" fill="#9e6838" opacity="0.92" />
    <ellipse cx="932" cy="438" rx="11" ry="9"  fill="#c48848" opacity="0.82" />
    <ellipse cx="932" cy="438" rx="5"  ry="4"  fill="#d4a055" opacity="0.88" />
    <circle cx="926" cy="434" r="1.8" fill="#e8be78" opacity="0.6" />
    <circle cx="938" cy="432" r="1.5" fill="#e8be78" opacity="0.55" />

    {/* THIRD SMALL ROSE — lower */}
    <path d="M822 658 C864 606 936 612 950 668 C962 715 934 756 898 766 C862 776 826 750 815 720 C804 692 802 688 822 658Z"
      fill="#5a3218" opacity="0.82" />
    <path d="M878 636 C914 602 960 620 963 664 C966 698 942 728 914 732 C886 736 860 714 858 690 C856 668 860 658 878 636Z"
      fill="#6b4020" opacity="0.78" />
    <ellipse cx="906" cy="688" rx="22" ry="20" fill="#8b5830" opacity="0.9" />
    <ellipse cx="906" cy="688" rx="11" ry="10" fill="#c48848" opacity="0.8" />
    <ellipse cx="906" cy="688" rx="5"  ry="4"  fill="#d4a055" opacity="0.85" />

    {/* STEMS & LEAVES */}
    <path d="M893 210 C886 285 874 365 862 445 C850 525 840 614 835 705"
      stroke="#3a2010" strokeWidth="2.8" fill="none" opacity="0.65" />
    <path d="M876 308 C834 276 796 298 792 338 C788 372 820 388 848 366 C866 352 874 330 876 308Z"
      fill="#3a2410" opacity="0.72" />
    <path d="M876 308 C854 336 840 355 848 366" stroke="#4a3018" strokeWidth="1.5" fill="none" opacity="0.55" />
    <path d="M868 418 C910 392 942 410 944 450 C946 482 920 494 896 478 C876 464 866 442 868 418Z"
      fill="#3a2410" opacity="0.68" />
    <path d="M868 418 C888 442 896 464 896 478" stroke="#4a3018" strokeWidth="1.5" fill="none" opacity="0.52" />
    <path d="M847 552 C815 530 802 550 806 577 C810 600 830 608 844 595 C854 585 850 568 847 552Z"
      fill="#3a2410" opacity="0.6" />

    {/* SCATTERED PETALS */}
    <ellipse cx="705" cy="148" rx="20" ry="11" fill="#7a4c28" opacity="0.48" transform="rotate(-28 705 148)" />
    <ellipse cx="648" cy="295" rx="15" ry="8"  fill="#6b4020" opacity="0.4"  transform="rotate(18 648 295)"  />
    <ellipse cx="752" cy="475" rx="17" ry="9"  fill="#8b5830" opacity="0.36" transform="rotate(-42 752 475)" />
    <ellipse cx="675" cy="598" rx="13" ry="7"  fill="#5a3218" opacity="0.42" transform="rotate(32 675 598)"  />
    <ellipse cx="718" cy="748" rx="22" ry="12" fill="#6b4020" opacity="0.38" transform="rotate(-18 718 748)" />
    <ellipse cx="798" cy="825" rx="16" ry="9"  fill="#7a4c28" opacity="0.33" transform="rotate(22 798 825)"  />
    <ellipse cx="598" cy="418" rx="11" ry="6"  fill="#8b5830" opacity="0.32" transform="rotate(-58 598 418)" />
    <ellipse cx="625" cy="698" rx="14" ry="7"  fill="#5a3218" opacity="0.36" transform="rotate(44 625 698)"  />
    <ellipse cx="962" cy="298" rx="12" ry="6"  fill="#6b4020" opacity="0.45" transform="rotate(-22 962 298)" />
    <ellipse cx="972" cy="558" rx="17" ry="9"  fill="#5a3218" opacity="0.4"  transform="rotate(12 972 558)"  />
    <circle cx="682" cy="218" r="4" fill="#9e6838" opacity="0.32" />
    <circle cx="722" cy="388" r="3" fill="#8b5830" opacity="0.28" />
    <circle cx="658" cy="538" r="5" fill="#7a4c28" opacity="0.26" />
    <circle cx="748" cy="648" r="3" fill="#6b4020" opacity="0.3"  />
    <circle cx="818" cy="758" r="4" fill="#9e6838" opacity="0.28" />

    {/* TOP BUD */}
    <path d="M812 -28 C828 -60 858 -54 862 -18 C866 10 846 30 826 24 C808 18 802 -4 812 -28Z"
      fill="#6b4020" opacity="0.75" />
    <path d="M838 -54 C848 -76 866 -68 864 -44 C862 -24 848 -10 836 -14 C825 -18 826 -36 838 -54Z"
      fill="#5a3218" opacity="0.68" />
    <line x1="834" y1="24" x2="854" y2="88" stroke="#3a2010" strokeWidth="2" opacity="0.52" />
    <path d="M842 56 C822 42 815 56 820 72 C824 84 838 84 844 72 C847 62 845 58 842 56Z"
      fill="#3a2410" opacity="0.58" />
  </svg>
);

// ─── FEATURE MARQUEE ──────────────────────────────────────────────────────────
const FEATURES = [
  { label: "Curated Femininity"    },
  { label: "Premium Fabrics"       },
  { label: "Tailored Silhouettes"  },
  { label: "Elevated Essentials"   },
  { label: "Ethically Crafted"     },
  { label: "Limited Drops"         },
];
const MARQUEE_ITEMS = [...FEATURES, ...FEATURES, ...FEATURES];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WomenHero() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const botanRef   = useRef(null);
  const tagRef     = useRef(null);
  const h1Ref      = useRef(null);
  const subRef     = useRef(null);
  const btnsRef    = useRef(null);
  const statsRef   = useRef(null);
  const cardRef    = useRef(null);
  const stripRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        .fromTo(bgRef.current,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4 }, 0)
        .fromTo(botanRef.current,
          { opacity: 0, x: 55, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 1.7, ease: "power2.out" }, 0.1)
        .fromTo(cardRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.0 }, 0.4)
        .fromTo(tagRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 }, 0.62)
        .fromTo(h1Ref.current?.children ?? [],
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.78, stagger: 0.14 }, 0.74)
        .fromTo(subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 }, 1.08)
        .fromTo(btnsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 }, 1.2)
        .fromTo(statsRef.current?.children ?? [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.09 }, 1.3)
        .fromTo(stripRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 }, 1.42);

      // Botanical gentle float
      gsap.to(botanRef.current, {
        y: -12, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100dvh", background: "#0f0c09", fontFamily: "var(--font-syne)" }}
    >
      {/* ── BACKGROUND IMAGE ──────────────────────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0 z-0" style={{ opacity: 0 }}>
        <Image
          src={HERO_IMG}
          alt="Women's Collection"
          fill priority
          className="object-cover object-[center_15%]"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(115deg, rgba(15,12,9,0.96) 0%, rgba(15,12,9,0.74) 38%, rgba(15,12,9,0.3) 65%, transparent 100%)",
        }} />
        {/* Warm brown colour wash */}
        <div className="absolute inset-0" style={{
          background: "rgba(90,55,20,0.22)",
          mixBlendMode: "multiply",
        }} />
        <div className="absolute bottom-0 inset-x-0 h-44 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0f0c09, transparent)" }} />
        <div className="absolute top-0 inset-x-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0f0c09, transparent)" }} />
      </div>

      {/* ── BOTANICAL LAYER ───────────────────────────────────────────────── */}
      <div
        ref={botanRef}
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
        style={{ opacity: 0 }}
      >
        <BotanicalBg />
      </div>

      {/* Warm ambient bloom */}
      <div className="absolute pointer-events-none z-[2]" style={{
        top: "-10%", right: "18%",
        width: "clamp(300px, 42vw, 660px)",
        height: "clamp(300px, 42vw, 660px)",
        background: "radial-gradient(ellipse 60% 70% at 58% 28%, rgba(160,100,45,0.1) 0%, rgba(120,70,25,0.05) 48%, transparent 78%)",
        filter: "blur(5px)",
      }} />

      {/* ── MAIN LAYOUT ───────────────────────────────────────────────────── */}
      <div
        className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16"
        style={{
          minHeight: "100dvh",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gridTemplateRows: "1fr auto",
          alignItems: "center",
          paddingTop: "clamp(90px, 13vh, 132px)",
          paddingBottom: "clamp(90px, 10vh, 104px)",
          gap: "0 52px",
        }}
      >

        {/* ── LEFT COPY ─────────────────────────────────────────────────── */}
        <div className="flex flex-col max-w-[560px] w-full" style={{ gridColumn: 1, gridRow: 1 }}>

          {/* Eyebrow */}
          <div ref={tagRef} className="flex items-center gap-3 mb-6" style={{ opacity: 0 }}>
            <span style={{ display: "block", width: "28px", height: "1px", background: "#C9A84C" }} />
            <span style={{
              color: "#C9A84C",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}>
              Women's Collection · SS '26
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(48px, 6.5vw, 100px)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "26px",
            }}
          >
            <span style={{ display: "block", opacity: 0 }}>She moves</span>
            <span style={{ display: "block", opacity: 0 }}>
              with{" "}
              <em style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "transparent",
                WebkitTextStroke: "1px #C9A84C",
              }}>
                grace.
              </em>
            </span>
            <span style={{
              display: "block",
              opacity: 0,
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.6em",
              fontWeight: 300,
              marginTop: "8px",
              letterSpacing: "-0.01em",
            }}>
              Dressed in intention.
            </span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              lineHeight: 1.9,
              fontWeight: 300,
              maxWidth: "400px",
              marginBottom: "38px",
              opacity: 0,
            }}
          >
            Refined silhouettes for every moment — crafted for the woman who
            knows exactly who she is and dresses accordingly.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-wrap gap-3 mb-12" style={{ opacity: 0 }}>
            <Link
              href="#women-products"
              className="group inline-flex items-center gap-2 transition-all duration-200 active:scale-[0.98]"
              style={{
                padding: "14px 30px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "#C9A84C",
                color: "#111",
                textDecoration: "none",
              }}
            >
              Shop Women's
              <ArrowRight size={11} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="#women-lookbook"
              className="inline-flex items-center transition-all duration-200 hover:bg-white/5 active:scale-[0.98]"
              style={{
                padding: "14px 30px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
              }}
            >
              View Lookbook
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex items-center gap-10 pt-6"
            style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 400,
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "5px",
                  letterSpacing: "-0.02em",
                }}>
                  {value}
                </p>
                <p style={{
                  fontSize: "9px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  fontWeight: 600,
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — SINGLE PREMIUM CARD ───────────────────────────────── */}
        <div
          ref={cardRef}
          className="hidden lg:block shrink-0 self-center"
          style={{ opacity: 0, gridColumn: 2, gridRow: 1 }}
        >
          {/* Outer frame wrapper */}
          <div style={{ position: "relative", padding: "18px" }}>
            {/* Top-left corner bracket */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: "52px", height: "52px",
              borderTop: "1px solid rgba(201,168,76,0.65)",
              borderLeft: "1px solid rgba(201,168,76,0.65)",
            }} />
            {/* Bottom-right corner bracket */}
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: "52px", height: "52px",
              borderBottom: "1px solid rgba(201,168,76,0.65)",
              borderRight: "1px solid rgba(201,168,76,0.65)",
            }} />
            {/* Extra deco lines */}
            <div style={{
              position: "absolute", top: 0, right: "40px",
              width: "1px", height: "42px",
              background: "rgba(201,168,76,0.2)",
            }} />
            <div style={{
              position: "absolute", bottom: "40px", left: 0,
              width: "42px", height: "1px",
              background: "rgba(201,168,76,0.2)",
            }} />

            {/* CARD */}
            <div style={{
              position: "relative",
              width: "clamp(230px, 20vw, 295px)",
              height: "clamp(360px, 55vh, 480px)",
              background: "#1c1510",
              overflow: "hidden",
            }}>
              <Image
                src={HERO_IMG2}
                alt="Women's look"
                fill
                className="object-cover object-top"
                sizes="310px"
              />

              {/* Gradient overlays */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(15,12,9,0.92) 0%, rgba(15,12,9,0.12) 55%, transparent 100%)",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, #0f0c09 0%, transparent 22%)",
              }} />
              {/* Warm brown tint */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(90,55,20,0.1)",
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }} />

              {/* Gold left-edge stripe */}
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0,
                width: "2.5px",
                background: "linear-gradient(to bottom, transparent, #C9A84C 28%, #C9A84C 72%, transparent)",
                opacity: 0.55, zIndex: 2,
              }} />

              {/* SS badge — top right */}
              <div style={{
                position: "absolute", top: "14px", right: "14px", zIndex: 3,
                background: "rgba(10,8,5,0.65)",
                border: "0.5px solid rgba(201,168,76,0.32)",
                backdropFilter: "blur(8px)",
                padding: "5px 11px",
                fontSize: "8px",
                letterSpacing: "0.26em",
                color: "#C9A84C",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "var(--font-syne)",
              }}>
                SS / 2026
              </div>

              {/* NEW badge — top left */}
              <div style={{
                position: "absolute", top: "14px", left: "14px", zIndex: 3,
                background: "#C9A84C",
                color: "#111",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                padding: "4px 9px",
                textTransform: "uppercase",
                fontFamily: "var(--font-syne)",
              }}>
                NEW
              </div>

              {/* Bottom label */}
              <div style={{ position: "absolute", bottom: "22px", left: "20px", zIndex: 3 }}>
                <p style={{
                  fontSize: "8px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  fontWeight: 700,
                  marginBottom: "5px",
                  fontFamily: "var(--font-syne)",
                }}>
                  No. 01
                </p>
                <p style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 300,
                  letterSpacing: "0.03em",
                  marginBottom: "6px",
                }}>
                  Silk Midi Dress
                </p>
                <p style={{
                  fontSize: "12px",
                  color: "#C9A84C",
                  fontWeight: 700,
                  fontFamily: "var(--font-syne)",
                }}>
                  $145.00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM MARQUEE STRIP ──────────────────────────────────────── */}
        <div
          ref={stripRef}
          style={{
            gridColumn: "1 / -1",
            gridRow: 2,
            overflow: "hidden",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            paddingTop: "18px",
            opacity: 0,
          }}
        >
          <div style={{
            display: "flex",
            width: "max-content",
            animation: "womenMarquee 28s linear infinite",
            alignItems: "center",
          }}>
            {MARQUEE_ITEMS.map(({ label }, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                padding: "0 38px",
                flexShrink: 0,
              }}>
                {/* Warm petal dot */}
                <svg width="10" height="13" viewBox="0 0 10 13" style={{ flexShrink: 0, opacity: 0.55 }}>
                  <ellipse cx="5" cy="6.5" rx="3.5" ry="6" fill="#C9A84C" transform="rotate(-15 5 6.5)" />
                  <ellipse cx="5" cy="6.5" rx="2.5" ry="4.5" fill="#b8903c" opacity="0.6" transform="rotate(15 5 6.5)" />
                </svg>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.26)",
                  whiteSpace: "nowrap",
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes womenMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}