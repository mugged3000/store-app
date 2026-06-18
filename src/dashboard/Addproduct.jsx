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
    "w-full bg-[#13111f] border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#7f77dd] transition-colors";

  const hasNewImages = form.images.length > 0;

  return (
    <div className="p-5 md:p-7">
      <div
        ref={formRef}
        className="rounded-xl overflow-hidden max-w-2xl mx-auto"
        style={{
          background: "#1e1b2e",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* HEADER */}
        <div
          className="px-6 py-4 border-b border-white/10"
          style={{ background: "#6d28d9" }}
        >
          <span className="text-white font-bold text-[15px]">
            {initial ? "Edit Product" : "Add New Product"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">

          {/* NAME */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputCls}
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className={inputCls}
            />
          </div>

          {/* MAIN IMAGE */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Main Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
              className={inputCls}
            />

            {(form.image || initial?.image) && (
              <div className="w-24 h-24 relative mt-3 rounded overflow-hidden">
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
          </div>

          {/* THUMBNAILS */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Thumbnail Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className={inputCls}
            />

            <div className="flex gap-2 mt-3 flex-wrap">

              {/* OLD IMAGES ONLY IF NO NEW ONES */}
              {!hasNewImages &&
                (initial?.images || []).map((img, i) => (
                  <div
                    key={`old-${i}`}
                    className="w-14 h-14 relative rounded overflow-hidden"
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
                  className="w-14 h-14 relative rounded overflow-hidden ring-2 ring-purple-500"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Gender
            </label>
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
          <div className="flex items-center gap-2 text-white/70 text-[12px]">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={form.isNewArrival}
              onChange={handleChange}
            />
            <span>Mark as New Arrival</span>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={inputCls}
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#7f77dd] hover:bg-[#9088e8] text-white font-bold text-[12px] uppercase py-3 rounded-lg"
            >
              {initial ? "Update Product" : "Save Product"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-6 bg-white/5 hover:bg-white/10 text-white/60 font-bold text-[12px] uppercase py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}