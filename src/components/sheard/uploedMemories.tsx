
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ImagePlus, X } from "lucide-react";

export function UploadMemories() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      setError("Please upload a memory image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/memories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to upload memory");
      }

      const data = await res.json();
      console.log("Saved Memory:", data);

      setFormData({
        title: "",
        date: "",
        category: "",
        location: "",
        description: "",
        imageUrl: "",
      });

      setImagePreview("");
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setError("");
      }}
    >
      <DialogTrigger
        render={
          <Button variant="outline" className="px-4 text-md">
            <Upload className="mr-2 h-4 w-4" />
            Upload Memories
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload New Memory</DialogTitle>
            <DialogDescription>
              Add details about your memory below. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-4 space-y-3">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. 2025 School Picnic"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g. Picnic"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Green Valley"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Field>

            {/* ImgBB Image Upload */}
            <Field>
              <Label>Memory Image</Label>

              <div className="relative">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 transition hover:border-blue-400 hover:bg-blue-50">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Memory Preview"
                      width={500}
                      height={300}
                      unoptimized
                      className="max-h-52 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <ImagePlus size={28} />
                    </div>
                  )}

                  <span className="mt-3 text-sm font-semibold text-gray-700">
                    {imageLoading
                      ? "Uploading Image..."
                      : imagePreview
                        ? "Change Memory Image"
                        : "Click to Upload Image"}
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
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
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Write a short story about this moment..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={loading || imageLoading}
            >
              {loading
                ? "Saving..."
                : imageLoading
                  ? "Uploading Image..."
                  : "Save Memory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
