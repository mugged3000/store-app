"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Inline SVG social icons (lucide-react v1.9 has no social icons)
const IcInstagram = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IcYoutube = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const FOOTER_LINKS = {
  Shop: [
    { label: "New In",      href: "/new-in",     badge: "New" },
    { label: "Men",         href: "/men"         },
    { label: "Women",       href: "/women"       },
    { label: "Unisex",      href: "/unisex"      },
    { label: "Collections", href: "/collections" },
    { label: "Sale",        href: "/sale"        },
    { label: "Gift Cards",  href: "/gift-cards"  },
  ],
  "Customer Care": [
    { label: "FAQs",        href: "/faq"        },
    { label: "Shipping",    href: "/shipping"   },
    { label: "Returns",     href: "/returns"    },
    { label: "Size Guide",  href: "/size-guide" },
    { label: "Track Order", href: "/track"      },
    { label: "Contact Us",  href: "/contact"    },
    { label: "Live Chat",   href: "/chat"       },
  ],
  About: [
    { label: "Our Story",     href: "/about"          },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers",        href: "/careers"       },
    { label: "Press",          href: "/press"         },
    { label: "Affiliates",     href: "/affiliates"    },
    { label: "Stockists",      href: "/stockists"     },
  ],
};

const SOCIALS = [
  { label: "Instagram", icon: IcInstagram, href: "https://instagram.com"             },
  { label: "TikTok",    icon: null,        href: "https://tiktok.com",   text: "TT" },
  { label: "Pinterest", icon: null,        href: "https://pinterest.com",text: "P"  },
  { label: "Twitter",   icon: null,        href: "https://twitter.com",  text: "X"  },
  { label: "YouTube",   icon: IcYoutube,   href: "https://youtube.com"               },
];

const PAYMENTS = ["VISA", "MC", "PayPal", "Klarna", "Apple Pay", "Google Pay", "Amex"];
const LEGAL    = ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Accessibility"];

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef   = useRef(null);
  const colsRef   = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: logoRef.current, start: "top 92%", once: true } }
      );
      gsap.fromTo(Array.from(colsRef.current?.children ?? []),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: colsRef.current, start: "top 92%", once: true } }
      );
      gsap.fromTo(Array.from(bottomRef.current?.children ?? []),
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 97%", once: true } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#080807] border-t border-white/[0.06]"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 pt-16 pb-10 sm:pt-20">

        {/* Top: brand + featured CTA */}
        <div
          ref={logoRef}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 mb-14 sm:mb-16"
          style={{ opacity: 0 }}
        >
          <div className="max-w-[280px]">
            <Link
              href="/"
              className="inline-block text-white font-bold tracking-[0.22em] text-[15px] uppercase mb-4 leading-none hover:text-[#C9A84C] transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              NEXORA
            </Link>
            <p className="text-white/32 text-[12.5px] leading-[1.78] font-light">
              Elevated essentials. Timeless fits.<br />Crafted for comfort, designed for everyone.
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              {SOCIALS.map(({ label, icon: Icon, href, text }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-white/[0.1] text-white/35 hover:text-white hover:border-white/35 transition-all duration-200"
                >
                  {Icon
                    ? <Icon size={13} strokeWidth={1.8} />
                    : <span className="text-[9px] font-bold">{text}</span>
                  }
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/collections/new-season"
            className="group hidden lg:flex items-center gap-3 border border-white/[0.08] px-6 py-4 hover:border-[#C9A84C]/40 transition-colors duration-250 self-start"
          >
            <div>
              <p className="text-[9.5px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-0.5">
                New Season
              </p>
              <p className="text-white text-[13px] font-semibold">
                SS &apos;26 Collection →
              </p>
            </div>
            <ArrowRight size={15} strokeWidth={1.6} className="text-white/20 group-hover:text-[#C9A84C] transition-colors" />
          </Link>
        </div>

        {/* Link columns */}
        <div
          ref={colsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 mb-14"
        >
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} style={{ opacity: 0 }}>
              <p className="text-white text-[10.5px] font-bold tracking-[0.2em] uppercase mb-5">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                {links.map(({ label, href, badge }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-white/38 hover:text-white/75 text-[12.5px] font-light transition-colors duration-200"
                    >
                      {label}
                      {badge && (
                        <span className="px-1.5 py-[2px] text-[#1a1000] text-[8px] font-bold tracking-[0.1em] uppercase bg-[#C9A84C] leading-none">
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div style={{ opacity: 0 }}>
            <p className="text-white text-[10.5px] font-bold tracking-[0.2em] uppercase mb-5">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3 text-[12.5px] text-white/38 font-light">
              <a href="mailto:hello@nexora.com" className="hover:text-white/70 transition-colors">
                hello@nexora.com
              </a>
              <a href="tel:+1234567890" className="hover:text-white/70 transition-colors">
                +1 (234) 567 890
              </a>
              <p className="text-white/22 text-[11.5px] leading-[1.7]">
                Mon–Fri: 9am – 6pm GMT<br />
                Weekend: 10am – 4pm GMT
              </p>
            </div>
          </div>

          {/* Payments */}
          <div style={{ opacity: 0 }}>
            <p className="text-white text-[10.5px] font-bold tracking-[0.2em] uppercase mb-5">
              Secure Payment
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {PAYMENTS.map((method) => (
                <div
                  key={method}
                  className="h-[22px] px-2.5 bg-white/[0.06] border border-white/[0.08] flex items-center justify-center"
                >
                  <span className="text-white/35 text-[8px] font-semibold tracking-wide">
                    {method}
                  </span>
                </div>
              ))}
            </div>
            {["SSL Secure", "PCI Compliant", "256-bit Encrypted"].map((cert) => (
              <div key={cert} className="flex items-center gap-1.5 mb-1">
                <span className="text-[#C9A84C] text-[10px]">✓</span>
                <span className="text-white/25 text-[10.5px] font-light">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-6" />

        {/* Bottom row */}
        <div
          ref={bottomRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap"
        >
          <p className="text-white/22 text-[11px] tracking-wide order-last sm:order-first" style={{ opacity: 0 }}>
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center" style={{ opacity: 0 }}>
            {LEGAL.map((label) => (
              <Link
                key={label}
                href="#"
                className="text-white/22 hover:text-white/50 text-[10.5px] tracking-wide transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <div style={{ opacity: 0 }}>
            <select
              className="bg-transparent border border-white/[0.1] text-white/35 text-[10.5px] px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]/40 transition-colors cursor-pointer hover:border-white/25"
              defaultValue="us"
            >
              <option value="us" style={{ background: "#080807" }}>🌍 Global — USD $</option>
              <option value="uk" style={{ background: "#080807" }}>🇬🇧 United Kingdom — GBP £</option>
              <option value="eu" style={{ background: "#080807" }}>🇪🇺 Europe — EUR €</option>
              <option value="ca" style={{ background: "#080807" }}>🇨🇦 Canada — CAD $</option>
              <option value="au" style={{ background: "#080807" }}>🇦🇺 Australia — AUD $</option>
            </select>
          </div>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="overflow-hidden select-none pointer-events-none">
        <p
          className="text-white/[0.025] font-bold text-center leading-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(80px, 18vw, 240px)",
            letterSpacing: "-0.04em",
          }}
        >
          NEXORA
        </p>
      </div>
    </footer>
  );
}