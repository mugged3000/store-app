// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { CATEGORIES_FILTER, SIZES, COLORS } from "@/unisexsection/Unisexdata";

// // ── Collapsible section ───────────────────────────────────────────────────────
// function FilterGroup({ title, defaultOpen = true, children }) {
//   const [open, setOpen] = useState(defaultOpen);
//   const bodyRef = useRef(null);

//   useEffect(() => {
//     if (!bodyRef.current) return;
//     gsap.to(bodyRef.current, {
//       height: open ? "auto" : 0,
//       opacity: open ? 1 : 0,
//       duration: 0.28,
//       ease: "power2.inOut",
//     });
//   }, [open]);

//   return (
//     <div className="border-b border-white/[0.07] pb-4 mb-4 last:border-b-0 last:mb-0">
//       <button
//         onClick={() => setOpen((v) => !v)}
//         className="flex items-center justify-between w-full mb-3 group"
//       >
//         <span
//           className="text-white text-[11px] font-bold tracking-[0.16em] uppercase group-hover:text-white/80 transition-colors"
//           style={{ fontFamily: "var(--font-syne)" }}
//         >
//           {title}
//         </span>
//         {open
//           ? <ChevronUp size={12} className="text-white/30" strokeWidth={2.5} />
//           : <ChevronDown size={12} className="text-white/30" strokeWidth={2.5} />}
//       </button>
//       <div ref={bodyRef} style={{ overflow: "hidden" }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// // ── Main sidebar ──────────────────────────────────────────────────────────────
// export default function UnisexFilterSidebar({
//   activeCategory, setActiveCategory,
//   activeSizes,    toggleSize,
//   activeColors,   toggleColor,
//   priceRange,     setPriceRange,
//   hasFilters,     resetFilters,
//   setCurrentPage,
// }) {
//   const safeActiveSizes  = activeSizes  ?? [];
//   const safeActiveColors = activeColors ?? [];
//   const safePriceRange   = priceRange   ?? [0, 200];

//   return (
//     <aside className="w-full" style={{ fontFamily: "var(--font-syne)" }}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.07]">
//         <p className="text-white text-[12px] font-bold tracking-[0.18em] uppercase">
//           Filters
//         </p>
//         {hasFilters && (
//           <button
//             onClick={resetFilters}
//             className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.1em] uppercase hover:text-[#d4b85a] transition-colors"
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {/* ── Category ── */}
//       <FilterGroup title="Category">
//         <div className="flex flex-col gap-0.5">
//           {["All", ...CATEGORIES_FILTER].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
//               className={`text-left text-[12px] py-1.5 tracking-wide transition-all duration-150 hover:translate-x-0.5 ${
//                 activeCategory === cat
//                   ? "text-[#C9A84C] font-semibold"
//                   : "text-white/45 hover:text-white/75"
//               }`}
//             >
//               {activeCategory === cat && (
//                 <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C] mr-2 align-middle mb-[1px]" />
//               )}
//               {cat}
//             </button>
//           ))}
//         </div>
//       </FilterGroup>

//       {/* ── Size ── */}
//       <FilterGroup title="Size">
//         <div className="flex flex-wrap gap-2">
//           {SIZES.map((s) => (
//             <button
//               key={s}
//               onClick={() => { toggleSize(s); setCurrentPage(1); }}
//               className={`w-10 h-10 text-[10.5px] font-bold uppercase border transition-all duration-150 ${
//                 safeActiveSizes.includes(s)
//                   ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10 scale-105"
//                   : "border-white/12 text-white/40 hover:border-[#C9A84C]/55 hover:text-[#C9A84C]/70"
//               }`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </FilterGroup>

//       {/* ── Color ── */}
//       <FilterGroup title="Color">
//         <div className="flex flex-wrap gap-2.5">
//           {COLORS.map(({ name, hex }) => (
//             <button
//               key={name}
//               title={name}
//               onClick={() => { toggleColor(name); setCurrentPage(1); }}
//               className="relative w-7 h-7 rounded-full transition-all duration-150 hover:scale-110"
//               style={{
//                 backgroundColor: hex,
//                 border: safeActiveColors.includes(name)
//                   ? "2px solid #C9A84C"
//                   : "2px solid rgba(255,255,255,0.14)",
//                 boxShadow: safeActiveColors.includes(name)
//                   ? "0 0 0 1px rgba(201,168,76,0.35)"
//                   : "none",
//                 transform: safeActiveColors.includes(name) ? "scale(1.12)" : undefined,
//               }}
//             />
//           ))}
//         </div>
//       </FilterGroup>

//       {/* ── Price ── */}
//       <FilterGroup title="Price" defaultOpen={true}>
//         <div className="px-1">
//           <div
//             className="flex justify-between text-[10px] text-white/40 mb-3"
//             style={{ fontFamily: "var(--font-syne)" }}
//           >
//             <span>${safePriceRange[0]}</span>
//             <span className="text-[#C9A84C] font-semibold">${safePriceRange[1]}</span>
//           </div>
//           <input
//             type="range"
//             min={0}
//             max={200}
//             value={safePriceRange[1]}
//             onChange={(e) => { setPriceRange([safePriceRange[0], Number(e.target.value)]); setCurrentPage(1); }}
//             className="w-full accent-[#C9A84C] cursor-pointer"
//             style={{ accentColor: "#C9A84C" }}
//           />
//           <div className="flex justify-between text-[9px] text-white/20 mt-1">
//             <span>$0</span><span>$200</span>
//           </div>
//         </div>
//       </FilterGroup>
//     </aside>
//   );
// }