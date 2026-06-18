"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Plus, Pencil, Trash2, X, ImagePlus } from "lucide-react";

const MAX_IMAGES = 6;

// ─────────────────────────────────────────────────────────────────────────
// FORM (create + edit, shared)
// ─────────────────────────────────────────────────────────────────────────
function HeroSlideForm({ initial, onSave, onCancel, saving }) {
  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    subTitle: initial?.subTitle ?? "",
    description: initial?.description ?? "",
    isActive: initial?.isActive ?? true,
    images: [], // newly selected File objects
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
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

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_IMAGES);
    if (e.target.files.length > MAX_IMAGES) {
      alert(`You can upload a maximum of ${MAX_IMAGES} images. Only the first ${MAX_IMAGES} were kept.`);
    }
    setForm((prev) => ({ ...prev, images: files }));
  };

  const removeNewImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.subTitle) {
      alert("Title and subtitle are required");
      return;
    }

    if (!initial && form.images.length === 0) {
      alert("Please add at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subTitle", form.subTitle);
    formData.append("description", form.description);
    formData.append("isActive", form.isActive);

    form.images.forEach((file) => formData.append("images", file));

    onSave(formData);
  };

  const inputCls =
    "w-full bg-[#13111f] border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#7f77dd] transition-colors";

  const hasNewImages = form.images.length > 0;
  const existingImages = initial?.images ?? [];

  return (
    <div className="p-5 md:p-7">
      <div
        ref={formRef}
        className="rounded-xl overflow-hidden max-w-2xl mx-auto"
        style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between" style={{ background: "#6d28d9" }}>
          <span className="text-white font-bold text-[15px]">
            {initial ? "Edit Hero Slide" : "Add New Hero Slide"}
          </span>
          <button onClick={onCancel} className="text-white/70 hover:text-white">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          {/* TITLE */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Designed To Stand Out."
              className={inputCls}
            />
            <p className="text-white/25 text-[10.5px] mt-1.5">Use a line break (\n) for a two-line heading.</p>
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">Subtitle / Label</label>
            <input
              name="subTitle"
              value={form.subTitle}
              onChange={handleChange}
              placeholder="Textured Short Sleeve Shirt"
              className={inputCls}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Elevated essentials. Timeless fits."
              className={inputCls}
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-white/70 text-[12px] mb-2">
              Images <span className="text-white/35">(up to {MAX_IMAGES} — first one is used as the main hero image)</span>
            </label>

            <label
              htmlFor="hero-images"
              className="flex items-center justify-center gap-2 w-full border border-dashed border-white/15 rounded-lg px-4 py-5 text-white/45 text-[12px] cursor-pointer hover:border-[#7f77dd] hover:text-white/70 transition-colors"
            >
              <ImagePlus size={16} strokeWidth={1.8} />
              {hasNewImages ? `${form.images.length} image(s) selected` : "Click to select images"}
            </label>
            <input
              id="hero-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="hidden"
            />

            <div className="flex gap-2 mt-3 flex-wrap">
              {/* existing images, shown only if no new ones picked (edit mode) */}
              {!hasNewImages &&
                existingImages.map((img, i) => (
                  <div key={`old-${img.id ?? i}`} className="relative w-16 h-20 rounded overflow-hidden">
                    <img src={img.url} className="w-full h-full object-cover opacity-70" alt="" />
                    {i === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-[#7f77dd] text-white text-[8px] font-bold text-center py-0.5">
                        MAIN
                      </span>
                    )}
                  </div>
                ))}

              {/* newly selected images */}
              {form.images.map((file, i) => (
                <div
                  key={`new-${i}`}
                  className="relative w-16 h-20 rounded overflow-hidden ring-2 ring-[#7f77dd] group"
                >
                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="" />
                  {i === 0 && (
                    <span className="absolute bottom-0 inset-x-0 bg-[#7f77dd] text-white text-[8px] font-bold text-center py-0.5">
                      MAIN
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>

            {hasNewImages && existingImages.length > 0 && (
              <p className="text-white/25 text-[10.5px] mt-2">
                Saving will replace all existing images for this slide with the new selection.
              </p>
            )}
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2 text-white/70 text-[12px]">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span>Active (visible on storefront)</span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#7f77dd] hover:bg-[#9088e8] disabled:opacity-50 text-white font-bold text-[12px] uppercase py-3 rounded-lg transition-colors"
            >
              {saving ? "Saving..." : initial ? "Update Slide" : "Save Slide"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 bg-white/5 hover:bg-white/10 text-white/60 font-bold text-[12px] uppercase py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function HeroSlidesPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // "list" | "form"
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/heroslide", { cache: "no-store" });
      const data = await res.json();
      setSlides(data.slides ?? []);
    } catch (err) {
      console.log(err);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setView("form");
  };

  const openEdit = (slide) => {
    setEditing(slide);
    setView("form");
  };

  const closeForm = () => {
    setView("list");
    setEditing(null);
  };

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      const url = editing ? `/api/heroslide/${editing.id}` : "/api/heroslide";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save slide");
      }

      await fetchSlides();
      closeForm();
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this hero slide? This cannot be undone.")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/heroslide/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete slide");
      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (view === "form") {
    return (
      <HeroSlideForm
        initial={editing}
        onSave={handleSave}
        onCancel={closeForm}
        saving={saving}
      />
    );
  }

  return (
    
    <div className="p-5 md:p-7 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[17px] font-bold tracking-wide">Hero Slides</h1>
          <p className="text-white/35 text-[12px] mt-1">
            Manage the gallery shown on your storefront's hero section ({slides.length} slides, max {MAX_IMAGES} images each)
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#7f77dd] hover:bg-[#9088e8] transition-colors px-4 py-2.5 rounded-lg text-[12px] font-bold uppercase"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Slide
        </button>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {loading ? (
          <div className="p-10 text-center text-white/35 text-[13px]">Loading hero slides...</div>
        ) : slides.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-white/35 text-[13px] mb-3">No hero slides yet.</p>
            <button
              onClick={openAdd}
              className="text-[#9088e8] text-[12px] font-bold uppercase underline underline-offset-2"
            >
              Create your first slide
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/40 text-[11px] uppercase tracking-wide">
                  <th className="px-5 py-3 font-semibold">Images</th>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Subtitle</th>
                  <th className="px-5 py-3 font-semibold">Description</th>
                  <th className="px-5 py-3 font-semibold">Active</th>
                  <th className="px-5 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {slides.map((slide) => (
                  <tr key={slide.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        {(slide.images ?? []).slice(0, 4).map((img, i) => (
                          <div key={img.id ?? i} className="w-10 h-12 rounded overflow-hidden shrink-0">
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {(slide.images?.length ?? 0) > 4 && (
                          <div className="w-10 h-12 rounded bg-white/5 flex items-center justify-center text-white/40 text-[10px] shrink-0">
                            +{slide.images.length - 4}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-[200px]">
                      <p className="truncate text-white/85">{slide.title}</p>
                    </td>
                    <td className="px-5 py-3 max-w-[180px]">
                      <p className="truncate text-white/55">{slide.subTitle}</p>
                    </td>
                    <td className="px-5 py-3 max-w-[200px]">
                      <p className="truncate text-white/55">{slide.description}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          slide.isActive
                            ? "bg-green-500/15 text-green-400"
                            : "bg-white/5 text-white/35"
                        }`}
                      >
                        {slide.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(slide)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#7f77dd]/20 text-white/60 hover:text-[#9088e8] transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => handleDelete(slide.id)}
                          disabled={deletingId === slide.id}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors disabled:opacity-40"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}