"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MEMBER_BENEFITS = [
  "Early access to new drops",
  "Exclusive member discounts",
  "Special birthday offers",
  "VIP customer support",
  "Invite-only sale previews",
];

const TRUST = [
  { label: "Sustainable", sub: "Materials & Packaging" },
  { label: "Ethical",     sub: "Made Responsibly"     },
  { label: "Timeless",    sub: "Designed To Last"      },
];

export default function Newsletter() {
  const sectionRef    = useRef(null);
  const memberRef     = useRef(null);
  const newsletterRef = useRef(null);

  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  // ── Scroll entrance ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        memberRef.current,
        { opacity: 0, x: -32 },
        {
          opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: memberRef.current, start: "top 90%", once: true },
        }
      );
      gsap.fromTo(
        newsletterRef.current,
        { opacity: 0, x: 32 },
        {
          opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: newsletterRef.current, start: "top 90%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Subscribe ────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a]"
      style={{ fontFamily: "var(--font-syne)" }}
    >

      {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* MEMBER BENEFITS */}
        <div
          ref={memberRef}
          className="relative px-5 sm:px-8 lg:px-14 py-16 sm:py-20 bg-[#0d0c0a] border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 10%, rgba(201,168,76,0.07) 0%, transparent 68%)",
            }}
          />

          <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[#C9A84C]" />
            Membership
          </p>

          <h2
            className="text-white font-bold mb-8 leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(28px, 3.2vw, 46px)",
              letterSpacing: "-0.02em",
            }}
          >
            Exclusive Member<br />Benefits
          </h2>

          <ul className="flex flex-col gap-4 mb-10">
            {MEMBER_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                <span className="text-white/55 text-[13px] font-light tracking-wide">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <button
            className="px-8 py-3 text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
          >
            Join Now
            <ArrowRight size={12} strokeWidth={2.5} />
          </button>
        </div>

        {/* NEWSLETTER */}
        <div
          ref={newsletterRef}
          className="relative px-5 sm:px-8 lg:px-14 py-16 sm:py-20 overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Watermark letter */}
          <div
            className="absolute bottom-[-24px] right-[-12px] select-none pointer-events-none text-white/[0.022] font-bold leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(120px, 18vw, 220px)",
              letterSpacing: "-0.05em",
            }}
          >
            N
          </div>

          <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-[#C9A84C]" />
            Newsletter
          </p>

          <h2
            className="text-white font-bold mb-3 leading-none"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(28px, 3.2vw, 46px)",
              letterSpacing: "-0.02em",
            }}
          >
            Be The First<br />To Know
          </h2>

          <p className="text-white/40 text-[13px] font-light leading-relaxed mb-8 max-w-sm">
            Get early access to new arrivals, exclusive member offers, and considered style inspiration delivered to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/[0.04] border border-white/[0.1] border-r-0 text-white text-[13px] font-light px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-[#C9A84C]/50 transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C9A84C] text-[#0f0e0c] text-[10.5px] font-bold tracking-[0.16em] uppercase hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200 shrink-0 flex items-center gap-2"
              >
                {submitted ? <Check size={14} strokeWidth={2.5} /> : null}
                {submitted ? "Subscribed!" : "Subscribe"}
              </button>
            </div>

            {error && (
              <p className="text-red-400/80 text-[11px] mt-2 tracking-wide">{error}</p>
            )}
            {submitted && (
              <p className="text-[#C9A84C] text-[11px] mt-2 tracking-wide font-medium">
                ✓ You&apos;re on the list — welcome to Nexora.
              </p>
            )}
          </form>

          <p className="text-white/22 text-[10.5px] tracking-wide mb-10">
            By subscribing you agree to our{" "}
            <span className="text-white/35 underline underline-offset-2 cursor-pointer hover:text-[#C9A84C] transition-colors">
              Privacy Policy
            </span>
            . Unsubscribe anytime.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-white/[0.06]">
            {TRUST.map(({ label, sub }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-white text-[10.5px] font-semibold tracking-[0.14em] uppercase">
                  {label}
                </span>
                <span className="text-white/30 text-[10.5px] font-light">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}