"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, UserRound } from "lucide-react";

export type StudentItem = {
  _id?: string;
  id?: string;
  name?: string;
  fullName?: string;
  roll?: string | number;
  rollNumber?: string | number;
  batchYear?: string | number;
  group?: string;
  category?: string;
  photo?: string;
  photoUrl?: string;
};

type StudentCardProps = {
  student: StudentItem;
};

export default function StudentCard({ student }: StudentCardProps) {
  const studentId = student._id ?? student.id ?? "";
  const studentName = student.name ?? student.fullName ?? "Unnamed Student";
  const studentRoll = student.roll ?? student.rollNumber ?? "N/A";
  const studentBatch = student.batchYear
    ? `SSC ${student.batchYear}`
    : "SSC 2025";
  const studentPhoto = student.photo ?? student.photoUrl ?? "";
  const studentCategory = student.category ?? student.group ?? "";

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#101B35]/10 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
      {/* Student Image */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8F5EA] to-[#E9EDF3]">
        {studentPhoto ? (
          <Image
            src={studentPhoto}
            alt={studentName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition duration-500 group-hover:scale-110">
            <UserRound size={48} className="text-[#D4AF37]" />
          </div>
        )}

        {/* Batch Badge */}
        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#101B35]/80 px-3 py-1.5 backdrop-blur-xl">
          <span className="text-[10px] font-bold tracking-wider text-[#F6D978]">
            {studentBatch}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#101B35]/40 to-transparent" />
      </div>

      {/* Student Info */}
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#101B35] transition group-hover:text-[#9A7617]">
              {studentName}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Roll Number: {studentRoll}
            </p>
          </div>

          <div className="rounded-xl bg-[#D4AF37]/10 p-2">
            <GraduationCap size={22} className="text-[#D4AF37]" />
          </div>
        </div>

        {studentCategory && (
          <div className="mb-5">
            <span className="rounded-full border border-[#101B35]/10 bg-[#F8FAFC] px-3 py-1.5 text-[11px] font-medium text-slate-600">
              {studentCategory}
            </span>
          </div>
        )}

        <Link
          href={studentId ? `/students/${studentId}` : "/students"}
          className="group/btn flex items-center justify-between rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-3 text-xs font-bold text-[#9A7617] transition hover:bg-[#D4AF37] hover:text-[#101B35]"
        >
          View Profile
          <ArrowUpRight
            size={17}
            className="transition group-hover/btn:rotate-45"
          />
        </Link>
      </div>
    </div>
  );
}