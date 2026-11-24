
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "framer-motion";
import batchImage from "../../../public/image/Vibrant School Group Portrait Under Tree.png";

import {
  ArrowUpRight,
  Users,
  GraduationCap,
  Heart,
  BookOpen,
  Sparkles,
} from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "50+ Students",
    description: "A wonderful group of friends.",
  },
  {
    icon: GraduationCap,
    title: "SSC Batch 2025",
    description: "One unforgettable journey.",
  },
  {
    icon: Heart,
    title: "Forever Friends",
    description: "Friendship beyond the classroom.",
  },
  {
    icon: BookOpen,
    title: "Beautiful Memories",
    description: "Moments we will never forget.",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export default function AboutBatch() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white py-24 text-[#101B35]">

      {/* Background Decorations */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
      />

      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Heading */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2">
            <Sparkles size={15} className="text-[#D4AF37]" />

            <span className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              Discover Our Story
            </span>
          </div>

          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            About Our{" "}
            <span className="bg-gradient-to-r from-[#F6D978] to-[#C69A2B] bg-clip-text text-transparent">
              Batch
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Every friendship has a story, every classroom has memories.
            This is the story of our unforgettable SSC Batch 2025.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent" />

        </motion.div>

        {/* Main Content */}
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left Image */}
          <motion.div
            className="group relative"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >

            {/* Decorative Border */}
            <div className="absolute -inset-3 rounded-[2rem] border border-[#D4AF37]/20 transition duration-500 group-hover:border-[#D4AF37]/60" />

            <div className="relative overflow-hidden rounded-[1.5rem]">

              <Image
                src={batchImage}
                alt="Sherua Adarsha High School SSC Batch 2025"
                width={900}
                height={700}
                className="h-[350px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[470px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06142D]/90 via-transparent to-transparent" />

              {/* Image Content */}
              <div className="absolute bottom-6 left-6 right-6">

                <p className="text-xs font-semibold tracking-[3px] text-[#F6D978]">
                  SHERUA ADARSHA HIGH SCHOOL
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  SSC Batch 2025
                </h3>

                <p className="mt-2 text-sm text-slate-100">
                  One School. One Batch. Endless Memories.
                </p>

              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-7 -right-3 rounded-2xl border border-[#D4AF37]/30 bg-white p-5 shadow-xl sm:-right-7"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[#D4AF37]/15 p-3">
                  <Users className="text-[#D4AF37]" size={25} />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#101B35]">
                    50+
                  </h3>

                  <p className="text-xs text-slate-500">
                    Batch Students
                  </p>
                </div>

              </div>
            </motion.div>

          </motion.div>

          {/* Right Content */}
          <motion.div
            className="space-y-7"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-[#D4AF37]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
                  Who We Are
                </span>
              </div>

              <h3 className="text-3xl font-bold leading-tight sm:text-4xl">
                A Journey Full of
                <span className="block text-[#D4AF37]">
                  Friendship & Memories
                </span>
              </h3>

              <p className="text-sm leading-8 text-slate-600 sm:text-base">
                We are the SSC Batch 2025 of Sherua Adarsha High School.
                Our school journey brought us together through friendship,
                learning, laughter and unforgettable moments.

                This website is a place to celebrate our memories,
                reconnect with friends and preserve the beautiful
                moments of our school life.
              </p>

            </div>

            {/* Highlights */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >

              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={reveal}
                    className="group rounded-2xl border border-[#101B35]/10 bg-[#F9FAFB] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-[#FFFDF5]"
                  >

                    <div className="mb-4 inline-flex rounded-xl bg-[#D4AF37]/10 p-3 transition group-hover:bg-[#D4AF37]/20">
                      <Icon
                        size={22}
                        className="text-[#D4AF37]"
                      />
                    </div>

                    <h4 className="font-bold text-[#101B35]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {item.description}
                    </p>

                  </motion.div>
                );
              })}

            </motion.div>

            {/* Button */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F6D978] to-[#C69A2B] px-7 py-4 text-sm font-bold text-[#101B35] shadow-lg shadow-[#D4AF37]/10 transition duration-300 hover:-translate-y-1 hover:shadow-[#D4AF37]/30"
            >
              Read Our Story

              <ArrowUpRight
                size={19}
                className="transition group-hover:rotate-45"
              />
            </Link>

          </motion.div>

        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-24 rounded-3xl border border-[#D4AF37]/30 bg-[#FFFDF5] px-6 py-10 text-center"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >

          <Heart
            size={30}
            className="mx-auto mb-5 fill-[#D4AF37] text-[#D4AF37]"
          />

          <h3 className="text-xl font-bold leading-relaxed sm:text-3xl">
            &ldquo;School Days End, But
            <span className="text-[#D4AF37]">
              {" "}Memories Last Forever.&rdquo;
            </span>
          </h3>

          <p className="mt-4 text-xs tracking-[3px] text-slate-500">
            — SSC BATCH 2025
          </p>

        </motion.div>

      </div>
      </section>
    </MotionConfig>
  );
}
