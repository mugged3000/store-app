"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Plus, Pencil, Trash2, X, ImagePlus, AlertTriangle } from "lucide-react";

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
    "w-full bg-[#13111f] border border-white/10 rounded-lg px-4 py-3 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#7f77dd] focus:ring-1 focus:ring-[#7f77dd]/30 transition-colors";

  const labelCls = "block text-white/70 text-[12px] font-semibold tracking-wide mb-2";

  const hasNewImages = form.images.length > 0;
  const existingImages = initial?.images ?? [];

  // what's shown in the big preview: first new image, else first existing image
  const previewSrc = hasNewImages
    ? URL.createObjectURL(form.images[0])
    : existingImages[0]?.url;

  return (
    <div className="p-5 md:p-8 bg-[#0f0f1a] min-h-screen">
      <div
        ref={formRef}
        className="rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-2xl shadow-black/40"
        style={{ background: "#1e1b2e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* HEADER */}
        <div
          className="px-7 py-5 border-b border-white/10 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)" }}
        >
          <div>
            <span className="text-white font-bold text-[17px] tracking-tight">
              {initial ? "Edit Hero Slide" : "Add New Hero Slide"}
            </span>
            <p className="text-white/60 text-[12px] mt-0.5">
              {initial
                ? "Update this slide's content and images."
                : "Create a new slide for your storefront's hero gallery."}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-7 flex flex-col gap-7">
          {/* TITLE + SUBTITLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Designed To Stand Out."
                className={inputCls}
              />
              <p className="text-white/25 text-[10.5px] mt-1.5">Use a line break (\n) for a two-line heading.</p>
            </div>

            <div>
              <label className={labelCls}>Subtitle / Label</label>
              <input
                name="subTitle"
                value={form.subTitle}
                onChange={handleChange}
                placeholder="Textured Short Sleeve Shirt"
                className={inputCls}
              />
            </div>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* IMAGES */}
          <div>
            <label className={labelCls}>
              Images <span className="text-white/35 font-normal">(up to {MAX_IMAGES} — first one is used as the main hero image)</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* BIG MAIN PREVIEW */}
              {previewSrc && (
                <div className="w-full sm:w-56 h-72 shrink-0 relative rounded-xl overflow-hidden border border-white/10 bg-[#13111f]">
                  <img src={previewSrc} alt="main preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-[#7f77dd] text-white text-[10px] font-bold text-center py-1.5 tracking-wide uppercase">
                    Main Image
                  </span>
                </div>
              )}

              <div className="w-full flex-1">
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

                {/* thumbnail strip of all selected/existing images */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {!hasNewImages &&
                    existingImages.map((img, i) => (
                      <div key={`old-${img.id ?? i}`} className="relative w-16 h-20 rounded-lg overflow-hidden border border-white/10">
                        <img src={img.url} className="w-full h-full object-cover opacity-70" alt="" />
                        {i === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-[#7f77dd] text-white text-[8px] font-bold text-center py-0.5">
                            MAIN
                          </span>
                        )}
                      </div>
                    ))}

                  {form.images.map((file, i) => (
                    <div
                      key={`new-${i}`}
                      className="relative w-16 h-20 rounded-lg overflow-hidden ring-2 ring-[#7f77dd] group"
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
                  <p className="text-white/25 text-[10.5px] mt-3">
                    Saving will replace all existing images for this slide with the new selection.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* DESCRIPTION */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="Elevated essentials. Timeless fits."
              className={`${inputCls} resize-y min-h-[140px] leading-relaxed`}
            />
          </div>

          {/* ACTIVE */}
          <label className="flex items-center gap-3 text-white/70 text-[12px] font-medium bg-[#13111f] border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition-colors w-fit">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7f77dd]"
            />
            <span>Active (visible on storefront)</span>
          </label>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-3 border-t border-white/[0.06] mt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#7f77dd] hover:bg-[#9088e8] disabled:opacity-50 active:scale-[0.99] text-white font-bold text-[12px] uppercase tracking-wider py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-[#7f77dd]/20"
            >
              {saving ? "Saving..." : initial ? "Update Slide" : "Save Slide"}
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
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleteTarget(null);
    await handleDelete(id);
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
          className="flex items-center gap-2 bg-[#7f77dd] hover:bg-[#9088e8] active:scale-95 transition-all duration-150 px-5 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-wide shadow-lg shadow-[#7f77dd]/20"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Slide
        </button>
      </div>

      <div
        className="rounded-xl overflow-hidden shadow-xl shadow-black/20"
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
            <table className="w-full text-[13px] table-fixed">
              <colgroup>
                <col className="w-[180px]" />
                <col className="w-[170px]" />
                <col className="w-[160px]" />
                <col className="w-[90px]" />
                <col className="w-[110px]" />
                <col />
              </colgroup>
              <thead>
                <tr className="border-b border-white/10 text-left text-white/40 text-[11px] uppercase tracking-wide">
                  <th className="px-5 py-3.5 font-semibold">Images</th>
                  <th className="px-5 py-3.5 font-semibold">Title</th>
                  <th className="px-5 py-3.5 font-semibold">Subtitle</th>
                  <th className="px-5 py-3.5 font-semibold">Active</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Action</th>
                  <th className="px-5 py-3.5 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {slides.map((slide) => (
                  <tr key={slide.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors align-top">
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {(slide.images ?? []).slice(0, 4).map((img, i) => (
                          <div key={img.id ?? i} className="w-11 h-14 rounded-md overflow-hidden shrink-0 border border-white/10">
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {(slide.images?.length ?? 0) > 4 && (
                          <div className="w-11 h-14 rounded-md bg-white/5 flex items-center justify-center text-white/40 text-[10px] shrink-0">
                            +{slide.images.length - 4}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <p className="line-clamp-2 leading-snug text-white/85 font-medium">{slide.title}</p>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <p className="line-clamp-2 leading-snug text-white/55">{slide.subTitle}</p>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          slide.isActive
                            ? "bg-green-500/15 text-green-400"
                            : "bg-white/5 text-white/35"
                        }`}
                      >
                        {slide.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                        <button
                          onClick={() => openEdit(slide)}
                          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#7f77dd]/20 text-white/60 hover:text-[#9088e8] transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(slide)}
                          disabled={deletingId === slide.id}
                          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors disabled:opacity-40"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-middle text-white/50 text-[13px] leading-relaxed">
                      <p className="whitespace-pre-wrap break-words">{slide.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                <AlertTriangle size={22} strokeWidth={2} />
              </div>
              <h2 className="text-white font-bold text-[16px]">Delete this hero slide?</h2>
              <p className="text-white/45 text-[13px] mt-2 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-white/80 font-medium">
                  {deleteTarget.title || "this slide"}
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
    </div>
  );
}