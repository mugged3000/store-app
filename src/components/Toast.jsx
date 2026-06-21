"use client";
// src/components/Toast.jsx
// Mounted once inside <StoreProvider>. Reads from global store
// and shows/hides itself automatically — no manual wiring needed.

import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Heart } from "lucide-react";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;

  const isCart = toast.type === "cart";

  return (
    <div
      style={{ fontFamily: "var(--font-syne)" }}
      className="toast-pop fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-[#111010] text-white px-5 py-3.5 rounded-lg shadow-2xl min-w-[240px] max-w-[360px]"
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: isCart ? "rgba(201,168,76,0.15)" : "rgba(232,96,96,0.15)" }}
      >
        {isCart
          ? <ShoppingBag size={13} strokeWidth={2} className="text-[#C9A84C]" />
          : <Heart size={13} strokeWidth={2} fill="#e86060" className="text-[#e86060]" />
        }
      </div>
      <span className="text-[12.5px] font-medium text-white/85 leading-snug">{toast.msg}</span>

      <style>{`
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .toast-pop {
          animation: toastSlideUp 0.35s cubic-bezier(.16,1,.3,1);
        }
      `}</style>
    </div>
  );
}
