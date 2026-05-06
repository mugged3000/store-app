"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 1,
    name: "Textured Short Sleeve Shirt",
    price: 89,
    badge: "NEW",
    src: "/images/t-shirt1.png",
    thumbnails: [
      "/images/t-shirt1.png",
      "/images/t-shirt2.png",
      "/images/t-shirt3.png",
    ],
  },
  {
    id: 2,
    name: "Relaxed Fit Brown T-Shirt",
    price: 69,
    badge: "NEW",
    src: "/images/t-shirt2.png",
    thumbnails: [
      "/images/t-shirt2.png",
      "/images/t-shirt1.png",
      "/images/t-shirt3.png",
    ],
  },
  {
    id: 3,
    name: "Striped Button-Up Shirt",
    price: 49,
    badge: "NEW",
    src: "/images/t-shirt3.png",
    thumbnails: [
      "/images/t-shirt3.png",
      "/images/t-shirt1.png",
      "/images/t-shirt2.png",
    ],
  },
  {
    id: 4,
    name: "Elegant Button Midi Dress",
    price: 39,
    badge: "NEW",
    src: "/images/t-babe1.png",
    thumbnails: [
      "/images/t-babe1.png",
      "/images/t-babe2.png",
      "/images/t-babe3.png",
    ],
  },
  {
    id: 5,
    name: "Floral Fitted Midi Dress",
    price: 29,
    badge: "NEW",
    src: "/images/t-babe2.png",
    thumbnails: [
      "/images/t-babe2.png",
      "/images/t-babe1.png",
      "/images/t-babe3.png",
    ],
  },
  {
    id: 6,
    name: "Neutral Outfit Set",
    price: 79,
    badge: "NEW",
    src: "/images/t-babe3.png",
    thumbnails: [
      "/images/t-babe3.png",
      "/images/t-babe1.png",
      "/images/t-babe2.png",
    ],
  },
];

// ─── PRODUCT MODAL ─────────────────────────────────────────────────────────────
function ProductModal({ product, onClose, isFav, onToggleFav }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const overlayRef = useRef(null);
  const modalRef   = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );
    gsap.fromTo(modalRef.current,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, {
      opacity: 0, y: 20, scale: 0.97, duration: 0.2,
      onComplete: onClose,
    });
  };

  const handleAddToCart = () => {
    if (addedToCart) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[780px] bg-[#111010] flex flex-col sm:flex-row overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X size={14} strokeWidth={2} />
        </button>

        {/* Main image */}
        <div className="relative w-full sm:w-[55%] aspect-[3/4] sm:aspect-auto bg-[#181614] shrink-0">
          <Image
            src={product.thumbnails[activeThumb]}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 420px"
          />
        </div>

        {/* Right panel */}
        <div className="flex flex-col p-5 sm:p-7 gap-5 w-full">

          {/* Name + fav */}
          <div className="flex items-start justify-between gap-2">
            <div>
              {product.badge && (
                <span className="inline-block px-2 py-0.5 text-[#1a1000] text-[9px] font-bold tracking-[0.12em] uppercase bg-[#C9A84C] mb-2">
                  {product.badge}
                </span>
              )}
              <h3
                className="text-white font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                }}
              >
                {product.name}
              </h3>
              <p className="text-[#C9A84C] text-[15px] font-semibold mt-1"
                style={{ fontFamily: "var(--font-syne)" }}>
                ${product.price}.00
              </p>
            </div>

            {/* Favourite */}
            <button
              onClick={onToggleFav}
              aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
              className="flex flex-col items-center gap-0.5 mt-1 shrink-0"
            >
              <Heart
                size={22}
                strokeWidth={1.8}
                className={`transition-all duration-200 ${isFav ? "text-[#e86060] fill-[#e86060]" : "text-white/40 hover:text-white/70"}`}
              />
              <span className="text-[9px] text-white/30 tracking-wide"
                style={{ fontFamily: "var(--font-syne)" }}>
                {isFav ? "Saved" : "Save"}
              </span>
            </button>
          </div>

          {/* Thumbnails */}
          <div>
            <p className="text-white/40 text-[10px] font-semibold tracking-[0.18em] uppercase mb-2.5"
              style={{ fontFamily: "var(--font-syne)" }}>
              Designs
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumb(idx)}
                  className={`relative w-[64px] h-[80px] overflow-hidden transition-all duration-200 ${
                    activeThumb === idx
                      ? "ring-[1.5px] ring-[#C9A84C] ring-offset-[2px] ring-offset-[#111010] scale-[1.04]"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`Design ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-auto w-full flex items-center justify-center gap-2 py-3 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-200 ${
              addedToCart
                ? "bg-[#C9A84C] text-[#1a1000]"
                : "bg-white text-[#0a0a0a] hover:bg-[#C9A84C] hover:text-[#1a1000]"
            }`}
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <ShoppingBag size={13} strokeWidth={2} />
            {addedToCart ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SINGLE PRODUCT CARD ───────────────────────────────────────────────────────
function ProductCard({ product, index, onOpenModal, isFav, onToggleFav }) {
  const cardRef  = useRef(null);
  const heartRef = useRef(null);

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFav(product.id);
    gsap.fromTo(heartRef.current,
      { scale: 0.7 },
      { scale: 1, duration: 0.45, ease: "back.out(3)" }
    );
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col bg-[#111010] overflow-hidden cursor-pointer"
      onClick={() => onOpenModal(product)}
    >
      {/* Image wrapper */}
      <div className="relative block aspect-[3/4] overflow-hidden bg-[#181614]">
        <Image
          src={product.src}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 z-10 px-2 py-1 text-[#1a1000] text-[9px] font-bold tracking-[0.12em] uppercase bg-[#C9A84C] leading-none"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {product.badge}
          </span>
        )}

        {/* Favourite button */}
        <button
          ref={heartRef}
          onClick={toggleFav}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 transition-all duration-200 hover:bg-black/60"
        >
          <Heart
            size={14}
            strokeWidth={1.8}
            className={`transition-all duration-200 ${isFav ? "text-[#e86060] fill-[#e86060]" : "text-white/70"}`}
          />
        </button>

        {/* Quick view hint */}
        <div className="absolute bottom-0 inset-x-0 z-10 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div
            className="w-full flex items-center justify-center gap-2 py-2.5 text-[10.5px] font-bold tracking-[0.12em] uppercase bg-white text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Quick View
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="px-3 pt-3 pb-4 flex flex-col gap-1">
        <p
          className="text-white text-[13px] font-semibold tracking-[0.03em] leading-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {product.name}
        </p>
        <p
          className="text-white/55 text-[12px] font-medium"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          ${product.price}.00
        </p>
      </div>
    </div>
  );
}

// ─── NEW ARRIVALS SECTION ──────────────────────────────────────────────────────
export default function NewArrivals() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);
  const sliderRef  = useRef(null);

  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [modalProduct,   setModalProduct]   = useState(null);
  const [favourites,     setFavourites]     = useState(new Set());

  const toggleFav = (id) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 95%", once: true },
        }
      );
      gsap.fromTo(cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: sliderRef.current, start: "top 95%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const updateScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => el.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  const scroll = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({
      left: el.scrollLeft + (dir === "right" ? el.clientWidth * 0.75 : -el.clientWidth * 0.75),
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Section header */}
        <div
          ref={headingRef}
          className="flex items-end justify-between mb-8 sm:mb-10 px-5 sm:px-8 lg:px-14"
        >
          <div>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
              Just Dropped
            </p>
            <h2
              className="text-white font-bold leading-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(26px, 3.5vw, 46px)",
                letterSpacing: "-0.02em",
              }}
            >
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-9 h-9 flex items-center justify-center border transition-all duration-200 ${
                  canScrollLeft
                    ? "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                    : "border-white/8 text-white/20 cursor-not-allowed"
                }`}
              >
                <ChevronLeft size={14} strokeWidth={2} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-9 h-9 flex items-center justify-center border transition-all duration-200 ${
                  canScrollRight
                    ? "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                    : "border-white/8 text-white/20 cursor-not-allowed"
                }`}
              >
                <ChevronRight size={14} strokeWidth={2} />
              </button>
            </div>

            <Link
              href="/new-in"
              className="group hidden sm:flex items-center gap-2 text-white/45 hover:text-white transition-colors duration-200 text-[11px] font-semibold tracking-[0.12em] uppercase"
            >
              View All New Arrivals
              <ArrowRight size={13} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Scroll rail */}
        <div
          ref={sliderRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth px-5 sm:px-8 lg:px-14 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="flex-none w-[calc(50vw-28px)] sm:w-[calc(33vw-28px)] lg:w-[calc(20vw-20px)] min-w-[170px] max-w-[260px]"
            >
              <ProductCard
                product={product}
                index={idx}
                onOpenModal={setModalProduct}
                isFav={favourites.has(product.id)}
                onToggleFav={toggleFav}
              />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden flex justify-center px-5">
          <Link
            href="/new-in"
            className="flex items-center gap-2 text-white/45 hover:text-white transition-colors text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            View All New Arrivals
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          isFav={favourites.has(modalProduct.id)}
          onToggleFav={() => toggleFav(modalProduct.id)}
        />
      )}
    </section>
  );
}