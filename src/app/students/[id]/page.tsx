import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  GraduationCap,
  Hash,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  School,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrFacebook } from "react-icons/gr";
import { StudentEdit } from "@/components/sheard/StudentEdit";

interface Student {
  _id: string;
  fullName: string;
  rollNumber: string;
  batchYear: string;
  group: string;
  email: string;
  phone: string;
  photoUrl: string;
  address: string;
  facebookUrl?: string;
}

const StudentDetalisPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/students/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f3] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-[0_30px_80px_-30px_rgba(15,60,50,0.35)] ring-1 ring-black/5">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Student Not Found!
          </h1>
          <Link
            href="/students"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const student: Student = await res.json();

  return (
    <main className="min-h-screen bg-[#f4f6f3] text-slate-900">
      {/* Top band */}
      <div className="relative h-72 overflow-hidden bg-emerald-950 md:h-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(52,211,153,0.22),transparent_45%)]" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative  p-2 mt-2 mx-auto flex items-center max-w-6xl justify-between px-5 pt-8 md:px-8">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 rounded-full bg-gr/10 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-cyan-200 hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Students
          </Link>

          <div className=" flex gap-2 items-center">
             <StudentEdit student={student}/>
            <Button variant={"destructive"} className={"px-5 text-md"}>Delete</Button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-32 max-w-6xl px-5 pb-16 md:-mt-36 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Profile card */}
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(6,60,45,0.45)] ring-1 ring-black/5 lg:sticky lg:top-8">
            <div className="relative mx-auto aspect-square w-full max-w-[280px]">
              <div className="absolute -bottom-2.5 -right-2.5 h-full w-full rounded-[28px] bg-emerald-200" />
              <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-emerald-50 ring-1 ring-black/5">
                {student.photoUrl ? (
                  <Image
                    src={student.photoUrl}
                    alt={student.fullName}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="280px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-emerald-700/70">
                    <GraduationCap size={64} />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900">
                {student.fullName}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Sherua Adarsha High School
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-1.5 text-xs font-semibold text-emerald-50">
                <GraduationCap size={14} />
                SSC Batch {student.batchYear}
              </span>
            </div>

            {student.facebookUrl && (
              <a
                href={student.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-between gap-3 rounded-2xl bg-[#1877f2]/[0.07] p-3.5 ring-1 ring-[#1877f2]/15 transition hover:bg-[#1877f2]/[0.12]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1877f2] text-white">
                    <GrFacebook size={20} />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-slate-900">
                      Facebook Profile
                    </span>
                    <span className="block text-xs text-slate-500">
                      Connect with this student
                    </span>
                  </span>
                </span>
                <span className="text-sm font-semibold text-[#1877f2]">
                  Visit ↗
                </span>
              </a>
            )}
          </aside>

          {/* Details */}
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(6,60,45,0.3)] ring-1 ring-black/5 md:p-9">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Student Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Details about {student.fullName}
              </p>

              <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
                <InfoCard
                  icon={<Hash size={20} />}
                  label="Roll Number"
                  value={student.rollNumber}
                />

                <InfoCard
                  icon={<BookOpen size={20} />}
                  label="Group"
                  value={student.group}
                />

                <InfoCard
                  icon={<GraduationCap size={20} />}
                  label="Batch Year"
                  value={student.batchYear}
                />

                <InfoCard
                  icon={<School size={20} />}
                  label="Institution"
                  value="Sherua Adarsha High School"
                />

                <InfoCard
                  icon={<Mail size={20} />}
                  label="Email Address"
                  value={student.email}
                />

                <InfoCard
                  icon={<Phone size={20} />}
                  label="Phone Number"
                  value={student.phone}
                />

                <div className="sm:col-span-2">
                  <InfoCard
                    icon={<MapPin size={20} />}
                    label="Address"
                    value={student.address}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative overflow-hidden rounded-3xl bg-emerald-950 p-8 text-center md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(52,211,153,0.2),transparent_50%)]" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 ring-1 ring-white/15">
                  <GraduationCap size={26} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Once a Student, Always a Memory!
                </h3>
                <p className="mt-2 text-sm text-emerald-100/70">
                  Sherua Adarsha High School — SSC Batch {student.batchYear}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="group flex h-full items-center gap-4 rounded-2xl bg-[#f4f6f3] p-4 ring-1 ring-black/[0.04] transition duration-200 hover:bg-emerald-50 hover:ring-emerald-300/60">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-black/5 transition duration-200 group-hover:bg-emerald-900 group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-0.5 break-words font-semibold text-slate-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default StudentDetalisPage;