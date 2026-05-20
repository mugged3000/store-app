
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ImageIcon } from "lucide-react";

export default function AddProductPage({ initial, onSave, onCancel }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name:        initial?.name        ?? "",
    price:       initial?.price       ?? "",
    description: initial?.description ?? "",
    stock:       initial?.stock       ?? "",
    image:       initial?.image       ?? null,
    imagePreview:initial?.image       ?? null,
  });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: url, imagePreview: url }));
  };

  const handleFilePick = (e) => {
    handleImageFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleImageFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name:        form.name,
      price:       Number(form.price),
      description: form.description,
      stock:       Number(form.stock),
      image:       form.imagePreview ?? null,
    });
  };

  const inputCls = `w-full bg-[#13111f] border border-white/10 rounded-lg px-4 py-3
    text-white text-[13px] placeholder-white/25 focus:outline-none
    focus:border-[#7f77dd] transition-colors`;

  return (
    <div className="p-5 md:p-7">
      <div
        ref={formRef}
        className="rounded-xl overflow-hidden max-w-2xl mx-auto"
        style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10" style={{ background: "#6d28d9" }}>
          <span className="text-white font-bold text-[15px]">
            {initial ? "Edit Product" : "Add New Product"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          {/* Product Name */}
          <div>
            <label className="block text-white/70 text-[12px] font-semibold tracking-wide mb-2">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className={inputCls}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-white/70 text-[12px] font-semibold tracking-wide mb-2">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className={inputCls}
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-white/70 text-[12px] font-semibold tracking-wide mb-2">
              Product Image
            </label>
            <label
              className={`flex flex-col items-center justify-center w-full h-36 rounded-xl cursor-pointer
                border-2 border-dashed transition-all duration-200
                ${dragging ? "border-[#7f77dd] bg-[#7f77dd]/10" : "border-white/15 bg-[#13111f]"}
                hover:border-[#7f77dd]/60`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              {form.imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.imagePreview}
                  alt="preview"
                  className="h-full w-full object-contain rounded-xl p-2"
                />
              ) : (
                <>
                  <ImageIcon size={28} className="text-white/25 mb-2" />
                  <span className="text-white/35 text-[12px]">Click to upload image</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFilePick} />
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/70 text-[12px] font-semibold tracking-wide mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-white/70 text-[12px] font-semibold tracking-wide mb-2">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className={inputCls}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="flex-1 bg-[#7f77dd] hover:bg-[#9088e8] text-white font-bold
                text-[12px] tracking-widest uppercase py-3 rounded-lg transition-all duration-200"
            >
              {initial ? "Update Product" : "Save Product"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 bg-white/5 hover:bg-white/10 text-white/60 font-bold
                text-[12px] tracking-widest uppercase py-3 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}