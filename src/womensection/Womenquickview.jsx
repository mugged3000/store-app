"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";
import { X, Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";

// Always: [main image, ...extra images] — no random fallbacks
function getThumbnails(product) {
  if (!product) return [];
  const extras = (product.images ?? []).filter((img) => img !== product.image);
  return [product.image, ...extras];
}

export function WomenQuickView({ product, onClose }) {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);

  const [activeThumb,   setActiveThumb]   = useState(0);
  const [portalTarget,  setPortalTarget]  = useState(null);

  const { addToCart, inCart } = useStore();
  const added = product ? inCart(product.id) : false;

  useEffect(() => { setPortalTarget(document.body); }, []);

  // Reset to main image (index 0) when product changes
  useEffect(() => { setActiveThumb(0); }, [product?.id]);

  const thumbnails = getThumbnails(product);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    if (!product || !overlayRef.current) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
    gsap.fromTo(panelRef.current,   { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "power3.out" });
  }, [product, portalTarget]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, onComplete: onClose });
  };

  const handleAddToBag = () => {
    if (added) return;
    addToCart({
      id:       product.id,
      name:     product.name,
      price:    product.price / 100,
      image:    product.image,
      category: "women",
    });
  };

  if (!product || !portalTarget) return null;

  const starCount = Math.floor(product.rating ?? 0);

  const modal = (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        padding: "16px",
      }}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", display: "flex",
          width: "100%", maxWidth: "860px", maxHeight: "90vh",
          background: "#111010", overflow: "hidden", borderRadius: "2px",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "14px", right: "14px", zIndex: 10,
            width: "32px", height: "32px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%", cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <X size={14} strokeWidth={1.8} />
        </button>

        {/* LEFT — image + thumbnails */}
        <div style={{ width: "50%", flexShrink: 0, background: "#181614", display: "flex", flexDirection: "column" }}>
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
              <span style={{
                position: "absolute", top: "12px", left: "12px", zIndex: 2,
                padding: "3px 8px", background: "#C9A84C", color: "#1a1000",
                fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", borderRadius: "2px",
                fontFamily: "var(--font-syne)",
              }}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          {thumbnails.length > 1 && (
            <div style={{ display: "flex", gap: "8px", padding: "12px", background: "#0e0d0b" }}>
              {thumbnails.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  aria-label={`View image ${i + 1}`}
                  style={{
                    position: "relative", flex: 1, aspectRatio: "3/4",
                    overflow: "hidden", border: "none", padding: 0, cursor: "pointer",
                    outline: activeThumb === i ? "2px solid #C9A84C" : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
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
          )}
        </div>

        {/* RIGHT — info */}
        <div style={{
          width: "50%", display: "flex", flexDirection: "column",
          padding: "36px 32px 32px", overflowY: "auto",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
            <h2 style={{
              margin: 0, fontSize: "24px", fontWeight: 700,
              color: "#fff", lineHeight: 1.2, fontFamily: "var(--font-syne)",
            }}>
              {product.name}
            </h2>
          </div>

          <p style={{ margin: "0 0 16px", fontSize: "22px", fontWeight: 600, color: "#C9A84C", fontFamily: "var(--font-syne)" }}>
           ${(product.price / 100).toFixed(2)}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "3px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} strokeWidth={0} fill={i < starCount ? "#C9A84C" : "rgba(255,255,255,0.15)"} />
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-syne)" }}>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "24px" }} />

          <p style={{ margin: "0 0 32px", fontSize: "13px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-syne)" }}>
            {product.description ?? "A women's essential crafted for effortless style. Refined silhouette, premium fabric, and a versatile fit designed to be worn any way you choose."}
          </p>

          <button
            onClick={handleAddToBag}
            style={{
              marginTop: "auto", width: "100%", padding: "14px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", fontFamily: "var(--font-syne)",
              background: added ? "#1f3320" : "white",
              color: added ? "#6db86d" : "#0a0a0a",
              border: "none", borderRadius: "2px", cursor: "pointer",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            <ShoppingBag size={13} strokeWidth={2} />
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>

          <p style={{
            marginTop: "12px", textAlign: "center", fontSize: "10px",
            color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em",
            fontFamily: "var(--font-syne)",
          }}>
            Free shipping on orders over $120 · Easy returns
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, portalTarget);
}