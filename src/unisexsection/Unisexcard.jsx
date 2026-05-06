"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Heart, ShoppingBag } from "lucide-react";
import { UnisexProductModal } from "@/unisexsection/Unisexmodal";

export default function UnisexProductCard({ product, isFav, onToggleFav }) {
  const heartRef  = useRef(null);
  const addBtnRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [added, setAdded]         = useState(false);

  const handleFav = (e) => {
    e.stopPropagation();
    onToggleFav(product.id);
    gsap.fromTo(
      heartRef.current,
      { scale: 0.4, rotate: -15 },
      { scale: 1,   rotate: 0,  duration: 0.45, ease: "back.out(3.5)" },
    );
  };

  const handleAddToBag = (e) => {
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* ── CARD ── */}
      <div
        className="group relative flex flex-col bg-[#111010] overflow-hidden cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden bg-[#181614]" style={{ aspectRatio: "3/4" }}>
          <Image
            src={product.src}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 17vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

          {product.badge && (
            <span
              className="absolute top-2.5 left-2.5 z-10 px-2 py-[3px] text-[#1a1000] text-[8px] font-bold tracking-[0.12em] uppercase leading-none"
              style={{ fontFamily: "var(--font-syne)", background: "#C9A84C", borderRadius: "2px" }}
            >
              {product.badge}
            </span>
          )}

          <button
            ref={heartRef}
            onClick={handleFav}
            aria-label="Toggle wishlist"
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/35 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors duration-200"
          >
            <Heart
              size={12}
              strokeWidth={1.8}
              className={isFav ? "text-[#e86060] fill-[#e86060]" : "text-white/65"}
            />
          </button>

          {/* hover add-to-bag — no sizes */}
          <div className="absolute bottom-0 inset-x-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              ref={addBtnRef}
              onClick={handleAddToBag}
              className="w-full py-2 flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-syne)",
                background: added ? "#1f3320" : "#C9A84C",
                color:      added ? "#6db86d" : "#111111",
              }}
            >
              <ShoppingBag size={10} strokeWidth={2} />
              {added ? "Added!" : "Add to Bag"}
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="px-2.5 pt-2.5 pb-3 flex flex-col gap-[3px]">
          <p className="text-white/85 text-[11px] font-medium leading-snug" style={{ fontFamily: "var(--font-syne)" }}>
            {product.name}
          </p>
          <p className="text-white/55 text-[11px]" style={{ fontFamily: "var(--font-syne)" }}>
            ${product.price}.00
          </p>
        </div>
      </div>

      {/* ── MODAL — portaled to document.body, never clipped by the card ── */}
      {modalOpen && (
        <UnisexProductModal
          product={product}
          onClose={() => setModalOpen(false)}
          isFav={isFav}
          onToggleFav={onToggleFav}
        />
      )}
    </>
  );
}