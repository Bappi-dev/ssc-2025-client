"use client";

import React, { useMemo, useState } from "react";
import { Filter, Search, Users } from "lucide-react";
import StudentCard from "./StudentsCard";


const categories = ["All", "Science", "Humanities", "Business Studies"] as const;

type StudentsListProps = {
  students: StudentItem[];
};

export default function StudentsList({ students }: StudentsListProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");

  const safeStudents = Array.isArray(students) ? students : [];

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return safeStudents.filter((student) => {
      const name = (student.name ?? student.fullName ?? "").toLowerCase();
      const roll = String(student.roll ?? student.rollNumber ?? "").toLowerCase();
      const category = student.category ?? student.group ?? "";

      const matchesSearch =
        !query || name.includes(query) || roll.includes(query);

      const matchesCategory =
        activeCategory === "All" || category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [safeStudents, search, activeCategory]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      {/* Search & Category Filter */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or roll number..."
            className="w-full rounded-xl border border-[#101B35]/15 bg-white py-3 pl-11 pr-4 text-sm text-[#101B35] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={16} className="mr-1 text-[#D4AF37]" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#F6D978] to-[#C69A2B] text-[#101B35] shadow-sm"
                  : "border border-[#101B35]/10 bg-white text-slate-600 hover:border-[#D4AF37]/50 hover:text-[#9A7617]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStudents.map((item, idx) => (
            <StudentCard
              key={item._id ?? item.id ?? String(idx)}
              student={item}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#101B35]/10 bg-slate-50 py-16 text-center">
          <Users size={38} className="mx-auto mb-3 text-[#D4AF37]" />
          <p className="text-base font-bold text-[#101B35]">No Students Found</p>
          <p className="mt-1 text-xs text-slate-500">
            Try another keyword or clear the selected category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="mt-4 rounded-full bg-[#D4AF37] px-5 py-2 text-xs font-bold text-[#101B35]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}