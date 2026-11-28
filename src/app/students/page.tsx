import React from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import StudentsCard from "@/components/sheard/StudentsCard";

type Student = {
  _id: string;
  fullName?: string;
  rollNumber?: string;
  batchYear?: string;
  group?: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  address?: string;
};

// Category list: key = URL value, match = student.group te ja thakbe
const categories = [
  { label: "All", key: "all", match: "" },
  { label: "Science", key: "science", match: "science" },
  { label: "Humanities", key: "humanities", match: "human" },
];

const AllStudentPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; group?: string }>;
}) => {
  const params = await searchParams;
  const query = (params?.search ?? "").trim();
  const activeKey = (params?.group ?? "all").toLowerCase();
  const activeCategory =
    categories.find((c) => c.key === activeKey) ?? categories[0];

  let students: Student[] = [];

  try {
    const res = await fetch("http://localhost:5000/students", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch students. Status:", res.status);
    } else {
      const rawData = await res.json();

      if (Array.isArray(rawData)) {
        students = rawData;
      } else if (Array.isArray(rawData?.students)) {
        students = rawData.students;
      } else if (Array.isArray(rawData?.data)) {
        students = rawData.data;
      }
    }
  } catch (error) {
    console.error("Error fetching students:", error);
  }

  // Category diye filter
  if (activeCategory.match) {
    students = students.filter((s) =>
      (s.group ?? "").toLowerCase().includes(activeCategory.match)
    );
  }

  // Name diye filter
  if (query) {
    students = students.filter((s) =>
      (s.fullName ?? "").toLowerCase().includes(query.toLowerCase())
    );
  }

  // Tab link banano (search thakle shetao rakhbe)
  const buildHref = (key: string) => {
    const sp = new URLSearchParams();
    if (key !== "all") sp.set("group", key);
    if (query) sp.set("search", query);
    const qs = sp.toString();
    return qs ? `/students?${qs}` : "/students";
  };

  return (
    <div className="bg-[#FFFAF4]">
      <div>
        <h1 className="text-3xl font-bold mt-8 underline text-center">All Students Batch-2025 </h1>
      </div>

      {/* Search Bar */}
      <form
        action="/students"
        method="GET"
        className="mx-auto mt-8 flex w-full max-w-xl items-center gap-2 px-5"
      >
        {/* Category thik rakhar jonno */}
        {activeCategory.key !== "all" && (
          <input type="hidden" name="group" value={activeCategory.key} />
        )}

        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            name="search"
            defaultValue={query}
            placeholder="Search student by name..."
            className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
          />
          {query && (
            <Link
              href={buildHref(activeCategory.key).replace(
                /[?&]search=[^&]*/,
                ""
              )}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </Link>
          )}
        </div>

        <button
          type="submit"
          className="rounded-full bg-[#07152F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#07152F]"
        >
          Search
        </button>
      </form>

      {/* Category Tabs */}
      <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 px-5">
        {categories.map((cat) => {
          const isActive = cat.key === activeCategory.key;
          return (
            <Link
              key={cat.key}
              href={buildHref(cat.key)}
              className={`rounded-full border px-6 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-[#D4AF37] bg-[#D4AF37] text-[#07152F] shadow-md shadow-[#D4AF37]/30"
                  : "border-slate-300 bg-white text-slate-600 hover:border-[#D4AF37] hover:text-[#07152F]"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-20">
        {students.length > 0 ? (
          students.map((item) => <StudentsCard key={item._id} student={item} />)
        ) : (
          <p className="col-span-full py-8 text-center text-sm text-slate-500">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllStudentPage;