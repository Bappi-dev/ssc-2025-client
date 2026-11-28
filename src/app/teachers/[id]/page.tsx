"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  UserRound,
  School,
  Mail,
} from "lucide-react";

interface Teacher {
  _id: string;
  fullName: string;
  photoUrl: string;
  designation: string;
  email: string
}

const TeacherDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchTeacher = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:5000/teachers/${id}`);

        if (!res.ok) {
          throw new Error("Teacher not found");
        }

        const data = await res.json();

        setTeacher(data.teacher ?? data.data ?? data);
      } catch {
        setError("শিক্ষকের তথ্য পাওয়া যায়নি!");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f4f6f3]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-800 border-t-transparent" />
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#f4f6f3] px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-black/5">
          <UserRound size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          {error || "Teacher not found"}
        </h2>
        <Link
          href="/teachers"
          className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Back to Teachers
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f6f3] text-slate-900">
      {/* Top band */}
      <div className="relative h-72 overflow-hidden bg-emerald-950 md:h-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(52,211,153,0.22),transparent_45%)]" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl px-5 pt-8 md:px-8">
          {/* Back Button */}
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            Back to Teachers
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 ring-1 ring-white/15">
              <GraduationCap size={26} />
            </div>
            <div>
              <p className="text-sm text-emerald-200/80">Our Teachers</p>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Teacher Profile
              </h1>
              <p className="text-sm text-emerald-100/60">
                Sherua Adarsha High School
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-24 max-w-5xl px-5 pb-16 md:px-8">
        {/* Teacher Profile */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-30px_rgba(6,60,45,0.45)] ring-1 ring-black/5"
        >
          {/* Profile Content */}
          <div className="px-6 py-10 sm:px-12">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">

              {/* Profile Image */}
              <div className="relative h-64 w-64 shrink-0">
                <div className="absolute -bottom-2.5 -right-2.5 h-full w-full rounded-[28px] bg-emerald-200" />
                <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-emerald-50 ring-1 ring-black/5">
                  <Image
                    src={teacher.photoUrl}
                    alt={teacher.fullName}
                    fill
                    unoptimized
                    sizes="256px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Teacher Info */}
              <div className="flex-1 text-center md:pt-2 md:text-left">

                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-1.5 text-xs font-semibold text-emerald-50">
                  <School size={14} />
                  Faculty Member
                </span>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {teacher.fullName}
                </h2>

                <p className="mt-2 text-lg font-medium text-emerald-800">
                  {teacher.designation}
                </p>

                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 md:justify-start">
                  <Mail size={15} />
                  <span className="break-all transition hover:text-emerald-700">
                    {teacher.email}
                  </span>
                </p>

                <div className="mx-auto my-6 h-px w-full max-w-xs bg-gradient-to-r from-emerald-300 to-transparent md:mx-0" />

                <p className="max-w-xl leading-8 text-slate-600">
                  A respected member of Sherua Adarsha High School.
                  We are grateful for their dedication, guidance
                  and contribution to our students.
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 grid gap-3.5 border-t border-slate-100 pt-8 sm:grid-cols-2">
              <div className="group flex items-center gap-4 rounded-2xl bg-[#f4f6f3] p-4 ring-1 ring-black/[0.04] transition duration-200 hover:bg-emerald-50 hover:ring-emerald-300/60">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-black/5 transition duration-200 group-hover:bg-emerald-900 group-hover:text-white">
                  <UserRound size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Teacher Name</p>
                  <p className="mt-0.5 break-words font-semibold text-slate-900">
                    {teacher.fullName}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-2xl bg-[#f4f6f3] p-4 ring-1 ring-black/[0.04] transition duration-200 hover:bg-emerald-50 hover:ring-emerald-300/60">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-black/5 transition duration-200 group-hover:bg-emerald-900 group-hover:text-white">
                  <GraduationCap size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Designation</p>
                  <p className="mt-0.5 break-words font-semibold text-slate-900">
                    {teacher.designation}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default TeacherDetailsPage;