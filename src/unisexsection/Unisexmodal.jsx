"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";
import { X, Heart, ShoppingBag, Star } from "lucide-react";

const THUMB_POOL = [
  "/images/t-shirt1.png",
  "/images/t-shirt2.png",
  "/images/t-shirt3.png",
  "/images/t-babe1.png",
  "/images/t-babe2.png",
  "/images/t-babe3.png",
];

function getThumbnails(product) {
  if (!product) return [];
  const others = THUMB_POOL.filter((p) => p !== product.src);
  const a = others[(product.id * 3) % others.length];
  const b = others[(product.id * 3 + 1) % others.length];
  return [product.src, a, b];
}

export function UnisexProductModal({ product, onClose, isFav, onToggleFav }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);
  const heartRef   = useRef(null);

  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded]             = useState(false);
  const [portalTarget, setPortalTarget] = useState(null);

  // Resolve portal target client-side only — avoids SSR mismatch
  useEffect(() => { setPortalTarget(document.body); }, []);

  const thumbnails = getThumbnails(product);

  const productId = product?.id ?? null;
  useEffect(() => {
    setActiveThumb(0);
  }, [productId]);

  // Lock body scroll while open
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  // Entrance animation — depends on portalTarget so refs are guaranteed painted
  useEffect(() => {
    if (!portalTarget || !overlayRef.current || !panelRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.28, ease: "power2.out" }
    );
    tl.fromTo(panelRef.current,
      { y: 48, opacity: 0, scale: 0.97 },
      { y: 0,  opacity: 1, scale: 1,   duration: 0.4, ease: "power3.out" },
      "-=0.18"
    );
  }, [portalTarget]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, onComplete: onClose });
  };

  const handleFav = () => {
    onToggleFav(product.id);
    gsap.fromTo(heartRef.current,
      { scale: 0.4, rotate: -15 },
      { scale: 1,   rotate: 0,  duration: 0.45, ease: "back.out(3.5)" },
    );
  };

  const handleAddToBag = () => {
    if (added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (!product || !portalTarget) return null;

  const starCount = Math.floor(product.rating);

  const modal = (
    /* OVERLAY — portaled to body so it's never clipped by a parent */
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        padding: "16px",
        opacity: 0,
      }}
    >
      {/* PANEL */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          maxWidth: "860px",
          maxHeight: "90vh",
          background: "#111010",
          overflow: "hidden",
          borderRadius: "2px",
          opacity: 0,
          transform: "translateY(48px) scale(0.97)",
        }}
      >
        {/* ── CLOSE ── */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 10,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <X size={14} strokeWidth={1.8} />
        </button>

        {/* ── LEFT: MAIN IMAGE + THUMBNAIL STRIP ── */}
        <div style={{ width: "50%", flexShrink: 0, background: "#181614", display: "flex", flexDirection: "column" }}>
          {/* Hero image */}
          <div style={{ position: "relative", flex: 1, minHeight: 0, aspectRatio: "3/4" }}>
            <Image
              key={activeThumb}
              src={thumbnails[activeThumb]}
              alt={product.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="430px"
              priority
            />
            {product.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  zIndex: 2,
                  padding: "3px 8px",
                  background: "#C9A84C",
                  color: "#1a1000",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  fontFamily: "var(--font-syne)",
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: "flex", gap: "8px", padding: "12px", background: "#0e0d0b" }}>
            {thumbnails.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                aria-label={`View ${i + 1}`}
                style={{
                  position: "relative",
                  flex: 1,
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  outline: activeThumb === i ? "2px solid #C9A84C" : "2px solid transparent",
                  outlineOffset: "2px",
                }}
              >
                <Image
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="90px"
                />
                {activeThumb !== i && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: INFO ── */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            padding: "36px 32px 32px",
            overflowY: "auto",
          }}
        >
          {/* Name + heart */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                fontFamily: "var(--font-syne)",
              }}
            >
              {product.name}
            </h2>
            <button
              ref={heartRef}
              onClick={handleFav}
              aria-label="Toggle wishlist"
              style={{
                flexShrink: 0,
                marginTop: "2px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <Heart
                size={15}
                strokeWidth={1.8}
                style={{ color: isFav ? "#e86060" : "rgba(255,255,255,0.5)", fill: isFav ? "#e86060" : "none" }}
              />
            </button>
          </div>

          {/* Price */}
          <p
            style={{
              margin: "0 0 16px",
              fontSize: "22px",
              fontWeight: 600,
              color: "#C9A84C",
              fontFamily: "var(--font-syne)",
            }}
          >
            ${product.price}.00
          </p>

          {/* Stars */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "3px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  strokeWidth={0}
                  fill={i < starCount ? "#C9A84C" : "rgba(255,255,255,0.15)"}
                />
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-syne)" }}>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "24px" }} />

          {/* Description */}
          <p
            style={{
              margin: "0 0 32px",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-syne)",
            }}
          >
            A unisex essential built for everyday wear. Clean lines, premium fabric, and a
            relaxed fit designed to be shared and styled by anyone.
          </p>

          {/* CTA */}
          <button
            onClick={handleAddToBag}
            style={{
              marginTop: "auto",
              width: "100%",
              padding: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-syne)",
              background: added ? "#1f3320" : "#C9A84C",
              color: added ? "#6db86d" : "#111111",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            <ShoppingBag size={13} strokeWidth={2} />
            {added ? "Added to Bag!" : "Add to Bag"}
          </button>

          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              fontSize: "10px",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.05em",
              fontFamily: "var(--font-syne)",
            }}
          >
            Free shipping on orders over $120 · Easy returns
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, portalTarget);
}