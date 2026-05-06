"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Heart, ShoppingBag, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "@/unisexsection/Unisexdata";

export default function UnisexQuickView({ product, onClose, isFav, onToggleFav }) {
  const overlayRef = useRef(null);
  const modalRef   = useRef(null);
  const addBtnRef  = useRef(null);

  const [selSize, setSelSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [selColor, setSelColor] = useState(product.colors[0]);
  const [added, setAdded]       = useState(false);
  const [qty, setQty]           = useState(1);

  // ── entrance / exit ───────────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.22, ease: "power2.out" },
    );
    gsap.fromTo(modalRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.36, ease: "power3.out" },
    );
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.22, onComplete: onClose });
  };

  // ── add to bag ────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    gsap.fromTo(addBtnRef.current,
      { scale: 0.96 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" },
    );
    setTimeout(() => setAdded(false), 2200);
  };

  // ── color lookup ──────────────────────────────────────────────────────────
  const getHex = (name) => COLORS.find((c) => c.name === name)?.hex ?? "#333";

  const starCount = Math.floor(product.rating);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-[6px]"
      onClick={(e) => e.target === overlayRef.current && close()}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[860px] bg-[#111010] flex flex-col sm:flex-row overflow-hidden"
        style={{ maxHeight: "90dvh" }}
      >
        {/* ── CLOSE ── */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/12 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
        >
          <X size={14} strokeWidth={2} />
        </button>

        {/* ── IMAGE PANEL ── */}
        <div className="relative w-full sm:w-[50%] shrink-0 bg-[#181614]" style={{ minHeight: "280px" }}>
          <Image
            src={product.src}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width:640px) 100vw, 430px"
          />
          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/50 via-transparent to-transparent pointer-events-none" />

          {/* badge */}
          {product.badge && (
            <span
              className="absolute top-3 left-3 px-2 py-[3px] text-[#1a1000] text-[8px] font-bold tracking-[0.14em] uppercase bg-[#C9A84C]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {product.badge}
            </span>
          )}

          {/* category label at bottom of image */}
          <div
            className="absolute bottom-3 left-3"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="text-[9px] tracking-[0.22em] uppercase text-white/40">
              {product.category}
            </span>
          </div>
        </div>

        {/* ── DETAILS PANEL ── */}
        <div
          className="flex flex-col p-6 sm:p-8 gap-5 overflow-y-auto w-full"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {/* header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className="text-white leading-snug mb-2"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(18px, 2.2vw, 24px)",
                  fontWeight: 500,
                }}
              >
                {product.name}
              </h3>
              {/* stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    strokeWidth={0}
                    className={i < starCount ? "fill-[#C9A84C]" : "fill-white/15"}
                  />
                ))}
                <span className="text-white/40 text-[10px] ml-1">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            </div>

            {/* wishlist */}
            <button
              onClick={() => onToggleFav(product.id)}
              className="shrink-0 mt-1 p-1.5 hover:scale-110 transition-transform"
            >
              <Heart
                size={18}
                strokeWidth={1.8}
                className={isFav ? "text-[#e86060] fill-[#e86060]" : "text-white/35 hover:text-white/70 transition-colors"}
              />
            </button>
          </div>

          {/* price */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-[#C9A84C]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "28px", fontWeight: 300 }}
            >
              ${product.price}.00
            </span>
            <span className="text-white/25 text-[12px]">USD</span>
          </div>

          {/* divider */}
          <div className="border-t border-white/[0.06]" />

          {/* color */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[0.18em] uppercase text-white/40">
                Color — <span className="text-white/65">{selColor}</span>
              </p>
            </div>
            <div className="flex gap-2.5">
              {(product.colors ?? []).map((name) => (
                <button
                  key={name}
                  title={name}
                  onClick={() => setSelColor(name)}
                  className="relative w-7 h-7 rounded-full border-2 transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: getHex(name),
                    borderColor: selColor === name ? "#C9A84C" : "rgba(255,255,255,0.15)",
                    boxShadow: selColor === name ? "0 0 0 1px rgba(201,168,76,0.5)" : "none",
                    transform: selColor === name ? "scale(1.1)" : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          {/* size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[0.18em] uppercase text-white/40">Size</p>
              <button className="text-[#C9A84C] text-[10px] hover:underline underline-offset-2">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(product.sizes ?? []).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelSize(s)}
                  className={`min-w-[40px] h-10 px-2 text-[10px] font-bold uppercase border transition-all duration-150 ${
                    selSize === s
                      ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                      : "border-white/14 text-white/40 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]"
                  }`}
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* quantity + add */}
          <div className="flex gap-3 mt-auto">
            {/* qty stepper */}
            <div className="flex items-center border border-white/12 shrink-0">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-11 flex items-center justify-center text-white/45 hover:text-white transition-colors"
              >
                <ChevronLeft size={14} strokeWidth={2} />
              </button>
              <span className="w-8 text-center text-[13px] font-semibold text-white/80">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-11 flex items-center justify-center text-white/45 hover:text-white transition-colors"
              >
                <ChevronRight size={14} strokeWidth={2} />
              </button>
            </div>

            {/* add to bag */}
            <button
              ref={addBtnRef}
              onClick={handleAdd}
              className="flex-1 h-11 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-syne)",
                background: added ? "#1f3320" : "#C9A84C",
                color: added ? "#6db86d" : "#111111",
              }}
            >
              <ShoppingBag size={14} strokeWidth={2} />
              {added ? "Added!" : "Add to Bag"}
            </button>
          </div>

          {/* trust note */}
          <p className="text-white/20 text-[10px] text-center leading-relaxed" style={{ fontFamily: "var(--font-syne)" }}>
            Free shipping on orders over $100 · 30-day returns
          </p>
        </div>
      </div>
    </div>
  );
}