
"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  CalendarDays,
  MapPin,
  Tag,
  Type,
  FileText,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import Image from "next/image";

type MemoryFormData = {
  title: string;
  date: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
};

const INITIAL_FORM: MemoryFormData = {
  title: "",
  date: "",
  category: "School Event",
  location: "",
  description: "",
  imageUrl: "",
};

export default function AddMemoriesForm() {
  const [formData, setFormData] =
    useState<MemoryFormData>(INITIAL_FORM);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (submitted) setSubmitted(false);
  };

  // ImgBB Image Upload
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setImageLoading(true);
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Image upload failed");
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.url,
      }));

      setImagePreview(result.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Image upload failed"
      );
    } finally {
      setImageLoading(false);
      e.target.value = "";
    }
  };

  // Remove Image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));

    setImagePreview("");
  };

  // Submit Memory
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      setError("Please fill in Title, Date, and Description.");
      return;
    }

    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch(
        "http://localhost:5000/memories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
          }),
        }
      );

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          result?.message || "Failed to save memory."
        );
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM);
      setImagePreview("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Cannot connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="overflow-hidden rounded-3xl border border-[#101B35]/10 bg-white shadow-[0_20px_50px_rgba(16,27,53,0.10)]">

        {/* Header */}
        <div className="bg-[#101B35] px-6 py-6 text-white sm:px-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F6D978] to-[#B68A20] text-[#101B35] shadow-lg">
              <ImageIcon size={24} />
            </div>

            <div>
              <h2 className="text-lg font-extrabold tracking-wide sm:text-xl">
                Add New Memory
              </h2>

              <p className="text-xs text-slate-300">
                Save beautiful memories of{" "}
                <span className="font-semibold text-[#F6D978]">
                  SSC BATCH 2025
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6 sm:p-8"
        >
          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {submitted && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={17} />
              Memory saved successfully!
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Memory Title *
              </label>

              <div className="relative">
                <Type
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Farewell Ceremony"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Category
              </label>

              <div className="relative">
                <Tag
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                >
                  <option value="School Event">School Event</option>
                  <option value="Farewell">Farewell</option>
                  <option value="Picnic">Picnic</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural Program">Cultural Program</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Friends">Friends</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Event Date *
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Sherua School"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-xs font-bold text-[#101B35]">
              Memory Photo
            </label>

            <div className="relative">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-slate-50 p-6 transition hover:bg-amber-50">
                {imagePreview ? (
                  <Image
                    width={500}
                    height={300}
                    src={imagePreview}
                    alt="Memory Preview"
                    unoptimized
                    className="max-h-64 w-full rounded-xl border-2 border-[#D4AF37] object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-[#B68A20]">
                    <ImageIcon size={32} />
                  </div>
                )}

                <span className="mt-3 text-sm font-bold text-[#101B35]">
                  {imageLoading
                    ? "Uploading Image..."
                    : imagePreview
                      ? "Change Memory Photo"
                      : "Click to Upload Memory Photo"}
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WEBP (Max 5MB)
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  disabled={imageLoading}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={imageLoading}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
              Memory Description *
            </label>

            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3.5 top-3 text-slate-400"
              />

              <textarea
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Write something about this beautiful memory..."
                className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || imageLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F6D978] to-[#C69A2B] py-3 text-sm font-bold text-[#101B35] shadow-lg transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving Memory..."
              : imageLoading
                ? "Uploading Image..."
                : (
                  <>
                    Save Memory
                    <ArrowRight size={17} />
                  </>
                )}
          </button>
        </form>
      </div>
    </section>
  );
}
