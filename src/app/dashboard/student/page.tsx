"use client";

import React, { useState } from "react";
import {
  User,
  Hash,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import Image from "next/image";
import { GrFacebook } from "react-icons/gr";

type StudentFormData = {
  fullName: string;
  rollNumber: string;
  batchYear: string;
  group: string;
  email: string;
  phone: string;
  photoUrl: string;
  address: string;
  facebookUrl: string;
};

const INITIAL_FORM: StudentFormData = {
  fullName: "",
  rollNumber: "",
  batchYear: "",
  group: "Science",
  email: "",
  phone: "",
  photoUrl: "",
  address: "",
  facebookUrl: "",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function StudentForm() {
  const [formData, setFormData] = useState<StudentFormData>(INITIAL_FORM);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        photoUrl: result.url,
      }));

      setImagePreview(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setImageLoading(false);
      e.target.value = "";
    }
  };

  // Remove Image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      photoUrl: "",
    }));

    setImagePreview("");
  };

  // Submit Student Form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.rollNumber.trim() ||
      !formData.batchYear.trim()
    ) {
      setError("Please fill in Full Name, Roll Number, and SSC Batch Year.");
      return;
    }

    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch(`http://localhost:5000/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          fullName: formData.fullName.trim(),
          rollNumber: formData.rollNumber.trim(),
          batchYear: formData.batchYear.trim(),
        }),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to save student.");
      }

      console.log("Saved student:", result);

      setSubmitted(true);
      setFormData(INITIAL_FORM);
      setImagePreview("");
    } catch (err) {
      console.error("Submit error:", err);

      setError(
        err instanceof Error ? err.message : "Cannot connect to server.",
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
              <GraduationCap size={24} />
            </div>

            <div>
              <h2 className="text-lg font-extrabold tracking-wide sm:text-xl">
                Student Information Form
              </h2>

              <p className="text-xs text-slate-300">
                Add or update student profile for{" "}
                <span className="font-semibold text-[#F6D978]">
                  SHERUA ADARSHA HIGH SCHOOL
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
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
              Student record submitted successfully.
            </div>
          )}

          {/* Full Name & Roll */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Full Name *
              </label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Student full name"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Roll Number *
              </label>

              <div className="relative">
                <Hash
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="rollNumber"
                  required
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="e.g. 102"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
            </div>
          </div>

          {/* Batch & Group */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                SSC Batch Year *
              </label>

              <div className="relative">
                <GraduationCap
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="batchYear"
                  required
                  value={formData.batchYear}
                  onChange={handleChange}
                  placeholder="e.g. 2026"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Facebook Profile Link
              </label>

              <div className="relative">
                <GrFacebook
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="url"
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  placeholder="https://www.facebook.com/username"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Group
              </label>

              <div className="relative">
                <BookOpen
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                >
                  <option value="Science">Science</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Business Studies">Business Studies</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@email.com"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className="w-full rounded-xl border border-[#101B35]/15 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-[#101B35] outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* ImgBB Image Upload */}
          <div>
            <label className="mb-2 block text-xs font-bold text-[#101B35]">
              Student Photo
            </label>

            <div className="relative">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-slate-50 p-6 transition hover:bg-amber-50">
                {imagePreview ? (
                  <Image
                    width={400}
                    height={400}
                    src={imagePreview}
                    alt="Student Preview"
                    className="h-28 w-28 rounded-full border-4 border-[#D4AF37] object-cover"
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
                      ? "Change Student Photo"
                      : "Click to Upload Student Photo"}
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WEBP (Max 5MB)
                </span>

                {imageLoading && (
                  <div className="mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-[#D4AF37]" />
                  </div>
                )}

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

          {/* Address */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#101B35]">
              Address
            </label>

            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3.5 top-3 text-slate-400"
              />

              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="Village, Post Office, Upazila, District"
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
            {loading ? (
              "Saving Student..."
            ) : imageLoading ? (
              "Uploading Image..."
            ) : (
              <>
                Save Student
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
