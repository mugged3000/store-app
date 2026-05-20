
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

const STATS = [
  { icon: Package,     label: "Total Products", value: "24",     color: "#a78bfa" },
  { icon: ShoppingBag, label: "Total Orders",   value: "18",     color: "#60a5fa" },
  { icon: DollarSign,  label: "Total Revenue",  value: "$25,600",color: "#4ade80" },
];

const RECENT_ORDERS = [
  { id: "#ORD123", customer: "John Doe",      date: "Apr 23, 2026", status: "Pending",   total: "$1200" },
  { id: "#ORD122", customer: "Alice Smith",   date: "Apr 23, 2026", status: "Shipped",   total: "$1500" },
  { id: "#ORD121", customer: "Michael Brown", date: "Apr 22, 2026", status: "Delivered", total: "$800"  },
  { id: "#ORD120", customer: "Emily Davis",   date: "Apr 22, 2026", status: "Pending",   total: "$600"  },
  { id: "#ORD119", customer: "David Wilson",  date: "Apr 21, 2026", status: "Cancelled", total: "$400"  },
];

const STATUS_CLS = {
  Pending:   "bg-amber-500/20 text-amber-400",
  Shipped:   "bg-cyan-500/20 text-cyan-400",
  Delivered: "bg-green-500/20 text-green-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

export default function DashboardPage({ onViewAll }) {
  const cardsRef   = useRef([]);
  const tableRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(tableRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="p-5 md:p-7">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS.map(({ icon: Icon, label, value, color }, i) => (
          <div
            key={label}
            ref={(el) => (cardsRef.current[i] = el)}
            className="rounded-xl p-5 flex flex-col items-center gap-2 text-center"
            style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Icon size={28} style={{ color }} />
            <p className="text-white/50 text-[10px] font-semibold tracking-widest uppercase">
              {label}
            </p>
            <p className="text-white font-bold text-2xl leading-none">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div
        ref={tableRef}
        className="rounded-xl overflow-hidden"
        style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-bold text-sm tracking-wide">Recent Orders</span>
          <button
            onClick={onViewAll}
            className="text-[11px] font-semibold px-4 py-1.5 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
          >
            View All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Order ID", "Customer", "Date", "Status", "Total"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-[10px] font-bold tracking-widest uppercase text-white/40
                      ${i === 4 ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-5 py-3.5 text-white/50 text-[13px] font-medium">{o.id}</td>
                  <td className="px-5 py-3.5 text-white text-[13px] font-medium">{o.customer}</td>
                  <td className="px-5 py-3.5 text-white/50 text-[13px]">{o.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-md ${STATUS_CLS[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-white font-semibold text-[13px] text-right">{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}