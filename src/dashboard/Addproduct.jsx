"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function AddProductPage({ initial, onSave, onCancel }) {
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: initial?.name ?? "",
    price: initial?.price ?? "",
    description: initial?.description ?? "",

    image: null,
    images: [],

    gender: initial?.gender ?? "",
    isNewArrival: initial?.isNewArrival ?? false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✔ FIXED: replace instead of append
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: files, // 🔥 IMPORTANT FIX (NO MORE DUPLICATES)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name and price are required");
      return;
    }
  
    if (!initial && !form.image) {
      alert("Main image is required");
      return;
    }

    if (!initial && (!form.images || form.images.length < 1)) {
      alert("At least 1 thumbnail image is required");
      return;
    }

    // if (!initial && !form.gender) {
    //   alert("Gender is required");
    //   return;
    // }
   

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (form.gender) {
  formData.append("gender", form.gender);
}
    formData.append("isNewArrival", form.isNewArrival);

    if (form.image) {
      formData.append("image", form.image);
    }

    form.images.forEach((file) => {
      formData.append("images", file);
    });

    onSave(formData);
  };

  const inputCls =
    "w-full bg-[#13111f] border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#7f77dd] focus:ring-1 focus:ring-[#7f77dd]/30 transition-colors";

  const labelCls =
    "block text-white/70 text-[12px] font-semibold tracking-wide mb-2";

  const fileInputCls =
    "w-full text-white/60 text-[13px] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#7f77dd]/15 file:text-[#a9a2f0] file:text-[12px] file:font-semibold file:uppercase file:tracking-wide hover:file:bg-[#7f77dd]/25 file:cursor-pointer cursor-pointer bg-[#13111f] border border-dashed border-white/15 rounded-lg px-4 py-3 transition-colors hover:border-[#7f77dd]/40";

  const hasNewImages = form.images.length > 0;

  return (
    <div className="p-5 md:p-8 bg-[#0f0f1a] min-h-screen">
      <div
        ref={formRef}
        className="rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-2xl shadow-black/40"
        style={{
          background: "#1e1b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* HEADER */}
        <div
          className="px-7 py-5 border-b border-white/10 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)" }}
        >
          <div>
            <span className="text-white font-bold text-[17px] tracking-tight">
              {initial ? "Edit Product" : "Add New Product"}
            </span>
            <p className="text-white/60 text-[12px] mt-0.5">
              {initial
                ? "Update the details below and save your changes."
                : "Fill in the details below to add a new product to your catalog."}
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white/80 text-[18px]">
            {initial ? "✎" : "+"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-7 flex flex-col gap-7">

          {/* SECTION: BASIC INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* NAME */}
            <div>
              <label className={labelCls}>Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Silk Tailored Blazer"
                className={inputCls}
              />
            </div>

            {/* PRICE */}
            <div>
              <label className={labelCls}>Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className={inputCls}
              />
            </div>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* MAIN IMAGE */}
          <div>
            <label className={labelCls}>Main Image</label>
            <p className="text-white/30 text-[11px] mb-3">
              This is the primary image shown on the storefront and product cards.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {(form.image || initial?.image) && (
                <div className="w-full sm:w-64 h-64 shrink-0 relative rounded-xl overflow-hidden border border-white/10 bg-[#13111f]">
                  <img
                    src={
                      form.image
                        ? URL.createObjectURL(form.image)
                        : initial?.image
                    }
                    alt="main"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="w-full flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                  className={fileInputCls}
                />
                <p className="text-white/25 text-[11px] mt-2">
                  Recommended: square image, at least 800×800px.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* THUMBNAILS */}
          <div>
            <label className={labelCls}>Thumbnail Images</label>
            <p className="text-white/30 text-[11px] mb-3">
              Additional gallery images shown on the product detail page.
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className={fileInputCls}
            />

            <div className="flex gap-3 mt-4 flex-wrap">

              {/* OLD IMAGES ONLY IF NO NEW ONES */}
              {!hasNewImages &&
                (initial?.images || []).map((img, i) => (
                  <div
                    key={`old-${i}`}
                    className="w-20 h-20 relative rounded-lg overflow-hidden border border-white/10"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                ))}

              {/* NEW IMAGES */}
              {form.images.map((img, i) => (
                <div
                  key={`new-${i}`}
                  className="w-20 h-20 relative rounded-lg overflow-hidden ring-2 ring-[#7f77dd]"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* SECTION: GENDER + NEW ARRIVAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
            {/* GENDER */}
            <div>
              <label className={labelCls}>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="">Select Gender</option>
                <option value="men">MEN</option>
                <option value="women">WOMEN</option>
                <option value="shop">SHOP</option>
              </select>
            </div>

            {/* NEW ARRIVAL */}
            <label className="flex items-center gap-3 text-white/70 text-[12px] font-medium bg-[#13111f] border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition-colors">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={form.isNewArrival}
                onChange={handleChange}
                className="w-4 h-4 accent-[#7f77dd]"
              />
              <span>Mark as New Arrival</span>
            </label>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={7}
              placeholder="Describe the fabric, fit, and styling details of this piece..."
              className={`${inputCls} resize-y min-h-[160px] leading-relaxed`}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-3 border-t border-white/[0.06] mt-1">
            <button
              type="submit"
              className="flex-1 bg-[#7f77dd] hover:bg-[#9088e8] active:scale-[0.99] text-white font-bold text-[12px] uppercase tracking-wider py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-[#7f77dd]/20"
            >
              {initial ? "Update Product" : "Save Product"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-7 bg-white/5 hover:bg-white/10 text-white/60 font-bold text-[12px] uppercase tracking-wider py-3.5 rounded-lg transition-colors duration-150"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}