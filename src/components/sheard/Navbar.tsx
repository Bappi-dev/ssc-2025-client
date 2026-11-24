
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Students", href: "/students" },
  { name: "Teachers", href: "/teachers" },
  { name: "Memories", href: "/memories" },
  { name: "Events", href: "/events" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50   backdrop-blur-xl">
      <nav className=" border border-[#101B35]/10  shadow-[0_10px_35px_rgba(16,27,53,0.10)] backdrop-blur-2xl">

        <div className="flex items-center justify-between px- py-3 sm:px-6">

          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F6D978] to-[#B68A20] text-[#101B35] shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-105">
              <GraduationCap size={25} strokeWidth={2.2} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold tracking-wide text-[#101B35] sm:text-base">
                SHERUA ADARSHA
              </h2>
              <p className="text-[10px] font-semibold tracking-[3px] text-[#D4AF37]">
                HIGH SCHOOL
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative font-bold  rounded-lg px-3 py-2 text-[13px]  text-slate-600 transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-[#9A7617]"
              >
                {link.name}

                <span className="absolute bottom-1 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-[#D4AF37] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/students"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#F6D978] to-[#C69A2B] px-5 py-2.5 text-xs font-bold text-[#101B35] shadow-lg shadow-[#D4AF37]/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[#D4AF37]/30 lg:flex"
          >
            Explore Batch
            <ArrowUpRight size={16} />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            className="rounded-xl border border-[#101B35]/10 bg-[#101B35]/[0.04] p-2.5 text-[#101B35] transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:text-[#9A7617] lg:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out lg:hidden ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#101B35]/10 px-4 pb-5 pt-3">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-[#D4AF37]/10 hover:text-[#9A7617]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/students"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F6D978] to-[#C69A2B] py-3 text-sm font-bold text-[#101B35]"
              >
                Explore Batch
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}
