import React from "react";
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

const AllStudentPage = async () => {
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

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mt-8 underline text-center">All Students Batch-2025 </h1>
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
