
"use client";

import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../public/image/Vibrant School Group Portrait Under Tree.png";
import {
  ArrowRight,
  Users,
  CalendarDays,
  School,
  Heart,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "50+",
    label: "Students",
  },
  {
    icon: CalendarDays,
    number: "2025",
    label: "Batch Year",
  },
  {
    icon: School,
    number: "01",
    label: "School",
  },
  {
    icon: Heart,
    number: "Forever",
    label: "Connected",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[750px] overflow-hidden bg-[#07152F] text-white">

      {/* AI Background */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="scale-105 object-cover opacity-45"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 from-[#06142D]/95 via-[#071A38]/80 to-[#07152F]/35" />

      <div className="absolute inset-0 -z-10  from-[#06142D] via-transparent to-[#06142D]/40" />

      {/* Decorative Glow */}
      <div className="absolute -left-32 top-32 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div className="relative z-10 space-y-7">

            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles size={15} className="text-[#F6D978]" />

              <span className="text-xs font-semibold tracking-wider text-[#F6D978]">
                WELCOME TO OUR BATCH
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-3">

              <p className="text-sm font-semibold uppercase tracking-[5px] text-slate-300 sm:text-base">
                Sherua Adarsha High School
              </p>

              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl xl:text-7xl">
                SSC BATCH

                <span className="mt-2 block bg-gradient-to-r from-[#FFF0A8] via-[#D4AF37] to-[#F5C542] bg-clip-text text-transparent">
                  2025
                </span>
              </h1>

              <h2 className="max-w-xl text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                One School, One Batch,
                <span className="block text-[#D4AF37]">
                  Endless Memories.
                </span>
              </h2>

              <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                A digital home for friendship, memories and achievements.
                Together we studied, forever we will be connected.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <Link
                href="/memories"
                className="group inline-flex items-center gap-3 rounded-full  from-[#F6D978] to-[#C69A2B] px-7 py-4 text-sm font-bold text-[#101B35] shadow-xl shadow-[#D4AF37]/20 transition duration-300 hover:-translate-y-1 hover:shadow-[#D4AF37]/40"
              >
                <ImageIcon size={18} />
                Explore Memories

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/students"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F6D978]"
              >
                <Users size={18} />
                Meet Our Students
              </Link>

            </div>

            {/* Small Text */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <p className="text-xs font-medium tracking-widest text-slate-500">
                MEMORIES NEVER FADE
              </p>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative mx-auto w-full max-w-2xl">

            {/* Background Glow */}
            <div className="absolute inset-5 rounded-full bg-[#D4AF37]/20 blur-[80px]" />

            {/* Image Frame */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/30 bg-white/5 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">

              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">

                <Image
                  src={heroImage}
                  alt="Sherua Adarsha High School SSC Batch 2025 students"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0  from-[#07152F]/70 via-transparent to-transparent" />

                {/* Image Caption */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between">

                    <div>
                      <p className="text-xs font-semibold tracking-[3px] text-[#F6D978]">
                        OUR BEAUTIFUL JOURNEY
                      </p>

                      <h3 className="mt-1 text-2xl font-bold text-white">
                        Batch of 2025
                      </h3>
                    </div>

                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl">
                      <Heart
                        className="fill-[#D4AF37] text-[#D4AF37]"
                        size={22}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-3 -top-5 rounded-2xl border border-[#D4AF37]/30 bg-[#10264A]/90 px-5 py-3 shadow-xl backdrop-blur-xl sm:-right-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#D4AF37]/15 p-2">
                  <Users size={20} className="text-[#F6D978]" />
                </div>

                <div>
                  <p className="text-xl font-bold text-white">50+</p>
                  <p className="text-[10px] text-slate-300">
                    Batch Students
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/10 bg-[#10264A]/95 px-5 py-3 shadow-xl backdrop-blur-xl sm:-left-6">
              <div className="flex items-center gap-3">
                <Heart size={22} className="text-[#D4AF37]" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Forever Connected
                  </p>
                  <p className="text-[10px] text-slate-400">
                    One Family, One Batch
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Statistics */}
        <div className="relative mt-24 rounded-3xl border border-[#D4AF37]/30  p-6 shadow-2xl shadow-[#101B35]/10 backdrop-blur-2xl lg:mt-28">

          <div className="grid grid-cols-2 gap-7 md:grid-cols-4">

            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="rounded-xl bg-[#D4AF37]/10 p-3">
                    <Icon
                      size={25}
                      className="text-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold sm:text-2xl">
                      {item.number}
                    </h3>

                    <p className="text-xs text-cyan-500">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

       

      </div>
    </section>
  );
}
