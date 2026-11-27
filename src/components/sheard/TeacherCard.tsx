 "use client"
import React from "react";
import { GraduationCap, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type Teacher = {
  _id: string;
  fullName: string;
  designation: string;
  phone: string;
  photoUrl: string;
};

type TeacherCardProps = {
  teacher: Teacher;
};

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_45px_rgba(16,27,53,0.12)]">

      {/* Top Background */}
      <div className="relative h-32 overflow-hidden bg-[#101B35]">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-[#D4AF37]/20" />

        <div className="absolute -left-10 -bottom-24 h-48 w-48 rounded-full border border-[#D4AF37]/20" />

        <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full border border-[#D4AF37]/30 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-[#F6D978]">
          <GraduationCap size={13} />
          TEACHER
        </div>
      </div>

      {/* Teacher Image */}
      <div className="relative -mt-16 flex justify-center">
        <div className="h-32 w-32 overflow-hidden rounded-full border-[5px] border-white bg-slate-100 shadow-lg">
          <Image
            width={400}
            height={400}
            src={teacher.photoUrl || "https://placehold.co/300x300?text=Teacher"}
            alt={teacher.fullName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Teacher Info */}
      <div className="px-5 pb-6 pt-4 text-center">
        <h3 className="text-xl font-extrabold text-[#101B35] transition group-hover:text-[#B68A20]">
          {teacher.fullName}
        </h3>

        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#B68A20]">
          {teacher.designation}
        </p>

        {/* Mobile */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#101B35]/5 px-3 py-3">
          <Phone size={16} className="text-[#B68A20]" />
          <span className="text-sm font-semibold text-[#101B35]">
            {teacher.phone || "Mobile number unavailable"}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => (window.location.href = `/teachers/${teacher._id}`)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#101B35] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#C69A2B] hover:text-[#101B35]"
          >
            View Profile
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
