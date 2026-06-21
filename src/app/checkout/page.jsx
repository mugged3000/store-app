"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Lock, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, guestId } = useStore();
  const [step, setStep] = useState(1); // 1 = info, 2 = review, 3 = done
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "" });
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  const vat   = cartTotal * 0.075;
  const grand = cartTotal + vat;

  // ── Empty cart guard ─────────────────────────────────────────
  if (cart.length === 0 && step !== 3) {
    return (
      <section
        className="w-full bg-[#0a0a0a] flex items-center justify-center px-5"
        style={{ minHeight: "70vh", fontFamily: "var(--font-syne)" }}
      >
        <div className="flex flex-col items-center text-center max-w-[360px]">
          <ShoppingBag size={32} strokeWidth={1.6} className="text-[#C9A84C] mb-5" />
          <h2 className="text-white font-bold mb-6" style={{ fontFamily: "var(--font-playfair)", fontSize: "24px" }}>
            Your cart is empty
          </h2>
          <Link href="/shop" className="px-7 py-3 text-[10.5px] font-bold tracking-[0.15em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] transition-all duration-200">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  function validate() {
    const e = {};
    if (!form.name.trim())  e.name    = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone   = "Phone number is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.city.trim())  e.city    = "City is required";
    if (!form.state.trim()) e.state   = "State is required";
    return e;
  }

  function handleContinue() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(2);
  }

  async function handleConfirm() {
    // Order payload — ready to POST to /api/orders once that route is built:
    const payload = {
      guestId,
      customer: form,
      items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      subtotal: cartTotal,
      vat,
      total: grand,
    };

    try {
      // await fetch('/api/orders', { method: 'POST', body: JSON.stringify(payload) });
      setPlacedOrder(payload);
      clearCart();
      setStep(3);
    } catch (err) {
      console.error("[Checkout] order submit failed:", err);
    }
  }

  // ── Success ───────────────────────────────────────────────────
  if (step === 3) {
    return (
      <section
        className="w-full bg-[#0a0a0a] flex items-center justify-center px-5"
        style={{ minHeight: "75vh", fontFamily: "var(--font-syne)" }}
      >
        <div className="flex flex-col items-center text-center max-w-[420px]">
          <CheckCircle size={56} strokeWidth={1.5} className="text-[#6db86d] mb-6" />
          <h2 className="text-white font-bold mb-3" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(26px, 3.5vw, 36px)" }}>
            Order Placed!
          </h2>
          <p className="text-white/45 text-[13px] leading-relaxed mb-8">
            Thank you, <strong className="text-white/70">{placedOrder?.customer?.name}</strong>. We&apos;ve received your order
            and will reach out at <strong className="text-white/70">{placedOrder?.customer?.email}</strong> with delivery details.
          </p>
          <Link href="/" className="px-8 py-3 text-[10.5px] font-bold tracking-[0.15em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] transition-all duration-200">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#0a0a0a] pt-28 sm:pt-32 pb-20" style={{ fontFamily: "var(--font-syne)" }}>
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
            Step {step} of 2
          </p>
          <h1
            className="text-white font-bold leading-none"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.02em" }}
          >
            {step === 1 ? "Delivery Information" : "Review & Confirm"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

          {/* ── Left panel ──────────────────────────────────── */}
          <div className="bg-[#111010] rounded-xl p-6 sm:p-8">

            {step === 1 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Full Name *" value={form.name} error={errors.name} placeholder="John Doe"
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                  <Field label="Email *" type="email" value={form.email} error={errors.email} placeholder="you@email.com"
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                  <Field label="Phone *" value={form.phone} error={errors.phone} placeholder="+1 (555) 000-0000"
                    onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
                  <Field label="City *" value={form.city} error={errors.city} placeholder="New York"
                    onChange={(v) => setForm((f) => ({ ...f, city: v }))} />
                </div>
                <div className="mb-4">
                  <Field label="State / Region *" value={form.state} error={errors.state} placeholder="NY"
                    onChange={(v) => setForm((f) => ({ ...f, state: v }))} />
                </div>
                <div className="mb-6">
                  <Field label="Delivery Address *" value={form.address} error={errors.address} placeholder="Street, apartment, area…"
                    onChange={(v) => setForm((f) => ({ ...f, address: v }))} textarea />
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#0f0e0c] bg-[#C9A84C] hover:bg-[#d4b85a] active:scale-[0.98] transition-all duration-200"
                >
                  Review Order →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-white font-bold text-[13px] tracking-[0.08em] uppercase mb-3">Delivery To</h3>
                <div className="bg-white/[0.03] rounded-lg p-4 mb-6 text-[12.5px] text-white/55 leading-7">
                  <div className="text-white font-semibold">{form.name}</div>
                  <div>{form.email} · {form.phone}</div>
                  <div>{form.address}, {form.city}, {form.state}</div>
                </div>

                <h3 className="text-white font-bold text-[13px] tracking-[0.08em] uppercase mb-3">
                  Items ({cart.length})
                </h3>
                <div className="flex flex-col gap-0 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-2.5 border-b border-white/[0.06] text-[12.5px]">
                      <span className="text-white/55">{item.name} × {item.qty}</span>
                      <span className="text-white font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-white/60 bg-white/[0.06] hover:bg-white/[0.1] transition-all duration-200"
                  >
                    ← Edit Info
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-[2] py-3 text-[11px] font-bold tracking-[0.12em] uppercase text-[#0f0e0c] bg-[#6db86d] hover:bg-[#5ba35b] active:scale-[0.98] transition-all duration-200"
                  >
                    ✓ Confirm Order
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── Right: mini summary ─────────────────────────── */}
          <div className="bg-[#111010] rounded-xl p-6 sm:p-7 lg:sticky lg:top-28">
            <h2
              className="text-white font-bold mb-5 pb-4 border-b border-white/[0.07]"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "20px" }}
            >
              Order Summary
            </h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-[12px]">
                <span className="text-white/55 truncate max-w-[180px]">{item.name} ×{item.qty}</span>
                <span className="text-white font-semibold shrink-0">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t border-white/[0.08] my-4" />

            <SummaryRow label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
            <SummaryRow label="VAT (7.5%)" value={`$${vat.toFixed(2)}`} />
            <div className="border-t border-white/[0.08] my-3" />
            <SummaryRow label="Total" value={`$${grand.toFixed(2)}`} bold />

            <p className="flex items-center justify-center gap-1.5 mt-5 text-[10.5px] text-white/25">
              <Lock size={11} strokeWidth={1.8} /> Guest checkout · No account required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, error, placeholder, type = "text", textarea }) {
  const base = "w-full bg-white/[0.04] border text-white text-[13px] font-light px-4 py-3 placeholder:text-white/25 focus:outline-none transition-colors duration-200";
  const border = error ? "border-[#e86060]/60" : "border-white/[0.1] focus:border-[#C9A84C]/50";

  return (
    <div>
      <label className="block text-white/45 text-[10px] font-semibold tracking-[0.1em] uppercase mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${base} ${border} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} ${border}`}
        />
      )}
      {error && <p className="text-[#e86060] text-[10.5px] mt-1.5">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div className={`flex justify-between mb-3 ${bold ? "text-white font-bold text-[15px]" : "text-white/55 text-[13px] font-medium"}`}>
      <span>{label}</span>
      <span style={bold ? { fontFamily: "var(--font-playfair)" } : undefined}>{value}</span>
    </div>
  );
}
