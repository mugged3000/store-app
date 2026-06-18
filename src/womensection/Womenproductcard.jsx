"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import { WomenQuickView } from "./Womenquickview";

export default function ProductCard({ product, isFav, onToggleFav }) {
  const [added,     setAdded]     = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToBag = (e) => {
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
     <div
        className="group relative flex flex-col bg-[#111010] overflow-hidden cursor-pointer rounded-xl"
        onClick={() => setModalOpen(true)}
      >
          <div className="relative aspect-[3/4] overflow-hidden bg-[#181614] rounded-t-xl">
          <Image
            src={product.image}        // ← was product.src
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.badge && (
            <span
              className="absolute top-3 left-3 z-10 px-2 py-1 text-[#1a1000] text-[8.5px] font-bold tracking-[0.12em] uppercase bg-[#C9A84C] leading-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-0 inset-x-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleAddToBag}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-all duration-200"
              style={{
                fontFamily: "var(--font-syne)",
                background: added ? "#1f3320" : hovered ? "#C9A84C" : "white",
                color: added ? "#6db86d" : hovered ? "#1a1000" : "#0a0a0a",
              }}
            >
              <ShoppingBag size={11} strokeWidth={2} />
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="px-3 pt-3 pb-4">
          <p
            className="text-white text-[12.5px] font-semibold tracking-[0.03em] leading-tight mb-1"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {product.name}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-[#C9A84C] text-[12px] font-bold" style={{ fontFamily: "var(--font-syne)" }}>
              ${(product.price / 100).toFixed(2)}
            </p>
            <div className="flex items-center gap-0.5">
              <Star size={9} className="text-[#C9A84C] fill-[#C9A84C]" />
              <span className="text-white/38 text-[10px]" style={{ fontFamily: "var(--font-syne)" }}>
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <WomenQuickView
          product={product}
          onClose={() => setModalOpen(false)}
          isFav={isFav}
          onToggleFav={onToggleFav}
        />
      )}
    </>
  );
}