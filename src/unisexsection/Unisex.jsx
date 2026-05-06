"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import UnisexHero        from "@/unisexsection/Unisexhero";
import UnisexProductCard from "@/unisexsection/Unisexcard";
import UnisexQuickView   from "@/unisexsection/Quickview";
import UnisexBanner from "@/unisexsection/Banner";
import { ALL_PRODUCTS }  from "@/unisexsection/Unisexdata";

gsap.registerPlugin(ScrollTrigger);

export default function UnisexProducts() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  const [modalProduct, setModalProduct] = useState(null);
  const [favourites,   setFavourites]   = useState(new Set());

  const toggleFav = (id) =>
    setFavourites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ── GRID ANIMATION ─────────────────────────
  useEffect(() => {
    if (!gridRef.current) return;

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
  }, []);

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
            {ALL_PRODUCTS.map((product) => (
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
      {modalProduct && (
        <UnisexQuickView
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          isFav={favourites.has(modalProduct.id)}
          onToggleFav={() => toggleFav(modalProduct.id)}
        />
      )}
    </div>
  );
}