
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import AddProductPage from "./Addproduct";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Red Ladies dress",    price: 1000, image: "/images/product1.png" },
  { id: 2, name: "Blue Heave dress",    price: 1200, image: "/images/product2.png" },
  { id: 3, name: "Ladies Casual Cloths",price: 1500, image: "/images/product3.png" },
  { id: 4, name: "SpringAutumnDress",   price: 1200, image: "/images/product4.png" },
  { id: 5, name: "Casual Dress",        price: 1400, image: "/images/product5.png" },
  { id: 6, name: "Formal Look",         price: 1500, image: "/images/product6.png" },
  { id: 7, name: "Sweter for men",      price: 600,  image: "/images/product7.png" },
];

export default function ProductListPage() {
  const [products, setProducts]   = useState(INITIAL_PRODUCTS);
  const [showAdd, setShowAdd]     = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const tableRef = useRef(null);
  const rowsRef  = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tableRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(rowsRef.current.filter(Boolean),
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.3, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (showAdd || editItem) {
    return (
      <AddProductPage
        initial={editItem}
        onSave={(data) => {
          if (editItem) {
            setProducts((prev) => prev.map((p) => p.id === editItem.id ? { ...p, ...data } : p));
            setEditItem(null);
          } else {
            setProducts((prev) => [...prev, { id: Date.now(), ...data }]);
            setShowAdd(false);
          }
        }}
        onCancel={() => { setShowAdd(false); setEditItem(null); }}
      />
    );
  }

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
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10"
          style={{ background: "#6d28d9" }}>
          <span className="text-white font-bold text-[15px] tracking-wide">Products List</span>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-[#7f77dd] hover:bg-[#9088e8] text-white text-[11px] font-bold
              tracking-widest uppercase px-5 py-2 rounded-lg transition-all duration-200"
          >
            Add New
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {["Image", "Name", "Price", "Actions"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-[10px] font-bold tracking-widest uppercase text-white/40
                      ${i === 3 ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  ref={(el) => (rowsRef.current[i] = el)}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  {/* Image */}
                  <td className="px-5 py-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.name}
                          width={44}
                          height={44}
                          className="object-cover w-full h-full"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <span className="text-white/30 text-[10px]">IMG</span>
                      )}
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-5 py-3 text-white font-medium text-[13px]">{p.name}</td>
                  {/* Price */}
                  <td className="px-5 py-3 text-white/70 font-semibold text-[13px]">{p.price}</td>
                  {/* Actions */}
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditItem(p)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white text-[10px]
                          font-bold tracking-widest uppercase px-4 py-1.5 rounded-md transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 hover:bg-red-400 text-white text-[10px]
                          font-bold tracking-widest uppercase px-4 py-1.5 rounded-md transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}