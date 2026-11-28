"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { toast } from "../ui/toast";
import Image from "next/image";

import { StudentItem } from "@/types/student";

export function StudentEdit({ student }: { student: StudentItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { email, group, fullName, phone, photoUrl: initialPhotoUrl } = student;

  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPhotoUrl(initialPhotoUrl || "");
  }, [initialPhotoUrl, open]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      toast.add({
        description: "NEXT_PUBLIC_IMGBB_API_KEY is missing!",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.data?.url) {
        setPhotoUrl(data.data.url);
        toast.add({
          description: "Image uploaded successfully!",
          type: "success",
        });
      } else {
        console.error("ImgBB response:", data);
        toast.add({
          description: data?.error?.message || "Image upload failed!",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.add({
        description: "Something went wrong while uploading!",
        type: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData(event.currentTarget);

    const updatedPayload = {
      fullName: formData.get("name"),
      email: formData.get("email"),
      group: formData.get("group"),
      phone: formData.get("phone"),
      photoUrl: photoUrl || initialPhotoUrl || "",
    };

    try {
      const res = await fetch(`http://localhost:5000/students/${student._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPayload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.add({
          description: "Edit Successfully! 🎉",
          type: "success",
        });
        setOpen(false);
        router.refresh();
      } else {
        console.log(data.message || "Failed to update student.");
        toast.add({
          description: data.message || "Failed to update student.",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error updating student:", err);
      toast.add({
        description: "Something went wrong!",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant={"outline"}
            className="h-11 rounded-full border border-transparent px-6 text-md font-semibold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.7)] transition hover:-translate-y-0.5 hover:text-white [background:linear-gradient(#0d0d18,#0d0d18)_padding-box,linear-gradient(120deg,#a78bfa,#22d3ee,#bef264)_border-box]"
          >
            Edit
          </Button>
        }
      />
      <DialogContent className="isolate max-h-[90vh] gap-7 overflow-y-auto rounded-[2rem] border border-transparent p-8 text-white shadow-[0_40px_120px_-20px_rgba(139,92,246,0.55)] before:absolute before:inset-x-12 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-lime-300 before:to-transparent after:pointer-events-none after:absolute after:-top-28 after:left-1/2 after:-z-10 after:h-56 after:w-80 after:-translate-x-1/2 after:rounded-full after:bg-violet-500/35 after:blur-3xl [background:linear-gradient(#0b0b16,#0b0b16)_padding-box,linear-gradient(150deg,rgba(255,255,255,0.35),rgba(255,255,255,0.05)_40%,rgba(167,139,250,0.5))_border-box] sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader className="gap-2">
            <DialogTitle className="text-3xl font-extrabold tracking-tighter text-white">
              Edit profile
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-slate-400">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Field className="gap-2 sm:col-span-2">
              <Label
                htmlFor="name-1"
                className="text-sm font-medium text-slate-300"
              >
                Name
              </Label>
              <Input
                id="name-1"
                type="text"
                name="name"
                defaultValue={fullName}
                className="h-13 rounded-2xl border-transparent bg-white/[0.06] px-5 text-base text-white shadow-inner ring-1 ring-white/10 transition placeholder:text-slate-500 hover:bg-white/[0.09] focus-visible:border-transparent focus-visible:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-lime-300/70"
              />
            </Field>

            <Field className="gap-2 sm:col-span-2">
              <Label
                htmlFor="email-1"
                className="text-sm font-medium text-slate-300"
              >
                Email
              </Label>
              <Input
                id="email-1"
                type="email"
                name="email"
                defaultValue={email}
                className="h-13 rounded-2xl border-transparent bg-white/[0.06] px-5 text-base text-white shadow-inner ring-1 ring-white/10 transition placeholder:text-slate-500 hover:bg-white/[0.09] focus-visible:border-transparent focus-visible:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-lime-300/70"
              />
            </Field>

            <Field className="gap-2">
              <Label
                htmlFor="username-1"
                className="text-sm font-medium text-slate-300"
              >
                Group
              </Label>
              <Input
                id="username-1"
                name="group"
                defaultValue={group}
                className="h-13 rounded-2xl border-transparent bg-white/[0.06] px-5 text-base text-white shadow-inner ring-1 ring-white/10 transition placeholder:text-slate-500 hover:bg-white/[0.09] focus-visible:border-transparent focus-visible:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-lime-300/70"
              />
            </Field>

            <Field className="gap-2">
              <Label
                htmlFor="phone-1"
                className="text-sm font-medium text-slate-300"
              >
                Phone
              </Label>
              <Input
                id="phone-1"
                type="tel"
                name="phone"
                defaultValue={phone}
                className="h-13 rounded-2xl border-transparent bg-white/[0.06] px-5 text-base text-white shadow-inner ring-1 ring-white/10 transition placeholder:text-slate-500 hover:bg-white/[0.09] focus-visible:border-transparent focus-visible:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-lime-300/70"
              />
            </Field>

            <Field className="gap-2 sm:col-span-2">
              <Label
                htmlFor="image-1"
                className="text-sm font-medium text-slate-300"
              >
                Image
              </Label>

              <div className="flex items-center gap-4">
                {photoUrl && (
                  <Image
                    width={400}
                    height={400}
                    src={photoUrl}
                    alt={fullName || "Student preview"}
                    className="h-14 w-14 shrink-0 rounded-xl border border-white/15 object-cover"
                  />
                )}
                <Input
                  id="image-1"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="h-13 rounded-2xl border-transparent bg-white/[0.06] px-5 text-base text-white shadow-inner ring-1 ring-white/10 transition placeholder:text-slate-500 hover:bg-white/[0.09] focus-visible:border-transparent focus-visible:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-lime-300/70"
                />
              </div>

              {uploading && (
                <p className="text-sm text-amber-300">Uploading image...</p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-3 border-0 bg-transparent p-0 pt-2 sm:gap-3 [&>*]:h-12 [&>*]:rounded-full [&>*]:px-7">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/15 bg-transparent text-slate-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={uploading || saving}
              className="bg-gradient-to-r from-lime-300 to-emerald-300 font-bold text-black shadow-[0_12px_35px_-10px_rgba(190,242,100,0.8)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
