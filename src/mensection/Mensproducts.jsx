"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

import { ALL_PRODUCTS, SORT_OPTIONS, PER_PAGE } from "@/mensection/mensdata";
import ProductCard from "@/mensection/Mensproductcard";
import MenFilterSidebar from "@/mensection/Mensfillter";

gsap.registerPlugin(ScrollTrigger);

export default function MenProducts() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSizes,    setActiveSizes]    = useState([]);
  const [activeColors,   setActiveColors]   = useState([]);
  const [priceRange,     setPriceRange]     = useState([0, 200]);
  const [sortBy,         setSortBy]         = useState("Newest");
  const [currentPage,    setCurrentPage]    = useState(1);
  const [favourites,     setFavourites]     = useState(new Set());
  const [mobileFilter,   setMobileFilter]   = useState(false);

  const toggleFav = (id) =>
    setFavourites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSize  = (s) => setActiveSizes((p)  => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleColor = (c) => setActiveColors((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeSizes.length)       list = list.filter((p) => activeSizes.some((s) => p.sizes.includes(s)));
    if (activeColors.length)      list = list.filter((p) => activeColors.some((c) => p.colors.includes(c)));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sortBy === "Most Popular")       list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [activeCategory, activeSizes, activeColors, priceRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSizes([]);
    setActiveColors([]);
    setPriceRange([0, 200]);
    setCurrentPage(1);
  };

  const hasFilters =
    activeCategory !== "All" ||
    activeSizes.length > 0  ||
    activeColors.length > 0 ||
    priceRange[0] > 0       ||
    priceRange[1] < 200;

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.055, ease: "power3.out" }
    );
  }, [paginated]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 90%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sidebarProps = {
    activeCategory, setActiveCategory,
    activeSizes,    toggleSize,
    activeColors,   toggleColor,
    priceRange,     setPriceRange,
    hasFilters,     resetFilters,
    setCurrentPage,
  };

  return (
    <section
      ref={sectionRef}
      id="men-products"
      className="w-full bg-[#0a0a0a] pt-16 sm:pt-20 pb-20 sm:pb-28"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* SECTION HEADER */}
        <div
          ref={headingRef}
          className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10"
          style={{ opacity: 0 }}
        >
          <div>
            <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-2">
              Women's
            </p>
            <h2
              className="text-white font-bold leading-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(26px, 3.5vw, 46px)",
                letterSpacing: "-0.02em",
              }}
            >
              All Products
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-white/18 text-white/65 hover:text-white hover:border-white/40 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all"
            >
              <SlidersHorizontal size={13} strokeWidth={2} /> Filter
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#111010] border border-white/12 text-white/70 text-[11px] font-semibold tracking-[0.08em] pl-3 pr-8 py-2.5 outline-none cursor-pointer hover:border-white/28 transition-colors"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o}>Sort by: {o}</option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
                strokeWidth={2}
              />
            </div>

            <span className="text-white/35 text-[11px] tracking-wide hidden sm:block">
              {filtered.length} results
            </span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="flex gap-8 lg:gap-10">

          {/* Sidebar — desktop */}
          <div className="hidden lg:block w-[210px] xl:w-[230px] shrink-0 pt-1">
            <MenFilterSidebar {...sidebarProps} />
          </div>

          <div className="flex-1 min-w-0">

            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeCategory !== "All" && (
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C]/12 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-semibold tracking-wide uppercase hover:bg-[#C9A84C]/20 transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {activeCategory} <X size={10} strokeWidth={2.5} />
                  </button>
                )}
                {activeSizes.map((s) => (
                  <button key={s} onClick={() => toggleSize(s)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C]/12 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-semibold tracking-wide uppercase hover:bg-[#C9A84C]/20 transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s} <X size={10} strokeWidth={2.5} />
                  </button>
                ))}
                {activeColors.map((c) => (
                  <button key={c} onClick={() => toggleColor(c)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C9A84C]/12 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] font-semibold tracking-wide uppercase hover:bg-[#C9A84C]/20 transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {c} <X size={10} strokeWidth={2.5} />
                  </button>
                ))}
              </div>
            )}

            {paginated.length > 0 ? (
              <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFav={favourites.has(product.id)}
                    onToggleFav={toggleFav}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <p className="text-white/30 text-[14px] tracking-wide">No products match your filters.</p>
                <button onClick={resetFilters}
                  className="text-[#C9A84C] text-[11px] font-bold tracking-[0.12em] uppercase underline underline-offset-2">
                  Clear Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 flex items-center justify-center border transition-all duration-200 ${
                    currentPage > 1
                      ? "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                      : "border-white/8 text-white/18 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft size={13} strokeWidth={2} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 text-[11px] font-bold transition-all duration-200 border ${
                      currentPage === p
                        ? "bg-[#C9A84C] border-[#C9A84C] text-[#1a1000]"
                        : "border-white/12 text-white/50 hover:border-white/35 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 flex items-center justify-center border transition-all duration-200 ${
                    currentPage < totalPages
                      ? "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                      : "border-white/8 text-white/18 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight size={13} strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilter && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFilter(false)}
          />
          <div
            className="fixed top-0 left-0 bottom-0 z-50 w-[82vw] max-w-[320px] bg-[#111010] border-r border-white/[0.07] flex flex-col lg:hidden"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
              <p className="text-white text-[12px] font-bold tracking-[0.16em] uppercase">Filters</p>
              <button onClick={() => setMobileFilter(false)} className="text-white/50 hover:text-white">
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <MenFilterSidebar {...sidebarProps} />
            </div>
            <div className="px-5 py-4 border-t border-white/[0.07]">
              <button
                onClick={() => setMobileFilter(false)}
                className="w-full py-3 bg-[#C9A84C] text-[#1a1000] text-[11px] font-bold tracking-[0.14em] uppercase"
              >
                View {filtered.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}