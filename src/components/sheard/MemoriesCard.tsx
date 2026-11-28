
import Image from "next/image";
import { CalendarDays, ArrowUpRight } from "lucide-react";

export type Memory = {
  _id: string;
  title?: string;
  imageUrl?: string;
  category?: string;
  date?: string;
};

type MemoriesCardProps = {
  memory: Memory;
};

const MemoriesCard = ({ memory }: MemoriesCardProps) => {
  const formattedDate = new Date(memory.date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={memory.imageUrl}
          alt={memory.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/30 bg-[#0B1F3A]/85 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
            {memory.category}
          </span>
        </div>

        {/* Hover Icon */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-amber-400 text-[#0B1F3A] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={21} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} className="text-amber-500" />
          <span>{formattedDate}</span>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold text-[#0B1F3A] transition-colors group-hover:text-amber-600">
          {memory.title}
        </h3>

        <div className="mt-4 h-1 w-12 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-24" />
      </div>
    </article>
  );
};

export default MemoriesCard;
