import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  Note,
  Topic,
} from "@/types/api";

export const instant = false;

interface TopicPageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
    subjectSlug: string;
    topicSlug: string;
  }>;
}

interface TopicWithHierarchy extends Topic {
  subject?: {
    id: string;
    name: string;
    slug: string;
    program?: {
      id: string;
      name: string;
      slug: string;
      educationLevel?: {
        id: string;
        name: string;
        slug: string;
      };
    };
  };
}

async function getTopic(
  educationLevelSlug: string,
  programSlug: string,
  subjectSlug: string,
  topicSlug: string,
): Promise<TopicWithHierarchy | null> {
  try {
    const response = await apiRequest<
      ApiResponse<TopicWithHierarchy>
    >(
      `/topics/slug/${encodeURIComponent(
        educationLevelSlug,
      )}/${encodeURIComponent(
        programSlug,
      )}/${encodeURIComponent(
        subjectSlug,
      )}/${encodeURIComponent(topicSlug)}`,
    );

    return response.data ?? null;
  } catch {
    return null;
  }
}

async function getNotes(topicId: string): Promise<Note[]> {
  try {
    const response = await apiRequest<ApiResponse<Note[]>>(
      `/notes?topicId=${encodeURIComponent(topicId)}`,
    );

    return response.data ?? [];
  } catch {
    return [];
  }
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const {
    educationLevelSlug,
    programSlug,
    subjectSlug,
    topicSlug,
  } = await params;

  const topic = await getTopic(
    educationLevelSlug,
    programSlug,
    subjectSlug,
    topicSlug,
  );

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#FFFDF7] px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}`}
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
              Topic not found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#202A31]/60">
              We couldn&apos;t find this topic under the selected
              subject.
            </p>

            <Link
              href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}`}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#24BD11] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1fa50f]"
            >
              View available topics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const notes = await getNotes(topic.id);

  const subjectName =
    topic.subject?.name ?? subjectSlug;

  const programName =
    topic.subject?.program?.name ?? programSlug;

  const educationLevelName =
    topic.subject?.program?.educationLevel?.name ??
    educationLevelSlug;

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

            <Link
              href={`/notes/${educationLevelSlug}/${programSlug}`}
              className="font-medium text-[#202A31]/50 transition hover:text-[#24BD11]"
            >
              {programName}
            </Link>

            <ChevronRight className="h-4 w-4 text-[#202A31]/25" />

            <Link
              href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}`}
              className="font-medium text-[#202A31]/50 transition hover:text-[#24BD11]"
            >
              {subjectName}
            </Link>

            <ChevronRight className="h-4 w-4 text-[#202A31]/25" />

            <span className="font-semibold text-[#202A31]">
              {topic.name}
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#24BD11]/20 bg-[#24BD11]/8 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#24BD11]">
              <BookOpen className="h-3.5 w-3.5" />
              {subjectName}
            </div>

            <h1 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              {topic.name}
            </h1>

            {topic.description && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#202A31]/60 sm:text-lg">
                {topic.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#24BD11]">
            Notes
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            Study {topic.name}
          </h2>

          <p className="mt-2 text-sm text-[#202A31]/55">
            Open a note to start studying.
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#202A31]/15 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B942]/15 text-[#C58A00]">
              <FileText className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              No notes available yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#202A31]/55">
              Notes for this topic haven&apos;t been added yet.
            </p>

            <Link
              href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#24BD11] hover:underline"
            >
              Back to {subjectName}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#202A31]/10 bg-white">
            {notes.map((note, index) => (
              <Link
                key={note.id}
                href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}/${note.slug}`}
                className="group flex min-h-[76px] items-center gap-4 border-b border-[#202A31]/8 px-4 py-4 transition last:border-b-0 hover:bg-[#F7FFF5] sm:px-6"
              >
                {/* Number
                <span className="w-8 shrink-0 text-sm font-bold tabular-nums text-[#202A31]/30">
                  {String(index + 1).padStart(2, "0")}
                </span> */}

                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#24BD11]/10 text-[#24BD11]">
                  <FileText className="h-4 w-4" />
                </div>

                {/* Note information */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-bold text-[#202A31] sm:text-base">
                    {note.title}
                  </h3>

                  {note.description && (
                    <p className="mt-0.5 truncate text-xs text-[#202A31]/45 sm:text-sm">
                      {note.description}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#202A31]/30 transition-all group-hover:bg-[#24BD11]/10 group-hover:text-[#24BD11]">
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Bottom search */}
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