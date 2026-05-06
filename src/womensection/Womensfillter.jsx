
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES_FILTER, SIZES, COLORS } from "@/womensection/womendata";

// ─── ACCORDION GROUP ──────────────────────────────────────────────────────────
function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    gsap.to(bodyRef.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.28,
      ease: "power2.inOut",
    });
  }, [open]);

  return (
    <div className="border-b border-white/[0.07] pb-4 mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span
          className="text-white text-[11px] font-bold tracking-[0.14em] uppercase"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {title}
        </span>
        {open
          ? <ChevronUp size={13} className="text-white/35" strokeWidth={2} />
          : <ChevronDown size={13} className="text-white/35" strokeWidth={2} />}
      </button>
      <div ref={bodyRef} style={{ overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ─── FILTER SIDEBAR ───────────────────────────────────────────────────────────
export default function MenFilterSidebar({
  activeCategory,
  setActiveCategory,
  activeSizes,
  toggleSize,
  activeColors,
  toggleColor,
  priceRange,
  setPriceRange,
  hasFilters,
  resetFilters,
  setCurrentPage,
}) {
  // Safe defaults so nothing crashes if props arrive late
  const safeActiveSizes  = activeSizes  ?? [];
  const safeActiveColors = activeColors ?? [];
  const safePriceRange   = priceRange   ?? [0, 200];

  return (
    <aside className="flex flex-col gap-0 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-white text-[12px] font-bold tracking-[0.16em] uppercase"
          style={{ fontFamily: "var(--font-syne)" }}>
          Filters
        </p>
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.1em] uppercase hover:text-[#d4b85a] transition-colors"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterGroup title="Categories">
        <div className="flex flex-col gap-1">
          {["All", ...CATEGORIES_FILTER].map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              className={`text-left text-[12px] tracking-wide transition-colors duration-150 py-0.5 ${
                activeCategory === cat
                  ? "text-[#C9A84C] font-semibold"
                  : "text-white/50 hover:text-white/80"
              }`}
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Size */}
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => { toggleSize(s); setCurrentPage(1); }}
              className={`w-10 h-10 text-[10.5px] font-bold uppercase border transition-all duration-150 ${
                safeActiveSizes.includes(s)
                  ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                  : "border-white/14 text-white/45 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]/70"
              }`}
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Color */}
      <FilterGroup title="Color">
        <div className="flex flex-col gap-2">
          {COLORS.map(({ name, hex }) => (
            <button
              key={name}
              onClick={() => { toggleColor(name); setCurrentPage(1); }}
              className="flex items-center gap-2.5 group"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ${
                  safeActiveColors.includes(name) ? "border-[#C9A84C] scale-110" : "border-white/20"
                }`}
                style={{ background: hex }}
              />
              <span
                className={`text-[11.5px] transition-colors duration-150 ${
                  safeActiveColors.includes(name)
                    ? "text-white"
                    : "text-white/48 group-hover:text-white/75"
                }`}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 border border-white/12 px-2 py-1.5 flex items-center gap-1">
            <span className="text-white/35 text-[10px]">$</span>
            <input
              type="number"
              value={safePriceRange[0]}
              min={0}
              max={safePriceRange[1]}
              onChange={(e) => setPriceRange([+e.target.value, safePriceRange[1]])}
              className="w-full bg-transparent text-white text-[11px] outline-none"
              style={{ fontFamily: "var(--font-syne)" }}
            />
          </div>
          <div className="flex-1 border border-white/12 px-2 py-1.5 flex items-center gap-1">
            <span className="text-white/35 text-[10px]">$</span>
            <input
              type="number"
              value={safePriceRange[1]}
              min={safePriceRange[0]}
              max={500}
              onChange={(e) => setPriceRange([safePriceRange[0], +e.target.value])}
              className="w-full bg-transparent text-white text-[11px] outline-none"
              style={{ fontFamily: "var(--font-syne)" }}
            />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={200}
          value={safePriceRange[1]}
          onChange={(e) => setPriceRange([safePriceRange[0], +e.target.value])}
          className="w-full accent-[#C9A84C] h-[2px]"
        />
      </FilterGroup>
    </aside>
  );
}