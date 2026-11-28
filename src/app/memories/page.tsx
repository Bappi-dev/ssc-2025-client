import MemoriesCard from "@/components/sheard/MemoriesCard";
import { UploadMemories } from "@/components/sheard/uploedMemories";
import React from "react";

import { Memory } from "@/components/sheard/MemoriesCard";

const AllMemoriesPage = async () => {
  const res = await fetch("http://localhost:5000/memories");
  const events = await res.json();
  console.log(events);
  return (
    <div className="bg-[#FFFAF4]">
      <section className=" px-4 py-12">
        <div className="flex justify-between items-center  max-w-7xl mx-auto">
          <div>
            <p className="mb-2 font-semibold uppercase tracking-widest text-amber-600">
              Our Memories
            </p>
            <h2 className="text-3xl font-bold text-[#0B1F3A]">
              Beautiful Moments Together
            </h2>
          </div>
          <div>
            <UploadMemories/>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  p-20">
          {events.map((memory: Memory) => {
            return <MemoriesCard key={memory._id} memory={memory} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default AllMemoriesPage;
