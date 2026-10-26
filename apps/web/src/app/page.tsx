import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers3,
  Search,
} from "lucide-react";
import { Suspense } from "react";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  EducationLevel,
} from "@/types/api";

const educationCardStyles = [
  {
    background: "#eff8e9",
    iconBackground: "#24BD11",
    icon: BookOpen,
  },
  {
    background: "#fff0ed",
    iconBackground: "#f06a5f",
    icon: GraduationCap,
  },
  {
    background: "#f8f8df",
    iconBackground: "#9ba42d",
    icon: FileText,
  },
  {
    background: "#edf5f7",
    iconBackground: "#4f8997",
    icon: Layers3,
  },
];

async function getEducationLevels(): Promise<EducationLevel[]> {
  try {
    const response = await apiRequest<ApiResponse<EducationLevel[]>>(
      "/education-levels",
    );

    return response.data ?? [];
  } catch (error) {
    console.error("Failed to load education levels:", error);
    return [];
  }
}

async function EducationLevels() {
  const educationLevels = await getEducationLevels();

  if (educationLevels.length === 0) {
    return (
      <div className="mt-8 rounded-[26px] border border-dashed border-[#dfe4da] bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#eff8e9] text-[#24BD11]">
          <BookOpen size={22} />
        </div>

        <h3 className="mt-4 text-lg font-black text-[#202a31]">
          No content available yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#69736e]">
          Education levels added through the admin panel
          will automatically appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {educationLevels.map((educationLevel, index) => {
        const style =
          educationCardStyles[index % educationCardStyles.length];

        const Icon = style.icon;

        return (
          <Link
            key={educationLevel.id}
            href={`/notes/${educationLevel.slug}`}
            className="group relative overflow-hidden rounded-[26px] border border-white/80 p-5 shadow-[0_8px_24px_rgba(43,54,46,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(43,54,46,0.10)] sm:p-6"
            style={{ backgroundColor: style.background }}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-[17px] text-white shadow-sm"
                style={{ backgroundColor: style.iconBackground }}
              >
                <Icon size={26} strokeWidth={2} />
              </div>

              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#34443d] shadow-[0_5px_15px_rgba(43,54,46,0.08)] transition group-hover:bg-[#24BD11] group-hover:text-white">
                <ChevronRight size={21} strokeWidth={2.3} />
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-[20px] font-black tracking-[-0.025em] text-[#202a31]">
                {educationLevel.name}
              </h3>

              <p className="mt-1.5 max-w-[280px] text-[15px] leading-6 text-[#587078]">
                {educationLevel.description ||
                  "Explore available subjects, topics, and notes."}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function EducationLevelsLoading() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-[26px] border border-[#edf0e8] bg-white p-6"
        >
          <div className="h-14 w-14 animate-pulse rounded-[17px] bg-[#e8eee4]" />
          <div className="mt-6 h-6 w-32 animate-pulse rounded-lg bg-[#edf0e8]" />
          <div className="mt-3 h-4 w-56 animate-pulse rounded bg-[#f1f3ee]" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded bg-[#f1f3ee]" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fffdf8]">
      {/* HERO */}

      <section className="relative overflow-hidden">
        {/* Background shapes */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-br-[120px] rounded-tl-none rounded-tr-full rounded-bl-full bg-[#24BD11]/10 sm:h-80 sm:w-80" />

          <div className="absolute -right-24 top-0 h-64 w-64 rounded-bl-[120px] rounded-tl-full rounded-tr-none rounded-br-full bg-[#f06a5f]/10 sm:h-80 sm:w-80" />

          <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-[#d9dc75]/15" />

          <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#4f8997]/[0.08]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            {/* Heading and strokes anchored to the first line */}

            <h1 className="text-[3rem] font-black leading-[0.98] tracking-[-0.06em] text-[#202a31] sm:text-6xl lg:text-[5.25rem]">
              <span className="relative inline-block">
                Find what you need.

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-9 hidden h-7 w-10 sm:block"
                >
                  <span className="absolute left-1 top-1 h-6 w-[9px] -rotate-[18deg] rounded-full bg-[#24BD11]" />

                  <span className="absolute right-1 top-2 h-6 w-[9px] rotate-[35deg] rounded-full bg-[#f6a62e]" />
                </span>
              </span>

              <span className="mt-2 block text-[#24BD11]">
                Start learning.
              </span>
            </h1>

            {/* Headline underline */}

            <div className="mx-auto mt-4 h-2.5 w-40 rotate-[-2deg] rounded-full bg-[#a9c97d]/70 sm:w-52" />

            {/* Description */}

            <p className="mx-auto mt-7 max-w-3xl text-[16px] leading-7 text-[#5f6c70] sm:text-xl sm:leading-9">
              Parro Notes brings your educational material
              into one organized place — searchable,
              structured, and easy to study from.
            </p>

            {/* Search bar: no border, no native search controls */}

            <form
              action="/search"
              method="GET"
              role="search"
              className="mx-auto mt-9 flex max-w-3xl items-center gap-2 rounded-[25px] border-0 bg-white p-2 shadow-[0_14px_38px_rgba(36,189,17,0.15),0_5px_18px_rgba(32,42,49,0.05)] outline-none transition-shadow duration-200 focus-within:shadow-[0_16px_42px_rgba(36,189,17,0.18),0_5px_18px_rgba(32,42,49,0.05)]"
              style={{ border: "none" }}
            >
              <Search
                size={28}
                strokeWidth={2}
                aria-hidden="true"
                className="ml-4 shrink-0 text-[#497f78]"
              />

              <input
                type="text"
                name="q"
                autoComplete="off"
                spellCheck={false}
                aria-label="Search notes..."
                placeholder="Search notes..."
                className="m-0 block h-14 min-w-0 flex-1 appearance-none border-0 bg-transparent px-1 py-4 text-[15px] text-[#202a31] shadow-none outline-none ring-0 placeholder:text-[#78858a] focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none sm:text-lg"
                style={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  WebkitAppearance: "none",
                }}
              />

              <button
                type="submit"
                aria-label="Search"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#24BD11] text-white shadow-[0_5px_15px_rgba(36,189,17,0.25)] transition hover:bg-[#1da70d] sm:w-auto sm:px-6"
              >
                <span className="hidden font-bold sm:inline">
                  Search
                </span>

                <Search
                  size={23}
                  className="sm:hidden"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </button>
            </form>

            {/* Browse */}

            <div className="mt-7">
              <p className="text-sm text-[#6d7879] sm:text-base">
                Or browse your learning level below
              </p>

              <Link
                href="/notes"
                className="mt-3 inline-flex items-center gap-2 text-base font-black text-[#24BD11] transition hover:text-[#1da70d] sm:text-lg"
              >
                Browse all notes
                <ArrowRight size={20} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE */}

      <section className="border-t border-[#edf0e8] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#24BD11]">
              Explore
            </p>

            <h2 className="mt-2 text-[2rem] font-black tracking-[-0.045em] text-[#202a31] sm:text-4xl">
              Choose where you study
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[#667275] sm:text-lg">
              Everything here comes directly from the Parro
              Notes library.
            </p>
          </div>

          <Suspense fallback={<EducationLevelsLoading />}>
            <EducationLevels />
          </Suspense>
        </div>
      </section>

      {/* REQUEST A NOTE */}

      <section className="bg-[#f5f8ef]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="flex flex-col gap-6 rounded-[28px] bg-[#eaf5e5] p-7 sm:p-9 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-[#5f7860]">
                Can&apos;t find what you need?
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-[-0.035em] text-[#202a31]">
                Request a note.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#65716c]">
                Tell us which study material is missing.
              </p>
            </div>

            <Link
              href="/request"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[16px] bg-[#24BD11] px-6 py-3.5 text-sm font-black text-white shadow-[0_6px_16px_rgba(36,189,17,0.20)] transition hover:bg-[#1da70d]"
            >
              Request a note
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}