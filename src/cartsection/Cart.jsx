"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Lock } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal } = useStore();
  const router = useRouter();

  // ── Empty state ─────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <section
        className="w-full bg-[#0a0a0a] flex items-center justify-center px-5"
        style={{ minHeight: "70vh", fontFamily: "var(--font-syne)" }}
      >
        <div className="flex flex-col items-center text-center max-w-[360px]">
          <div className="w-20 h-20 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-6">
            <ShoppingBag size={32} strokeWidth={1.6} className="text-[#C9A84C]" />
          </div>
          <h2
            className="text-white font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(22px, 3vw, 30px)" }}
          >
            Your cart is empty
          </h2>
          <p className="text-white/40 text-[13px] leading-relaxed mb-8">
            Browse the store and add something you love — it&apos;ll show up here.
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

  const vat   = cartTotal * 0.075;
  const grand = cartTotal + vat;

  return (
    <section className="w-full bg-[#0a0a0a] pt-28 sm:pt-32 pb-20" style={{ fontFamily: "var(--font-syne)" }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
            Your Selection
          </p>
          <h1
            className="text-white font-bold leading-none"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.02em" }}
          >
            Shopping Cart{" "}
            <span className="text-white/30 text-[16px] font-medium ml-2">
              ({cart.length} {cart.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

          {/* ── Items ─────────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onQty={(q) => updateQty(item.id, q)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}

            <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-white/45 hover:text-white transition-colors text-[11px] font-semibold tracking-[0.12em] uppercase"
              >
                <ArrowLeft size={13} strokeWidth={2} /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 hover:text-[#e86060] transition-colors underline underline-offset-2"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Summary ───────────────────────────────────── */}
          <div className="bg-[#111010] rounded-xl p-6 sm:p-7 lg:sticky lg:top-28">
            <h2
              className="text-white font-bold mb-5 pb-4 border-b border-white/[0.07]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "20px" }}
            >
              Order Summary
            </h2>

            <SummaryRow label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
            <SummaryRow label="VAT (7.5%)" value={`$${vat.toFixed(2)}`} />
            <SummaryRow label="Shipping" value="Calculated at checkout" muted />

            <div className="border-t border-white/[0.08] my-4" />
            <SummaryRow label="Total" value={`$${grand.toFixed(2)}`} bold />

            <button
              onClick={() => router.push("/checkout")}
              className="w-full mt-6 py-3.5 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200"
            >
              Proceed to Checkout
            </button>

            <p className="flex items-center justify-center gap-1.5 mt-4 text-[10.5px] text-white/25">
              <Lock size={11} strokeWidth={1.8} /> Secure guest checkout · No account needed
            </p>

            <div className="mt-5 px-3.5 py-3 bg-white/[0.03] border-l-2 border-[#C9A84C]/60 text-[10.5px] text-white/35 leading-relaxed">
              Your cart is saved automatically in this browser — no sign-in required.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Cart row ───────────────────────────────────────────────────
function CartRow({ item, onQty, onRemove }) {
  return (
    <div className="flex items-center gap-4 bg-[#111010] rounded-xl p-4 sm:p-5">
      {/* Image */}
      <div className="relative w-[64px] h-[80px] sm:w-[72px] sm:h-[90px] shrink-0 overflow-hidden rounded-lg bg-[#181614]">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover object-center" sizes="80px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-[13px] font-semibold leading-tight mb-1 truncate">{item.name}</p>
        {item.category && (
          <p className="text-white/30 text-[10.5px] uppercase tracking-[0.08em] mb-1.5">{item.category}</p>
        )}
        <p className="text-[#C9A84C] text-[13px] font-bold">${Number(item.price).toFixed(2)}</p>
      </div>

      {/* Qty stepper */}
      <div className="flex items-center gap-2 shrink-0">
        <StepBtn onClick={() => onQty(item.qty - 1)} icon={<Minus size={11} strokeWidth={2} />} />
        <span className="w-6 text-center text-white text-[13px] font-bold tabular-nums">{item.qty}</span>
        <StepBtn onClick={() => onQty(item.qty + 1)} icon={<Plus size={11} strokeWidth={2} />} />
      </div>

      {/* Line total */}
      <div className="hidden sm:block text-right w-[70px] shrink-0">
        <span className="text-white text-[14px] font-bold">${(item.price * item.qty).toFixed(2)}</span>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        title="Remove"
        className="shrink-0 text-white/25 hover:text-[#e86060] transition-colors p-1.5"
      >
        <Trash2 size={15} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function StepBtn({ onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 flex items-center justify-center bg-white/[0.06] hover:bg-[#C9A84C]/20 text-white/70 hover:text-[#C9A84C] transition-colors rounded-md"
    >
      {icon}
    </button>
  );
}

function SummaryRow({ label, value, bold, muted }) {
  return (
    <div className={`flex justify-between items-center mb-3 text-[13px] ${bold ? "text-white font-bold text-[15px]" : muted ? "text-white/30 text-[11.5px]" : "text-white/55 font-medium"}`}>
      <span>{label}</span>
      <span style={bold ? { fontFamily: "var(--font-playfair)" } : undefined}>{value}</span>
    </div>
  );
}
