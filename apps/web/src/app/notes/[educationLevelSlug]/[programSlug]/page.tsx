import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Search,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  Program,
  Subject,
} from "@/types/api";

export const instant = false;

interface ProgramPageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
  }>;
}

async function getProgram(
  educationLevelSlug: string,
  programSlug: string,
): Promise<Program | null> {
  try {
    const response = await apiRequest<ApiResponse<Program>>(
      `/programs/slug/${encodeURIComponent(
        educationLevelSlug,
      )}/${encodeURIComponent(programSlug)}`,
    );

    return response.data ?? null;
  } catch {
    return null;
  }
}

async function getSubjects(
  programId: string,
): Promise<Subject[]> {
  try {
    const response = await apiRequest<
      ApiResponse<Subject[]>
    >(
      `/subjects?programId=${encodeURIComponent(programId)}`,
    );

    return response.data ?? [];
  } catch {
    return [];
  }
}

export default async function ProgramPage({
  params,
}: ProgramPageProps) {
  const {
    educationLevelSlug,
    programSlug,
  } = await params;

  const program = await getProgram(
    educationLevelSlug,
    programSlug,
  );

  if (!program) {
    return (
      <main className="min-h-screen bg-[#FFFDF7] px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/notes/${educationLevelSlug}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#202A31] transition hover:text-[#24BD11]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="rounded-[28px] border border-[#202A31]/10 bg-white p-8 text-center shadow-[0_12px_40px_rgba(32,42,49,0.06)] sm:p-12">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24BD11]/10 text-[#24BD11]">
              <BookOpen className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#202A31]">
              Class or program not found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#202A31]/60">
              We couldn&apos;t find this class or program under the
              selected education level.
            </p>

            <Link
              href={`/notes/${educationLevelSlug}`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#24BD11] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1fa50f]"
            >
              View available classes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const subjects = await getSubjects(program.id);

  const educationLevelName =
    program.educationLevel?.name ?? educationLevelSlug;

  return (
    <main className="min-h-screen bg-[#FFFDF7] text-[#202A31]">
      {/* Header */}
      <section className="border-b border-[#202A31]/8">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-sm"
          >
            <Link
              href="/"
              className="font-medium text-[#202A31]/50 transition hover:text-[#24BD11]"
            >
              Home
            </Link>

            <ChevronRight className="h-4 w-4 text-[#202A31]/25" />

            <Link
              href="/notes"
              className="font-medium text-[#202A31]/50 transition hover:text-[#24BD11]"
            >
              Notes
            </Link>

            <ChevronRight className="h-4 w-4 text-[#202A31]/25" />

            <Link
              href={`/notes/${educationLevelSlug}`}
              className="font-medium text-[#202A31]/50 transition hover:text-[#24BD11]"
            >
              {educationLevelName}
            </Link>

            <ChevronRight className="h-4 w-4 text-[#202A31]/25" />

            <span className="font-semibold text-[#202A31]">
              {program.name}
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#24BD11]/20 bg-[#24BD11]/8 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#24BD11]">
              <BookOpen className="h-3.5 w-3.5" />
              {educationLevelName}
            </div>

            <h1 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              {program.name}
            </h1>

            {program.description && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#202A31]/60 sm:text-lg">
                {program.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#24BD11]">
              Subjects
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Choose a subject
            </h2>

            <p className="mt-2 text-sm text-[#202A31]/55">
              Explore topics and notes available for {program.name}.
            </p>
          </div>

          {subjects.length > 0 && (
            <span className="hidden rounded-full bg-[#202A31]/5 px-3 py-1.5 text-xs font-bold text-[#202A31]/60 sm:block">
              {subjects.length}{" "}
              {subjects.length === 1
                ? "subject"
                : "subjects"}
            </span>
          )}
        </div>

        {subjects.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#202A31]/15 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B942]/15 text-[#C58A00]">
              <BookOpen className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              No subjects available yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#202A31]/55">
              Subjects for this class haven&apos;t been added yet.
              Check back later for new study material.
            </p>

            <Link
              href={`/notes/${educationLevelSlug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#24BD11] hover:underline"
            >
              Back to {educationLevelName}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => {
              const accents = [
                {
                  background: "bg-[#E8F8E5]",
                  icon: "bg-[#24BD11]/12",
                  text: "text-[#1D9D12]",
                },
                {
                  background: "bg-[#FFF4D9]",
                  icon: "bg-[#F4B942]/15",
                  text: "text-[#B47A00]",
                },
                {
                  background: "bg-[#E8F6FA]",
                  icon: "bg-[#39A9C6]/12",
                  text: "text-[#21839B]",
                },
                {
                  background: "bg-[#F2EAFE]",
                  icon: "bg-[#8B5CF6]/12",
                  text: "text-[#7042C4]",
                },
                {
                  background: "bg-[#FFF0E8]",
                  icon: "bg-[#F27A3D]/12",
                  text: "text-[#D45D25]",
                },
              ];

              const accent =
                accents[index % accents.length];

              return (
                <Link
                  key={subject.id}
                  href={`/notes/${educationLevelSlug}/${programSlug}/${subject.slug}`}
                  className={`group relative overflow-hidden rounded-[24px] border border-[#202A31]/8 ${accent.background} p-6 transition duration-200 hover:-translate-y-1 hover:border-[#202A31]/12 hover:shadow-[0_14px_35px_rgba(32,42,49,0.08)]`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent.icon} ${accent.text}`}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/70 ${accent.text} transition-transform duration-200 group-hover:translate-x-1`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-7">
                    {subject.code && (
                      <p
                        className={`mb-2 text-xs font-black uppercase tracking-[0.14em] ${accent.text}`}
                      >
                        {subject.code}
                      </p>
                    )}

                    <h3 className="text-xl font-black tracking-tight">
                      {subject.name}
                    </h3>

                    {subject.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#202A31]/55">
                        {subject.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-bold text-[#202A31]/55 transition group-hover:text-[#202A31]">
                    Explore subject
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom navigation */}
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 rounded-[24px] border border-[#202A31]/8 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-bold text-[#202A31]">
              Looking for something specific?
            </p>

            <p className="mt-1 text-sm text-[#202A31]/50">
              Search across all available notes and study material.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#202A31] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#24BD11]"
          >
            Search notes
            <Search className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}