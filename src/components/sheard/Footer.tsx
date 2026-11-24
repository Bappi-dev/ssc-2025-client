import Link from "next/link";
import { ArrowUpRight, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About our batch", href: "/about" },
  { label: "Students", href: "/students" },
];

const exploreLinks = [
  { label: "Memories", href: "/memories" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#101B35]/10 bg-[#F8FAFC] text-[#101B35]">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-14 sm:px-8 lg:pt-16">
        <div className="grid gap-10 border-b border-[#101B35]/10 pb-10 md:grid-cols-[1.4fr_.7fr_.7fr]">
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F6D978] to-[#B68A20] text-[#101B35] shadow-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <GraduationCap size={24} />
              </span>
              <span>
                <span className="block text-sm font-extrabold tracking-wide">
                  SHERUA ADARSHA
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.24em] text-[#9A7617]">
                  SSC BATCH 2025
                </span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              A digital home for friendship, memories and achievements. One
              school, one batch, a lifetime of stories.
            </p>

            <Button
              render={<Link href="/students" />}
              className="mt-5 rounded-full bg-gradient-to-r from-[#F6D978] to-[#C69A2B] px-5 font-bold text-[#101B35] shadow-sm hover:-translate-y-0.5 hover:shadow-md"
            >
              Meet the batch
              <ArrowUpRight size={16} />
            </Button>
          </div>

          <nav aria-label="Quick links">
            <h2 className="mb-4 text-sm font-bold">Quick links</h2>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-[#9A7617]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h2 className="mb-4 text-sm font-bold">Explore</h2>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-[#9A7617]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Sherua Adarsha SSC Batch 2025.
            All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            Made with <Heart size={13} className="fill-[#D4AF37] text-[#D4AF37]" />{" "}
            for our unforgettable memories
          </p>
        </div>
      </div>
    </footer>
  );
}
