"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function FavouritesPage() {
  const { favs, toggleFav, addToCart, inCart } = useStore();

  // ── Empty state ─────────────────────────────────────────────
  if (favs.length === 0) {
    return (
      <section
        className="w-full bg-[#0a0a0a] flex items-center justify-center px-5"
        style={{ minHeight: "70vh", fontFamily: "var(--font-syne)" }}
      >
        <div className="flex flex-col items-center text-center max-w-[360px]">
          <div className="w-20 h-20 rounded-full bg-[#e86060]/10 flex items-center justify-center mb-6">
            <Heart size={32} strokeWidth={1.6} className="text-[#e86060]" />
          </div>
          <h2
            className="text-white font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(22px, 3vw, 30px)" }}
          >
            No favourites yet
          </h2>
          <p className="text-white/40 text-[13px] leading-relaxed mb-8">
            Tap the heart icon on any product in the shop to save it here.
          </p>
          <Link
            href="/shop"
            className="px-7 py-3 text-[10.5px] font-bold tracking-[0.15em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200"
          >
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#0a0a0a] pt-28 sm:pt-32 pb-20" style={{ fontFamily: "var(--font-syne)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
              Saved Items
            </p>
            <h1
              className="text-white font-bold leading-none"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.02em" }}
            >
              My Favourites{" "}
              <span className="text-white/30 text-[16px] font-medium ml-2">({favs.length})</span>
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-white/45 hover:text-white transition-colors text-[11px] font-semibold tracking-[0.12em] uppercase"
          >
            Browse More →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {favs.map((item) => (
            <FavCard
              key={item.id}
              item={item}
              onRemove={() => toggleFav(item)}
              onCart={() => addToCart(item)}
              cartActive={inCart(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FavCard({ item, onRemove, onCart, cartActive }) {
  const [confirming, setConfirming] = useState(false);

  const handleDeleteClick = () => {
    if (confirming) {
      onRemove();
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 2500);
    }
  };

  return (
    <div className="group relative flex flex-col bg-[#111010] overflow-hidden rounded-xl">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#181614] rounded-t-xl">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">👕</div>
        )}

        {item.category && (
          <span
            className="absolute top-3 left-3 z-10 px-2 py-1 text-white/80 text-[8px] font-bold tracking-[0.12em] uppercase bg-black/45 backdrop-blur-sm rounded-[2px] leading-none"
          >
            {item.category}
          </span>
        )}

        {/* Delete from favourites — click once to arm, click again to confirm */}
        <button
          onClick={handleDeleteClick}
          title={confirming ? "Click again to confirm" : "Remove from favourites"}
          aria-label="Remove from favourites"
          className="absolute top-3 right-3 z-10 h-8 rounded-full backdrop-blur-sm flex items-center justify-center gap-1.5 transition-all duration-200 px-2.5"
          style={{
            background: confirming ? "#e86060" : "rgba(0,0,0,0.5)",
            width: confirming ? "auto" : "32px",
          }}
        >
          <Trash2 size={13} strokeWidth={2} color="#fff" className="shrink-0" />
          {confirming && (
            <span className="text-white text-[9.5px] font-bold uppercase tracking-[0.06em] whitespace-nowrap">
              Confirm?
            </span>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="px-3 pt-3 pb-4 flex flex-col gap-2">
        <p className="text-white text-[12.5px] font-semibold tracking-[0.03em] leading-tight">
          {item.name}
        </p>
        <p className="text-[#C9A84C] text-[13px] font-bold">${Number(item.price).toFixed(2)}</p>

        <button
          onClick={onCart}
          className="mt-1 w-full flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-all duration-200"
          style={{
            background: cartActive ? "#1f3320" : "white",
            color: cartActive ? "#6db86d" : "#0a0a0a",
          }}
        >
          <ShoppingBag size={11} strokeWidth={2} />
          {cartActive ? "In Cart ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
