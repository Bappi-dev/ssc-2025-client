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
  facebookUrl:st
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
      <div className="flex min-h-screen items-center justify-center bg-red-500 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Student Not Found!</h1>
          <Link href="/students" className="mt-5 inline-block text-yellow-400">
            ← Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const student: Student = await res.json();

  return (
    <main className="min-h-screen  px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex gap-4 justify-between items-center">
          <Link href="/students">
            <Button className="mb-8 inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400">
              <ArrowLeft size={18} />
              Back to Students
            </Button>
          </Link>
          {/* <div className="items-center">
            <Button variant={"outline"} className="text-black">
              Edit
            </Button>
            <Button variant={"destructive"}>Delete</Button>
          </div> */}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl">
          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-yellow-600/30 via-blue-950 to-[#111827]" />

          <div className="px-6 pb-10 md:px-10">
            {/* Profile */}
            <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-4 border-[#111827] bg-gray-800 shadow-xl">
                {student.photoUrl ? (
                  <Image
                    src={student.photoUrl}
                    alt={student.fullName}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="144px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <GraduationCap size={50} />
                  </div>
                )}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold md:text-4xl">
                  {student.fullName}
                </h1>
                <p className="mt-2 text-gray-400">Sherua Adarsha High School</p>
                <span className="mt-3 inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-sm font-semibold text-yellow-400">
                  SSC Batch {student.batchYear}
                </span>
              </div>
            </div>
            <div className="my-8 h-px bg-white/10" />

            {student.facebookUrl && (
              <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <GrFacebook size={25} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">Facebook Profile</h3>
                      <p className="text-sm text-gray-400">
                        Connect with this student
                      </p>
                    </div>
                  </div>

                  <a
                    href={student.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Visit Profile ↗
                  </a>
                </div>
              </div>
            )}

            {/* Student Information */}
            <h2 className="mb-6 text-xl font-bold">Student Information</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<Hash size={22} />}
                label="Roll Number"
                value={student.rollNumber}
              />

              <InfoCard
                icon={<BookOpen size={22} />}
                label="Group"
                value={student.group}
              />

              <InfoCard
                icon={<GraduationCap size={22} />}
                label="Batch Year"
                value={student.batchYear}
              />

              <InfoCard
                icon={<School size={22} />}
                label="Institution"
                value="Sherua Adarsha High School"
              />

              <InfoCard
                icon={<Mail size={22} />}
                label="Email Address"
                value={student.email}
              />

              <InfoCard
                icon={<Phone size={22} />}
                label="Phone Number"
                value={student.phone}
              />

              <InfoCard
                icon={<MapPin size={22} />}
                label="Address"
                value={student.address}
              />
            </div>

            {/* Footer */}
            <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6 text-center">
              <GraduationCap
                size={32}
                className="mx-auto mb-3 text-yellow-400"
              />
              <h3 className="text-lg font-bold">
                Once a Student, Always a Memory!
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Sherua Adarsha High School — SSC Batch {student.batchYear}
              </p>
            </div>
          </div>
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
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-yellow-400/40">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="mt-1 break-all font-semibold">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default StudentDetalisPage;
