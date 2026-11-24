"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Users,
  ArrowUpRight,
  GraduationCap,
  UserRound,
  Filter,
  Sparkles,
} from "lucide-react";

type Group = "Science" | "Humanities" | "Business Studies";

interface Student {
  id: number;
  name: string;
  roll: string;
  group: Group;
  photo?: string;
}

const students: Student[] = [
  {
    id: 1,
    name: "Samiul Hasan Sojib",
    roll: "01",
    group: "Science",
    photo: "/image/samiul.jpg",
  },
  {
    id: 2,
    name: "Abdullha All Mamun",
    roll: "02",
    group: "Science",
    photo: "/image/abdhullha.jpeg",
  },
  {
    id: 3,
    name: "Arafat Rhoman",
    roll: "03",
    group: "Science",
    photo: "/image/Arafat.jpg",
  },
  {
    id: 4,
    name: "Sojib Ahamed",
    roll: "04",
    group: "Science",
    photo: "/image/sojib.jpg",
  },
  {
    id: 5,
    name: "Rubi Islam",
    roll: "05",
    group: "Science",
    photo: "/image/rubi.png",
  },
  {
    id: 6,
    name: "Resmi Akter Rumpa",
    roll: "06",
    group: "Science",
    photo: "/image/rumpa.png",
  },
  {
    id: 6,
    name: "Nowshin Tabassum Masuma",
    roll: "06",
    group: "Science",
    photo: "/image/nowshin.png",
  },
  {
    id: 6,
    name: "Bristy Akter",
    roll: "06",
    group: "Science",
    photo: "/image/bristy.png",
  },
];

const filters = ["All", "Science", "Humanities", "Business Studies"] as const;

export default function Students() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.roll.includes(search);

      const matchesGroup =
        activeFilter === "All" || student.group === activeFilter;

      return matchesSearch && matchesGroup;
    });
  }, [search, activeFilter]);

  return (
    <section className="relative overflow-hidden bg-white py-24 text-[#101B35]">
      {/* Background Effects */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2">
            <Sparkles size={15} className="text-[#D4AF37]" />
            <span className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              Meet Our Family
            </span>
          </div>

          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#F6D978] to-[#C69A2B] bg-clip-text text-transparent">
              Students
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Meet the amazing people of Sherua Adarsha High School SSC Batch
            2025. Fifty students, one unforgettable family.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
        </div>

        {/* Statistics */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl border border-[#D4AF37]/25 bg-[#FFFDF5] px-7 py-4 shadow-sm">
            <div className="rounded-xl bg-[#D4AF37]/10 p-3">
              <Users size={26} className="text-[#D4AF37]" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-[#101B35]">50+</h3>
              <p className="text-xs text-slate-500">Batch Members</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or roll number..."
              className="w-full rounded-xl border border-[#101B35]/10 bg-white py-4 pl-12 pr-4 text-sm text-[#101B35] outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={17} className="mr-1 text-[#D4AF37]" />

            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-[#F6D978] to-[#C69A2B] text-[#101B35] shadow-lg shadow-[#D4AF37]/10"
                    : "border border-[#101B35]/10 bg-white text-slate-600 hover:border-[#D4AF37]/50 hover:bg-[#FFFDF5] hover:text-[#9A7617]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Student Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="group overflow-hidden rounded-2xl border border-[#101B35]/10 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              {/* Student Image */}
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8F5EA] to-[#E9EDF3]">
                {student.photo ? (
                  <Image
                    src={student.photo}
                    alt={student.name}
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
                    SSC 2025
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#101B35]/40 to-transparent" />
              </div>

              {/* Student Info */}
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#101B35] transition group-hover:text-[#9A7617]">
                      {student.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Roll Number: {student.roll}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#D4AF37]/10 p-2">
                    <GraduationCap size={22} className="text-[#D4AF37]" />
                  </div>
                </div>

                <div className="mb-5">
                  <span className="rounded-full border border-[#101B35]/10 bg-[#F8FAFC] px-3 py-1.5 text-[11px] text-slate-600">
                    {student.group}
                  </span>
                </div>

                <Link
                  href={`/students/${student.id}`}
                  className="group/btn flex items-center justify-between rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-3 text-xs font-bold text-[#F6D978] transition hover:bg-[#D4AF37] hover:text-[#101B35]"
                >
                  View Profile
                  <ArrowUpRight
                    size={17}
                    className="transition group-hover/btn:rotate-45"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="rounded-2xl border border-[#101B35]/10 bg-[#F9FAFB] py-20 text-center">
            <Users size={42} className="mx-auto mb-4 text-[#D4AF37]" />

            <h3 className="text-xl font-bold text-[#101B35]">
              No Students Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with another name or roll number.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-5 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold text-[#101B35]"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom Button */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-sm text-slate-600">
            Celebrating our beautiful journey together.
          </p>

          <Link
            href="/students"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F6D978] to-[#C69A2B] px-7 py-4 text-sm font-bold text-[#101B35] shadow-lg shadow-[#D4AF37]/10 transition hover:-translate-y-1 hover:shadow-[#D4AF37]/30"
          >
            Explore All Students
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
