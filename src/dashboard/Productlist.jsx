"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddProductPage from "./Addproduct";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const refresh = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    refresh();
  };

  const handleSave = async (data) => {
    if (editItem) {
      await fetch(`/api/products/${editItem.id}`, {
        method: "PUT",
      body: data,
      });
    } else {
    await fetch("/api/products", {
  method: "POST",
  body: data,
});
    }

    setShowAdd(false);
    setEditItem(null);
    refresh();
  };

  if (showAdd || editItem) {
    return (
      <AddProductPage
        initial={editItem}
        onSave={handleSave}
        onCancel={() => {
          setShowAdd(false);
          setEditItem(null);
        }}
      />
    );
  }

  return (
    <>
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-2 mb-4 text-white/50 hover:text-white text-[11px] font-bold tracking-[0.12em] uppercase transition-colors"
      >
        ← Back to Dashboard
      </Link>

      {/* CONTAINER */}
      <div className="p-6 text-white bg-[#0f0f1a] min-h-screen rounded-xl">

        {/* HEADER ROW */}
        <div className="flex items-center justify-between mb-6 bg-[#1a1a2e] px-5 py-4 rounded-xl border border-white/[0.06]">
          
          <h1 className="text-lg font-bold tracking-tight">Product List</h1>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-purple-600 hover:bg-purple-500 active:scale-95 px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 shadow-lg shadow-purple-900/40"
          >
            + Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-white/[0.08] bg-white/[0.03]">
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">Image</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">Name</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">Price</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">Gender</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">New</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">Actions</th>
                <th className="px-4 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/40">Description</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors duration-100">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 items-start">

                      {/* MAIN */}
                      <img
                        src={p.image}
                        alt=""
                        width={100}
                        height={80}
                        className="rounded-lg object-cover border border-white/10"
                      />

                      {/* THUMBS */}
                      <div className="flex gap-1">
                        {(p.images || []).slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            width={40}
                            height={40}
                            className="rounded-md object-cover border border-white/10"
                          />
                        ))}
                      </div>

                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-white/90">{p.name}</td>
                  <td className="px-4 py-3 text-white/70 font-mono">{p.price}</td>
                  <td className="px-4 py-3 text-white/60 capitalize">{p.gender}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      p.isNewArrival
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-white/5 text-white/30"
                    }`}>
                      {p.isNewArrival ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditItem(p)}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-purple-600/20 hover:bg-purple-600/35 text-purple-300 transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-[12px] max-w-[180px]">
                    <span className="line-clamp-2">{p.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}