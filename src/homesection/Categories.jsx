
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    label: "Men",
    href: "/men",
    src: "/images/menset1.png",
    span: "col-span-1",
  },
  {
    label: "Women",
    href: "/women",
    src: "/images/categoryw2.png",
    span: "col-span-1",
  },
  {
    label: "Shop All",
    href: "/shop",
    src: "/images/unisex.png",
    span: "col-span-1",
  },
  {
    label: "Suite",
    href: "/shop",
    src: "/images/suite.png",
    span: "col-span-1",
  },
  {
    label: "Footwear",
    href: "/shop",
    src: "/images/shoecat.png",
    span: "col-span-1",
  },
];

export default function ShopByCategory() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", once: true },
        }
      );

      // Cards stagger reveal
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.085, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* Section header */}
        <div
          ref={headingRef}
          className="flex items-end justify-between mb-8 sm:mb-10"
          style={{ opacity: 0 }}
        >
          <div>
            <p className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
              Browse
            </p>
            <h2
              className="text-white font-bold leading-none"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(26px, 3.5vw, 46px)",
                letterSpacing: "-0.02em",
              }}
            >
              Shop By Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="group hidden sm:flex items-center gap-2 text-white/45 hover:text-white transition-colors duration-200 text-[11px] font-semibold tracking-[0.12em] uppercase shrink-0 pb-1"
          >
            View All Categories
            <ArrowRight
              size={13}
              strokeWidth={2}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.label}
              href={cat.href}
              ref={(el) => (cardsRef.current[idx] = el)}
              style={{ opacity: 0 }}
              className="group relative overflow-hidden bg-[#141210] aspect-[3/4] block"
            >
              {/* Image */}
              <Image
                src={cat.src}
                alt={cat.label}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(8,7,6,0.82) 0%, rgba(8,7,6,0.2) 55%, transparent 100%)",
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/8 transition-all duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <p className="text-white font-bold text-[15px] sm:text-[17px] tracking-[0.02em] leading-none mb-2">
                  {cat.label}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#C9A84C] text-[10px] font-semibold tracking-[0.14em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Shop Now
                  <ArrowRight size={10} strokeWidth={2.2} />
                </span>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 ring-0 group-hover:ring-[1px] ring-[#C9A84C]/30 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden flex justify-center">
          <Link
            href="/categories"
            className="flex items-center gap-2 text-white/45 hover:text-white transition-colors text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            View All Categories
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}