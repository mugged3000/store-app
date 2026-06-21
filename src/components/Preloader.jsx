"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/loading/LoadingContext";

const MIN_DISPLAY_MS = 5000;
const HARD_CAP_MS    = 8000;

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [hidden,  setHidden]  = useState(false);
  const [dataReady, setDataReady] = useState(false);

  const { pendingCount } = useLoading();

  const overlayRef   = useRef(null);
  const logoRef      = useRef(null);
  const ringWrapRef  = useRef(null);
  const ringFillRef  = useRef(null);
  const percentRef   = useRef(null);
  const labelRef     = useRef(null);
  const panelLRef    = useRef(null);
  const panelRRef    = useRef(null);

  const startTimeRef   = useRef(null);
  const exitStartedRef = useRef(false);

  useEffect(() => {
  setMounted(true);
  startTimeRef.current = Date.now();
  document.body.style.overflow = "hidden";
}, []);

  useEffect(() => {
    if (hidden) document.body.style.overflow = "";
  }, [hidden]);

  useEffect(() => {
    if (!mounted) return;
    if (pendingCount === 0) setDataReady(true);
  }, [mounted, pendingCount]);

  useEffect(() => {
    if (!mounted) return;
    const capTimer = setTimeout(() => setDataReady(true), HARD_CAP_MS);
    return () => clearTimeout(capTimer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.set(logoRef.current,     { opacity: 0, y: 14 });
      gsap.set(ringWrapRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(labelRef.current,    { opacity: 0 });
      gsap.set(ringFillRef.current, { strokeDashoffset: CIRCUMFERENCE });

      gsap.timeline()
        .to(logoRef.current,     { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .to(ringWrapRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, "-=0.25")
        .to(labelRef.current,    { opacity: 1, duration: 0.4 }, "-=0.2");

      const counter = { val: 0 };
      gsap.to(counter, {
        val: 90,
        duration: MIN_DISPLAY_MS / 1000,
        ease: "power1.out",
        onUpdate: () => {
          const pct = counter.val;
          if (percentRef.current)  percentRef.current.textContent = `${Math.round(pct)}`;
          if (ringFillRef.current) {
            ringFillRef.current.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct / 100);
          }
        },
      });

      overlayRef.current.__counter = counter;
    }, overlayRef);

    return () => ctx.revert();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !dataReady || exitStartedRef.current) return;

    const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    const timer = setTimeout(() => {
      exitStartedRef.current = true;
      runExitAnimation();
    }, remaining);

    return () => clearTimeout(timer);
  }, [mounted, dataReady]);

  function runExitAnimation() {
    const counter = overlayRef.current?.__counter ?? { val: 90 };

    const tl = gsap.timeline();

    tl.to(counter, {
      val: 100,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        const pct = counter.val;
        if (percentRef.current)  percentRef.current.textContent = `${Math.round(pct)}`;
        if (ringFillRef.current) {
          ringFillRef.current.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct / 100);
        }
      },
    });

    tl.to({}, { duration: 0.3 })
      .to(ringWrapRef.current, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power2.in" })
      .to(logoRef.current,     { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" }, "<")
      .to(labelRef.current,    { opacity: 0, duration: 0.3 }, "<")
      .to(panelLRef.current, { xPercent: -100, duration: 0.7, ease: "power3.inOut" }, "+=0.05")
      .to(panelRRef.current, { xPercent: 100,  duration: 0.7, ease: "power3.inOut" }, "<")
      .add(() => {
  setHidden(true);
});
  }

  if (hidden) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[99999]" style={{ fontFamily: "var(--font-syne)" }}>
      <div ref={panelLRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0a0a]" />
      <div ref={panelRRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
        <p
          ref={logoRef}
          className="text-white font-bold tracking-[0.06em]"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(22px, 3.4vw, 32px)" }}
        >
          ROWAN-STORE
        </p>

        <div ref={ringWrapRef} className="relative w-[104px] h-[104px] flex items-center justify-center">
          <svg width="104" height="104" viewBox="0 0 104 104" className="absolute inset-0 -rotate-90">
            <circle cx="52" cy="52" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
            <circle
              ref={ringFillRef}
              cx="52" cy="52" r={RADIUS}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
              style={{ transition: "none" }}
            />
          </svg>

          <div className="flex items-baseline gap-[1px]">
            <span
              ref={percentRef}
              className="text-white font-semibold tabular-nums"
              style={{ fontFamily: "var(--font-syne)", fontSize: "19px" }}
            >
              0
            </span>
            <span className="text-white/40 text-[12px] font-medium">%</span>
          </div>
        </div>

        <span ref={labelRef} className="text-white/35 text-[10px] tracking-[0.22em] uppercase">
          Loading Experience
        </span>
      </div>
    </div>
  );
}