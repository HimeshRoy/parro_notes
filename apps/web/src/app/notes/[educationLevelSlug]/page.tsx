import Link from "next/link";
import {
  ArrowLeft,
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
  Program,
} from "@/types/api";

export const instant = false;

interface EducationLevelPageProps {
  params: Promise<{
    educationLevelSlug: string;
  }>;
}

/* ============================================================
   API
============================================================ */

async function getEducationLevels(): Promise<
  EducationLevel[]
> {
  try {
    const response = await apiRequest<
      ApiResponse<EducationLevel[]>
    >("/education-levels");

    return response.data ?? [];
  } catch (error) {
    console.error(
      "Failed to load education levels:",
      error,
    );

    return [];
  }
}

async function getPrograms(
  educationLevelId: string,
): Promise<Program[]> {
  try {
    const response = await apiRequest<
      ApiResponse<Program[]>
    >(
      `/programs?educationLevelId=${encodeURIComponent(
        educationLevelId,
      )}`,
    );

    return response.data ?? [];
  } catch (error) {
    console.error(
      "Failed to load programs:",
      error,
    );

    return [];
  }
}

/* ============================================================
   PAGE
============================================================ */

export default async function EducationLevelPage({
  params,
}: EducationLevelPageProps) {
  const { educationLevelSlug } = await params;

  /*
   * Get the real education levels from the backend
   * and find the requested level by its public slug.
   */
  const educationLevels = await getEducationLevels();

  const educationLevel =
    educationLevels.find(
      (level) =>
        level.slug === educationLevelSlug,
    ) ?? null;

  /* ==========================================================
     NOT FOUND
  ========================================================== */

  if (!educationLevel) {
    return (
      <main className="min-h-[70vh] bg-[#fffdf8]">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#eff8e9] text-[#24BD11]">
            <BookOpen
              size={30}
              strokeWidth={2}
            />
          </div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#24BD11]">
            Page not found
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#202a31]">
            Learning level not found
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#69736e]">
            We couldn't find the learning level you're
            looking for. It may have been removed or the
            link may no longer be available.
          </p>

          <Link
            href="/notes"
            className="mt-7 inline-flex items-center gap-2 rounded-[15px] bg-[#24BD11] px-5 py-3 text-sm font-black text-white shadow-[0_6px_16px_rgba(36,189,17,0.18)] transition hover:bg-[#1da70d]"
          >
            <ArrowLeft
              size={17}
              strokeWidth={2.3}
            />
            Back to library
          </Link>
        </div>
      </main>
    );
  }

  /* ==========================================================
     REAL PROGRAMS
  ========================================================== */

  const programs = await getPrograms(
    educationLevel.id,
  );

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative overflow-hidden border-b border-[#e9ede4]">
        {/* Soft colorful background shapes */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#24BD11]/8" />

          <div className="absolute -right-28 -top-10 h-72 w-72 rounded-bl-[120px] bg-[#f06a5f]/8" />

          <div className="absolute bottom-[-120px] left-[45%] h-64 w-64 rounded-full bg-[#f5d95c]/10" />

          <div className="absolute right-[17%] top-24 hidden h-10 w-3 rotate-[-18deg] rounded-full bg-[#24BD11]/80 sm:block" />

          <div className="absolute right-[13%] top-28 hidden h-9 w-3 rotate-[35deg] rounded-full bg-[#f6a62e]/90 sm:block" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm"
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
            />

            <Link
              href="/notes"
              className="font-semibold text-[#69736e] transition hover:text-[#24BD11]"
            >
              Notes
            </Link>

            <ChevronRight
              size={15}
              className="text-[#a0a7a4]"
              strokeWidth={2}
            />

            <span className="font-bold text-[#202a31]">
              {educationLevel.name}
            </span>
          </nav>

          {/* Heading */}

          <div className="mt-8 max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#24BD11] text-white shadow-[0_7px_18px_rgba(36,189,17,0.20)]">
              <GraduationCap
                size={28}
                strokeWidth={2}
              />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#24BD11]">
              Learning level
            </p>

            <h1 className="mt-2 text-[2.7rem] font-black leading-[1.02] tracking-[-0.055em] text-[#202a31] sm:text-5xl lg:text-6xl">
              {educationLevel.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#647075] sm:text-lg sm:leading-8">
              {educationLevel.description ||
                "Explore the programs, subjects, topics, and notes available in this learning level."}
            </p>
          </div>

          {/* Search */}

          <Link
            href="/search"
            className="mt-8 flex max-w-2xl items-center gap-3 rounded-[20px] border border-[#d7e2dc] bg-white px-4 py-3.5 shadow-[0_7px_22px_rgba(36,189,17,0.07)] transition hover:border-[#24BD11]/40 hover:shadow-[0_10px_28px_rgba(36,189,17,0.10)]"
          >
            <Search
              size={21}
              className="shrink-0 text-[#24BD11]"
              strokeWidth={2.1}
            />

            <span className="flex-1 text-sm text-[#7a8588] sm:text-base">
              Search notes, subjects, topics...
            </span>

            <span className="hidden rounded-lg bg-[#eff8e9] px-3 py-1.5 text-xs font-bold text-[#24BD11] sm:block">
              Search
            </span>
          </Link>
        </div>
      </section>

      {/* ======================================================
          PROGRAMS
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
                Choose your program
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69736e] sm:text-base">
                Select a class or program to see its
                subjects and learning material.
              </p>
            </div>

            <span className="text-sm font-semibold text-[#8a9290]">
              {programs.length}{" "}
              {programs.length === 1
                ? "program"
                : "programs"}{" "}
              available
            </span>
          </div>

          {/* ==================================================
              PROGRAM CARDS
          =================================================== */}

          {programs.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => {
                const isGreen = index % 2 === 0;

                return (
                  <Link
                    key={program.id}
                    href={`/notes/${educationLevel.slug}/${program.slug}`}
                    className="group relative overflow-hidden rounded-[28px] border border-white p-6 shadow-[0_8px_26px_rgba(39,52,46,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_15px_34px_rgba(39,52,46,0.11)]"
                    style={{
                      backgroundColor: isGreen
                        ? "#eff8e9"
                        : "#edf5f7",
                    }}
                  >
                    {/* Decorative shape */}

                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${
                        isGreen
                          ? "bg-[#24BD11]/8"
                          : "bg-[#4f8997]/8"
                      }`}
                    />

                    {/* Card top */}

                    <div className="relative flex items-start justify-between gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-[17px] text-white shadow-sm ${
                          isGreen
                            ? "bg-[#24BD11]"
                            : "bg-[#4f8997]"
                        }`}
                      >
                        <GraduationCap
                          size={26}
                          strokeWidth={2}
                        />
                      </div>

                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#405049] shadow-[0_5px_15px_rgba(39,52,46,0.08)] transition group-hover:bg-[#24BD11] group-hover:text-white">
                        <ChevronRight
                          size={21}
                          strokeWidth={2.3}
                        />
                      </span>
                    </div>

                    {/* Card content */}

                    <div className="relative mt-7">
                      <h3 className="text-xl font-black tracking-[-0.025em] text-[#202a31]">
                        {program.name}
                      </h3>

                      <p className="mt-3 min-h-[48px] max-w-sm text-sm leading-6 text-[#5d7076]">
                        {program.description ||
                          "Explore the subjects, topics, and notes available in this program."}
                      </p>
                    </div>

                    {/* Card bottom */}

                    <div className="relative mt-7 flex items-center justify-between border-t border-black/5 pt-4">
                      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#74807c]">
                        Open program
                      </span>

                      <span
                        className={`flex items-center gap-1 text-sm font-black ${
                          isGreen
                            ? "text-[#24BD11]"
                            : "text-[#4f8997]"
                        }`}
                      >
                        View
                        <ArrowRight
                          size={16}
                          strokeWidth={2.4}
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* =================================================
               EMPTY STATE
            ================================================== */

            <div className="mt-8 rounded-[28px] border border-dashed border-[#d8dfd5] bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#eff8e9] text-[#24BD11]">
                <GraduationCap
                  size={27}
                  strokeWidth={2}
                />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#202a31]">
                No programs available yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d7774]">
                Programs and classes added to this learning
                level will appear here automatically.
              </p>

              <Link
                href="/notes"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#24BD11] transition hover:text-[#1da70d]"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2.2}
                />
                Back to all levels
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          BOTTOM NAVIGATION
      ======================================================= */}

      <section className="border-t border-[#e9ede4] bg-[#f5f8ef]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-black text-[#24BD11] transition hover:text-[#1da70d]"
          >
            <ArrowLeft
              size={17}
              strokeWidth={2.2}
            />
            Back to all learning levels
          </Link>
        </div>
      </section>
    </main>
  );
}