"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

import {
  LayoutDashboard,
  List,
  ShoppingCart,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    key: "products",
    label: "Product List",
    href: "/admin/productlist",
    icon: List,
  },

  {
    key: "orders",
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarRef = useRef(null);
  const itemsRef = useRef([]);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.35,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const Content = () => (
    <div className="flex flex-col h-full">
      {/* User Row */}
      <div className="flex items-center gap-3 px-5 py-[18px] border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#7f77dd] flex items-center justify-center shrink-0">
          <User size={14} className="text-white" />
        </div>

        <span className="text-white font-bold text-[11px] tracking-[0.12em] uppercase truncate">
          Admin
        </span>

        <button
          className="ml-auto lg:hidden text-white/40"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4 flex flex-col gap-1">
        {NAV_ITEMS.map(({ key, label, href, icon: Icon }, i) => {
          const active = pathname === href;

          return (
            <Link
              href={href}
              key={key}
              ref={(el) => (itemsRef.current[i] = el)}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 w-full px-4 py-[11px] rounded-lg
                text-[11.5px] font-bold tracking-[0.1em] uppercase text-left
                transition-all duration-200
                ${
                  active
                    ? "bg-[#7f77dd] text-white shadow-lg shadow-[#7f77dd]/25"
                    : "text-white/45 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon size={15} strokeWidth={2} />

              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          className="flex items-center gap-3 w-full px-4 py-[11px] rounded-lg
          text-[11.5px] font-bold tracking-[0.1em] uppercase text-left
          text-white/30 hover:text-white/60 transition-all duration-200"
        >
          <LogOut size={15} strokeWidth={2} />

          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#7f77dd] p-2 rounded-lg text-white"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-[220px] z-50 transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#1a1726" }}
      >
        <Content />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        ref={sidebarRef}
        className="hidden lg:flex flex-col w-[220px] shrink-0 h-screen sticky top-0"
        style={{ background: "#1a1726" }}
      >
        <Content />
      </aside>
    </>
  );
}