
import TeacherCard from '@/components/sheard/TeacherCard';
import React from 'react';

const AllTeacherPage =async () => {
     const res = await fetch("http://localhost:5000/teachers", {
      cache: "no-store",
    });
   const teachers = await res.json();
   console.log(teachers);
    
    return (
        <div>
              <div>
                <h1 className="text-3xl font-bold mt-8 underline text-center">All Teacher </h1>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-20">
                {teachers.length > 0 ? (
                  teachers.map((item) => <TeacherCard key={item._id} teacher={item} />)
                ) : (
                  <p className="col-span-full py-8 text-center text-sm text-slate-500">
                    No students found.
                  </p>
                )}
              </div>
            </div>
    );
};

export default AllTeacherPage;