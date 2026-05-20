"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, X, Menu, ChevronRight } from "lucide-react";

const NAV_LINKS = [
//   { label: "New In",      href: "/new-in",     badge: null,  sale: false },
  { label: "Men",         href: "/men",         badge: null,  sale: false },
  { label: "Women",       href: "/women",       badge: null,  sale: false },
  { label: "Shop All",      href: "/shop",      badge: null,  sale: false },
  { label: "Contact",        href: "/contact",        badge: null,  sale: false  },
//   { label: "Features",    href: "/features",    badge: "NEW", sale: false },
];

export default function Navbar() {
  const navRef         = useRef(null);
  const logoRef        = useRef(null);
  const linksRef       = useRef([]);
  const actionsRef     = useRef([]);
  const mobileMenuRef  = useRef(null);
  const overlayRef     = useRef(null);
  const searchBarRef   = useRef(null);
  const searchInputRef = useRef(null);

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount]                 = useState(2);


  const pathname = usePathname();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(logoRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6 })
        .fromTo(linksRef.current.filter(Boolean), { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, "-=0.38")
        .fromTo(actionsRef.current.filter(Boolean), { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }, "-=0.36");
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlay, { opacity: 1, duration: 0.28, ease: "power2.out", pointerEvents: "auto" });
      gsap.fromTo(menu, { x: "100%" }, { x: "0%", duration: 0.38, ease: "power3.out" });
      gsap.fromTo(menu.querySelectorAll(".mob-item"), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.32, stagger: 0.045, ease: "power2.out", delay: 0.14 });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, { opacity: 0, duration: 0.2, ease: "power2.in", pointerEvents: "none" });
      gsap.to(menu, { x: "100%", duration: 0.32, ease: "power3.in" });
    }
  }, [mobileOpen]);

  useEffect(() => {
    const bar = searchBarRef.current;
    if (!bar) return;
    if (searchOpen) {
      gsap.fromTo(bar, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.26, ease: "power3.out", transformOrigin: "top center" });
      setTimeout(() => searchInputRef.current?.focus(), 30);
    } else {
      gsap.to(bar, { scaleY: 0, opacity: 0, duration: 0.18, ease: "power2.in", transformOrigin: "top center" });
    }
  }, [searchOpen]);

  const pop   = (el) => gsap.to(el, { scale: 1.12, duration: 0.16, ease: "back.out(2.5)" });
  const unpop = (el) => gsap.to(el, { scale: 1,    duration: 0.18, ease: "power2.out" });
  const lift  = (el) => gsap.to(el, { y: -2, duration: 0.14, ease: "power2.out" });
  const drop  = (el) => gsap.to(el, { y: 0,  duration: 0.18, ease: "power2.inOut" });

  return (
    <>
      <header
        ref={navRef}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-400",
          scrolled ? "bg-[#080808]/80 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "bg-transparent",
        ].join(" ")}
      >
        {/* ── 56px slim nav row ── */}
        <div className="relative flex items-center justify-between max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[48px]">

          <Link href="/" ref={logoRef} style={{ fontFamily: "var(--font-syne)", opacity: 0 }}
            className="text-white font-bold tracking-[0.2em] text-[14px] uppercase select-none shrink-0 leading-none z-10">
            NEXORA
          </Link>

          {/* Centered desktop links */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7 list-none m-0 p-0 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href, badge, sale }, i) => (
              <li key={label} className="relative flex items-start gap-[3px]">
                <Link href={href}
                  ref={(el) => (linksRef.current[i] = el)}
                 
                  onMouseEnter={(e) => lift(e.currentTarget)}
                  onMouseLeave={(e) => drop(e.currentTarget)}
                  style={{ fontFamily: "var(--font-syne)", opacity: 0 }}
                  className={["relative text-[11px] font-semibold tracking-[0.09em] uppercase group transition-colors duration-200",
                    sale ? "text-[#C9A84C] hover:text-[#dfc070]" : pathname === href ? "text-white" : "text-white/55 hover:text-white",
                  ].join(" ")}>
                  {label}
                  <span className={["absolute -bottom-[2px] left-0 h-[0.5px] bg-white/70 transition-[width] duration-300 ease-out",
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"].join(" ")} />
                </Link>
                {badge && (
                  <span style={{ fontFamily: "var(--font-syne)" }}
                    className="mt-[-4px] inline-flex items-center bg-[#C9A84C] text-[#1a1000] text-[7px] font-bold tracking-[0.1em] uppercase px-[4px] py-[2px] rounded-[2px] leading-none shrink-0">
                    {badge}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <button ref={(el) => (actionsRef.current[0] = el)} aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              onMouseEnter={(e) => pop(e.currentTarget)} onMouseLeave={(e) => unpop(e.currentTarget)}
              style={{ opacity: 0 }} className="text-white/60 hover:text-white transition-colors flex items-center">
              {searchOpen ? <X size={17} strokeWidth={1.8} /> : <Search size={17} strokeWidth={1.8} />}
            </button>
            {/* <button ref={(el) => (actionsRef.current[1] = el)} aria-label="Account"
              onMouseEnter={(e) => pop(e.currentTarget)} onMouseLeave={(e) => unpop(e.currentTarget)}
              style={{ opacity: 0 }} className="hidden sm:flex text-white/60 hover:text-white transition-colors items-center">
              <User size={17} strokeWidth={1.8} />
            </button> */}
            <button ref={(el) => (actionsRef.current[2] = el)} aria-label="Wishlist"
              onMouseEnter={(e) => pop(e.currentTarget)} onMouseLeave={(e) => unpop(e.currentTarget)}
              style={{ opacity: 0 }} className="hidden sm:flex text-white/60 hover:text-white transition-colors items-center">
              <Heart size={17} strokeWidth={1.8} />
            </button>
            <button ref={(el) => (actionsRef.current[3] = el)} aria-label="Cart"
              onMouseEnter={(e) => pop(e.currentTarget)} onMouseLeave={(e) => unpop(e.currentTarget)}
              style={{ opacity: 0 }} className="relative text-white/60 hover:text-white transition-colors flex items-center">
              <ShoppingBag size={17} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span style={{ fontFamily: "var(--font-syne)" }}
                  className="absolute -top-[6px] -right-[7px] w-[15px] h-[15px] rounded-full bg-[#C9A84C] text-[#1a1000] text-[7.5px] font-bold flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
            <button aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-white/70 hover:text-white transition-colors flex items-center ml-1">
              {mobileOpen ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div ref={searchBarRef} style={{ transformOrigin: "top center", opacity: 0, transform: "scaleY(0)" }}
          className="border-t border-white/[0.07] bg-[#0d0d0d]/98">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-3">
            <div className="flex items-center gap-3 border border-white/[0.1] px-4 py-2.5 max-w-lg">
              <Search size={13} className="text-white/30 shrink-0" strokeWidth={1.8} />
              <input ref={searchInputRef} type="text" placeholder="Search styles, collections…"
                style={{ fontFamily: "var(--font-syne)" }}
                className="flex-1 bg-transparent text-white text-[12px] placeholder:text-white/25 outline-none tracking-wide" />
              <button onClick={() => setSearchOpen(false)} style={{ fontFamily: "var(--font-syne)" }}
                className="text-white/25 hover:text-white/55 transition-colors text-[9px] tracking-[0.14em] uppercase shrink-0">
                ESC
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div ref={overlayRef} onClick={() => setMobileOpen(false)} style={{ opacity: 0, pointerEvents: "none" }}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />

      {/* Mobile drawer */}
      <aside ref={mobileMenuRef} style={{ transform: "translateX(100%)", fontFamily: "var(--font-syne)" }}
        className="fixed top-0 right-0 h-full w-[80vw] max-w-[320px] z-50 bg-[#0b0b0b] border-l border-white/[0.07] flex flex-col">
        <div className="flex items-center justify-between px-5 h-[56px] border-b border-white/[0.07] shrink-0">
          <span className="text-white font-bold tracking-[0.2em] text-[13px] uppercase">NEXORA</span>
          <button onClick={() => setMobileOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 pt-2 pb-5 flex flex-col">
          {NAV_LINKS.map(({ label, href, badge, sale }) => (
            <Link key={label} href={href} onClick={() => setMobileOpen(false)}
              className="mob-item group flex items-center justify-between py-[12px] border-b border-white/[0.06] opacity-0">
              <span className={["text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors",
                sale ? "text-[#C9A84C]" : "text-white/65 group-hover:text-white"].join(" ")}>
                {label}
              </span>
              <div className="flex items-center gap-2">
                {badge && <span className="inline-flex items-center bg-[#C9A84C] text-[#1a1000] text-[6px] font-bold tracking-[0.1em] uppercase px-[4px] py-[2px] rounded-[2px] leading-none">{badge}</span>}
                <ChevronRight size={12} strokeWidth={1.6} className="text-white/18 group-hover:text-white/45 transition-colors" />
              </div>
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/[0.07] shrink-0 flex flex-col gap-3">
          <button className="mob-item opacity-0 flex items-center gap-2.5 text-white/45 hover:text-white/85 transition-colors text-[11px] tracking-[0.1em] uppercase">
            <User size={14} strokeWidth={1.8} /> My Account
          </button>
          <button className="mob-item opacity-0 flex items-center gap-2.5 text-white/45 hover:text-white/85 transition-colors text-[11px] tracking-[0.1em] uppercase">
            <Heart size={14} strokeWidth={1.8} /> Wishlist
          </button>
        </div>
      </aside>
    </>
  );
}