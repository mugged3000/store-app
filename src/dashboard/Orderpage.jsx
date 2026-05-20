
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const ORDERS = [
  { id: "#ORD123", customer: "John Doe",      date: "Apr 23, 2026", total: "$1200", status: "Pending"   },
  { id: "#ORD122", customer: "Alice Smith",   date: "Apr 23, 2026", total: "$1500", status: "Shipped"   },
  { id: "#ORD121", customer: "Michael Brown", date: "Apr 22, 2026", total: "$800",  status: "Delivered" },
  { id: "#ORD120", customer: "Emily Davis",   date: "Apr 22, 2026", total: "$600",  status: "Pending"   },
  { id: "#ORD119", customer: "David Wilson",  date: "Apr 21, 2026", total: "$400",  status: "Cancelled" },
  { id: "#ORD118", customer: "Sophia Taylor", date: "Apr 21, 2026", total: "$700",  status: "Shipped"   },
  { id: "#ORD117", customer: "Daniel Lee",    date: "Apr 20, 2026", total: "$1100", status: "Delivered" },
];

const STATUS_CLS = {
  Pending:   "bg-amber-500/20 text-amber-400",
  Shipped:   "bg-cyan-500/20 text-cyan-400",
  Delivered: "bg-green-500/20 text-green-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

export default function OrdersPage() {
  const tableRef = useRef(null);
  const rowsRef  = useRef([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tableRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(rowsRef.current.filter(Boolean),
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, delay: 0.3, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="p-5 md:p-7">
        <Link
      href="/admin/dashboard"
      className="inline-flex items-center gap-2 mb-4 text-white/60 hover:text-white
      text-[11px] font-bold tracking-[0.12em] uppercase transition-colors"
    >
      ← Back to Dashboard
    </Link>
      <div
        ref={tableRef}
        className="rounded-xl overflow-hidden"
        style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10" style={{ background: "#6d28d9" }}>
          <span className="text-white font-bold text-[15px] tracking-wide">Orders List</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Order ID", "Customer", "Date", "Total", "Status", "Action"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-[10px] font-bold tracking-widest uppercase text-white/40
                      ${i === 5 ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o, i) => (
                <tr
                  key={o.id}
                  ref={(el) => (rowsRef.current[i] = el)}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-5 py-3.5 text-white/50 font-medium text-[13px]">{o.id}</td>
                  <td className="px-5 py-3.5 text-white font-medium text-[13px]">{o.customer}</td>
                  <td className="px-5 py-3.5 text-white/50 text-[13px]">{o.date}</td>
                  <td className="px-5 py-3.5 text-white font-semibold text-[13px]">{o.total}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-md ${STATUS_CLS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelected(o)}
                      className="bg-[#7f77dd] hover:bg-[#9088e8] text-white text-[10px]
                        font-bold tracking-widest uppercase px-4 py-1.5 rounded-md transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-bold text-base mb-4">Order Details</h3>
            <div className="flex flex-col gap-3 text-[13px]">
              {[
                ["Order ID",  selected.id],
                ["Customer",  selected.customer],
                ["Date",      selected.date],
                ["Total",     selected.total],
                ["Status",    selected.status],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40 font-medium">{label}</span>
                  <span className="text-white font-semibold">{val}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full bg-[#7f77dd] hover:bg-[#9088e8] text-white font-bold
                text-[12px] tracking-widest uppercase py-2.5 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}