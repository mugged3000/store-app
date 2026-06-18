"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import UnisexHero        from "@/unisexsection/Unisexhero";
import UnisexProductCard from "@/unisexsection/Unisexcard";
// import UnisexQuickView   from "@/unisexsection/Quickview";
import UnisexBanner from "@/unisexsection/Banner";

gsap.registerPlugin(ScrollTrigger);

// Maps a DB Product record into the shape UnisexProductCard / UnisexProductModal expect.
// DB stores the main image on `image` (singular) and a gallery on `images` (array) —
// the card/modal were built around `product.src`, so we bridge that here without
// touching their internals.
function mapProduct(p) {
  return {
    ...p,
    src: p.image,
    images: p.images && p.images.length > 0 ? p.images : [p.image],
  };
}

export default function UnisexProducts() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [favourites,   setFavourites]   = useState(new Set());

  // ── FETCH UNISEX PRODUCTS FROM DB ──────────────
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/products?gender=shop", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to load products (${res.status})`);

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.products ?? []);

        setProducts(list.map(mapProduct));
      } catch (err) {
        console.error("[UnisexProducts] fetch error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const toggleFav = (id) =>
    setFavourites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ── GRID ANIMATION — runs once products are in ─────
  useEffect(() => {
    if (loading || products.length === 0 || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.querySelectorAll("[data-card]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [loading, products]);

  // ── HEADING ANIMATION ─────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a]">

      {/* ── HERO ───────────────────────── */}
      <UnisexHero />

      {/* ── PRODUCT SECTION ───────────── */}
      <section
        ref={sectionRef}
        className="w-full pt-16 sm:pt-20 pb-20"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

          {/* Heading */}
          <div ref={headingRef} className="mb-8" style={{ opacity: 0 }}>
            <p className="text-white text-[11px] font-bold tracking-[0.3em] uppercase">
              New Arrivals
            </p>
          </div>

          {/* Error state */}
          {error && (
            <p className="text-white/40 text-[12px] tracking-wide mb-6">
              {error}
            </p>
          )}

          {/* Empty state */}
          {!loading && !error && products.length === 0 && (
            <p className="text-white/40 text-[12px] tracking-wide mb-6">
              No products found yet.
            </p>
          )}

          {/* ✅ RESPONSIVE GRID */}
          <div
            ref={gridRef}
            className="
              grid
              gap-4
              sm:gap-5
              md:gap-6
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="flex flex-col bg-[#111010] overflow-hidden animate-pulse"
                >
                  <div className="aspect-[3/4] bg-[#1e1c1c]" />
                  <div className="px-2.5 pt-2.5 pb-3 flex flex-col gap-2">
                    <div className="h-3 w-3/4 bg-[#1e1c1c] rounded" />
                    <div className="h-3 w-1/3 bg-[#1e1c1c] rounded" />
                  </div>
                </div>
              ))}

            {!loading &&
              products.map((product) => (
                <div key={product.id} data-card>
                  <UnisexProductCard
                    product={product}
                    onOpen={setModalProduct}
                    isFav={favourites.has(product.id)}
                    onToggleFav={toggleFav}
                  />
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* 🔥 NEW PROFESSIONAL SECTION */}
      <UnisexBanner />

      {/* ── QUICK VIEW MODAL ─────────── */}
      {/* {modalProduct && (
        <UnisexQuickView
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          isFav={favourites.has(modalProduct.id)}
          onToggleFav={() => toggleFav(modalProduct.id)}
        />
      )} */}
    </div>
  );
}