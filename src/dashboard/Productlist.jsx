"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddProductPage from "./Addproduct";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await handleDelete(deleteTarget.id);
    setDeleteTarget(null);
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

          <div>
            <h1 className="text-lg font-bold tracking-tight">Product List</h1>
            <p className="text-white/35 text-[12px] mt-0.5">
              {products.length} product{products.length === 1 ? "" : "s"} in your catalog
            </p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="bg-purple-600 hover:bg-purple-500 active:scale-95 px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 shadow-lg shadow-purple-900/40"
          >
            + Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-white/[0.06] shadow-xl shadow-black/20">
          <table className="w-full text-sm table-fixed">
            <colgroup>
              <col className="w-[150px]" />
              <col className="w-[160px]" />
              <col className="w-[90px]" />
              <col className="w-[90px]" />
              <col className="w-[70px]" />
              <col className="w-[190px]" />
              <col />
            </colgroup>
            <thead>
              <tr className="text-left border-b border-white/[0.08] bg-white/[0.03]">
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">Image</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">Name</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">Price</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">Gender</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">New</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">Actions</th>
                <th className="px-4 py-3.5 text-[11px] font-semibold tracking-widest uppercase text-white/40">Description</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.05] hover:bg-white/[0.025] transition-colors duration-100 align-top">
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2 items-start">

                      {/* MAIN */}
                      <img
                        src={p.image}
                        alt=""
                        width={100}
                        height={80}
                        className="rounded-lg object-cover border border-white/10 w-[100px] h-[80px]"
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
                            className="rounded-md object-cover border border-white/10 w-10 h-10"
                          />
                        ))}
                      </div>

                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-white/90 align-middle">
                    <span className="line-clamp-2 leading-snug">{p.name}</span>
                  </td>
                  <td className="px-4 py-4 text-white/70 font-mono align-middle">{p.price}</td>
                  <td className="px-4 py-4 text-white/60 capitalize align-middle">{p.gender}</td>
                  <td className="px-4 py-4 align-middle">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      p.isNewArrival
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-white/5 text-white/30"
                    }`}>
                      {p.isNewArrival ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="px-4 py-4 align-middle">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <button
                        onClick={() => setEditItem(p)}
                        className="shrink-0 px-4 py-2 rounded-lg text-[12px] font-semibold bg-purple-600/20 hover:bg-purple-600/35 text-purple-300 transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="shrink-0 px-4 py-2 rounded-lg text-[12px] font-semibold bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/50 text-[13px] leading-relaxed align-middle">
                    <p className="whitespace-pre-wrap break-words">{p.description}</p>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-white/30 text-[13px]">
                    No products yet. Click "Add Product" to create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-2xl mb-4">
                ⚠
              </div>
              <h2 className="text-white font-bold text-[16px]">Delete this product?</h2>
              <p className="text-white/45 text-[13px] mt-2 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-white/80 font-medium">
                  {deleteTarget.name || "this product"}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 px-6 py-6">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 font-bold text-[12px] uppercase tracking-wider py-3 rounded-lg transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500/90 hover:bg-red-500 text-white font-bold text-[12px] uppercase tracking-wider py-3 rounded-lg transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}