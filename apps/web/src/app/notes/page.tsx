import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Search,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  EducationLevel,
} from "@/types/api";

export const instant = false;

/* ============================================================
   API
============================================================ */

async function getEducationLevels(): Promise<EducationLevel[]> {
  try {
    const response = await apiRequest<
      ApiResponse<EducationLevel[]>
    >("/education-levels");

    return response.data ?? [];
  } catch (error) {
    console.error("Failed to load education levels:", error);
    return [];
  }
}

/* ============================================================
   PAGE
============================================================ */

export default async function NotesPage() {
  const educationLevels = await getEducationLevels();

  const palettes = [
    {
      background: "#eff8e9",
      icon: "#24BD11",
      text: "#24BD11",
    },
    {
      background: "#fff0ee",
      icon: "#ef655b",
      text: "#df554c",
    },
    {
      background: "#fff9df",
      icon: "#a8a51e",
      text: "#8d8b16",
    },
    {
      background: "#edf5f7",
      icon: "#4f8997",
      text: "#3d7381",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative overflow-hidden border-b border-[#e9ede4]">
        {/* Background decoration */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#24BD11]/[0.08]" />

          <div className="absolute -right-28 -top-10 h-72 w-72 rounded-bl-[120px] bg-[#f06a5f]/[0.08]" />

          <div className="absolute -bottom-[120px] left-[40%] h-64 w-64 rounded-full bg-[#f5d95c]/10" />

          {/* Decorative strokes */}

          <div className="absolute right-[18%] top-24 hidden h-10 w-3 -rotate-[18deg] rounded-full bg-[#24BD11]/80 sm:block" />

          <div className="absolute right-[14%] top-28 hidden h-9 w-3 rotate-[35deg] rounded-full bg-[#f6a62e]/90 sm:block" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm"
          >
            <Link
              href="/"
              className="font-semibold text-[#69736e] transition hover:text-[#24BD11]"
            >
              Home
            </Link>

            <ChevronRight
              size={15}
              className="text-[#a0a7a4]"
              strokeWidth={2}
              aria-hidden="true"
            />

            <span
              aria-current="page"
              className="font-bold text-[#202a31]"
            >
              Notes
            </span>
          </nav>

          {/* Heading */}

          <div className="mt-9 max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#24BD11] text-white shadow-[0_7px_18px_rgba(36,189,17,0.20)]">
              <BookOpen size={28} strokeWidth={2} />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#24BD11]">
              Parro Notes Library
            </p>

            <h1 className="mt-2 text-[2.8rem] font-black leading-[1.02] tracking-[-0.055em] text-[#202a31] sm:text-5xl lg:text-6xl">
              Find what you
              <span className="block text-[#24BD11]">
                need to study.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#647075] sm:text-lg sm:leading-8">
              Browse the learning library by education level.
              Everything shown here comes directly from the
              Parro Notes library.
            </p>
          </div>

          {/* Functional search bar */}

          <form
            action="/search"
            method="GET"
            role="search"
            className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-[20px] bg-white p-2 shadow-[0_12px_32px_rgba(36,189,17,0.13),0_4px_14px_rgba(32,42,49,0.05)] transition-shadow duration-200 hover:shadow-[0_14px_36px_rgba(36,189,17,0.17),0_4px_14px_rgba(32,42,49,0.05)]"
            style={{ border: "none" }}
          >
            <Search
              size={22}
              strokeWidth={2.1}
              aria-hidden="true"
              className="ml-3 shrink-0 text-[#497f78]"
            />

            <input
              type="text"
              name="q"
              autoComplete="off"
              spellCheck={false}
              aria-label="Search notes, subjects, and topics"
              placeholder="Search notes, subjects, topics..."
              className="m-0 block h-12 min-w-0 flex-1 appearance-none border-0 bg-transparent px-1 text-sm text-[#202a31] shadow-none outline-none ring-0 placeholder:text-[#87918f] focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 sm:text-base"
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
                WebkitAppearance: "none",
              }}
            />

            <button
              type="submit"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[15px] bg-[#24BD11] px-4 text-sm font-bold text-white shadow-[0_4px_12px_rgba(36,189,17,0.20)] transition-colors hover:bg-[#1da70d] sm:px-5"
            >
              <span>Search</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>

      {/* ======================================================
          EDUCATION LEVELS
      ======================================================= */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Section heading */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#24BD11]">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#202a31] sm:text-3xl">
                Choose where you study
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69736e] sm:text-base">
                Start from your education level and move directly
                into the programs and notes available there.
              </p>
            </div>

            <span className="text-sm font-semibold text-[#8a9290]">
              {educationLevels.length}{" "}
              {educationLevels.length === 1 ? "level" : "levels"}{" "}
              available
            </span>
          </div>

          {/* Education cards */}

          {educationLevels.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {educationLevels.map((educationLevel, index) => {
                const palette =
                  palettes[index % palettes.length];

                return (
                  <Link
                    key={educationLevel.id}
                    href={`/notes/${educationLevel.slug}`}
                    className="group relative overflow-hidden rounded-[28px] border border-white p-6 shadow-[0_8px_26px_rgba(39,52,46,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_15px_34px_rgba(39,52,46,0.11)]"
                    style={{
                      backgroundColor: palette.background,
                    }}
                  >
                    {/* Decorative circle */}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        backgroundColor: palette.icon,
                      }}
                    />

                    {/* Card top */}

                    <div className="relative flex items-start justify-between gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-[17px] text-white shadow-sm"
                        style={{
                          backgroundColor: palette.icon,
                        }}
                      >
                        <GraduationCap
                          size={27}
                          strokeWidth={2}
                        />
                      </div>

                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#405049] shadow-[0_5px_15px_rgba(39,52,46,0.08)] transition-colors"
                        aria-hidden="true"
                      >
                        <ChevronRight
                          size={21}
                          strokeWidth={2.3}
                        />
                      </span>
                    </div>

                    {/* Card content */}

                    <div className="relative mt-7">
                      <h3 className="text-xl font-black tracking-[-0.025em] text-[#202a31]">
                        {educationLevel.name}
                      </h3>

                      <p className="mt-3 min-h-[48px] max-w-sm text-sm leading-6 text-[#5d7076]">
                        {educationLevel.description ||
                          "Explore the programs, subjects, topics, and notes available here."}
                      </p>
                    </div>

                    {/* Card footer */}

                    <div className="relative mt-7 flex items-center justify-between border-t border-black/5 pt-4">
                      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#74807c]">
                        Explore level
                      </span>

                      <span
                        className="flex items-center gap-1 text-sm font-black"
                        style={{
                          color: palette.text,
                        }}
                      >
                        View
                        <ArrowRight
                          size={16}
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Empty state */

            <div className="mt-8 rounded-[28px] border border-dashed border-[#d8dfd5] bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#eff8e9] text-[#24BD11]">
                <BookOpen size={27} strokeWidth={2} />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#202a31]">
                The library is being prepared
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d7774]">
                Education levels added to the Parro Notes library
                will automatically appear here.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#24BD11] transition hover:text-[#1da70d]"
              >
                Back to home
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          BOTTOM MESSAGE
      ======================================================= */}

      <section className="border-t border-[#e9ede4] bg-[#f5f8ef]">
        <div className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-white text-[#24BD11] shadow-sm">
            <BookOpen size={23} strokeWidth={2} />
          </div>

          <h2 className="mt-4 text-xl font-black tracking-[-0.025em] text-[#202a31]">
            Everything is organized for studying
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#69736e]">
            Choose a level, open a program, and continue directly
            to the subjects and notes you need.
          </p>
        </div>
      </section>
    </main>
  );
}