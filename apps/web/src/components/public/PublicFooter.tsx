"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Search,
} from "lucide-react";

export default function PublicFooter() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-[#dfe7dc] bg-[#202a31] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        {/* Main footer */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#24BD11] text-white">
                <BookOpen
                  size={23}
                  strokeWidth={2.2}
                />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-[-0.03em]">
                  Parro{" "}
                  <span className="text-[#24BD11]">
                    Notes
                  </span>
                </h2>

                <p className="mt-0.5 text-xs text-white/50">
                  Learn. Find. Study.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
              A simple place to find educational notes,
              resources, and study material without the
              clutter.
            </p>

            <p className="mt-4 text-xs text-white/40">
              Powered by{" "}
              <a
                href="https://nbca.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#24BD11] transition hover:text-[#62e852]"
              >
                nbca.co.in
              </a>
            </p>
          </div>

          {/* Explore */}

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-white/90">
              Explore
            </h3>

            <nav className="mt-5 space-y-3">
              <Link
                href="/notes"
                className="flex items-center gap-2 text-sm text-white/60 transition hover:text-[#24BD11]"
              >
                <BookOpen
                  size={16}
                  strokeWidth={2}
                />
                Browse notes
              </Link>

              <Link
                href="/search"
                className="flex items-center gap-2 text-sm text-white/60 transition hover:text-[#24BD11]"
              >
                <Search
                  size={16}
                  strokeWidth={2}
                />
                Search notes
              </Link>
            </nav>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-white/90">
              Need something?
            </h3>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              Can't find the study material you're looking
              for?
            </p>

            <Link
              href="/request"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#24BD11] transition hover:text-[#62e852]"
            >
              Request a note
              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
              />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {currentYear ?? 2026} Parro Notes. All
            rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Built for better learning.
          </p>
        </div>
      </div>
    </footer>
  );
}