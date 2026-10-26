import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  FileImage,
  FileText,
  FileType2,
  Presentation,
  Video,
} from "lucide-react";

import type {
  Note,
  NoteResource,
} from "@/types/api";

export const instant = false;

interface PageProps {
  params: Promise<{
    educationLevelSlug: string;
    programSlug: string;
    subjectSlug: string;
    topicSlug: string;
    noteSlug: string;
  }>;
}

async function getNote(
  educationLevelSlug: string,
  programSlug: string,
  subjectSlug: string,
  topicSlug: string,
  noteSlug: string,
): Promise<Note | null> {
  const response = await fetch(
    `http://localhost:5000/api/notes/slug/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}/${noteSlug}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  return result.data ?? null;
}

function getResourceIcon(type: NoteResource["type"]) {
  switch (type) {
    case "PDF":
      return FileText;

    case "DOCUMENT":
      return FileType2;

    case "PRESENTATION":
      return Presentation;

    case "IMAGE":
      return FileImage;

    case "VIDEO":
      return Video;

    default:
      return ExternalLink;
  }
}

function getResourceLabel(type: NoteResource["type"]) {
  switch (type) {
    case "PDF":
      return "PDF document";

    case "DOCUMENT":
      return "Document";

    case "PRESENTATION":
      return "Presentation";

    case "IMAGE":
      return "Image";

    case "VIDEO":
      return "Video";

    case "EXTERNAL_LINK":
      return "External resource";

    default:
      return "Resource";
  }
}

function getResourceAction(type: NoteResource["type"]) {
  switch (type) {
    case "PDF":
    case "DOCUMENT":
    case "PRESENTATION":
      return "Open document";

    case "IMAGE":
      return "View image";

    case "VIDEO":
      return "Watch video";

    case "EXTERNAL_LINK":
      return "Open resource";

    default:
      return "Open";
  }
}

export default async function NotePage({
  params,
}: PageProps) {
  const {
    educationLevelSlug,
    programSlug,
    subjectSlug,
    topicSlug,
    noteSlug,
  } = await params;

  const note = await getNote(
    educationLevelSlug,
    programSlug,
    subjectSlug,
    topicSlug,
    noteSlug,
  );

  if (!note) {
    return (
      <main className="min-h-screen bg-[#FFFDF7] px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#24BD11]/10 text-[#24BD11]">
            <BookOpen size={28} />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#202A31]">
            Note not found
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[#66737A]">
            This note may have been moved, renamed, or is no longer
            available.
          </p>

          <Link
            href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#24BD11] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1fa80f]"
          >
            <ArrowLeft size={17} />
            Back to topic
          </Link>
        </div>
      </main>
    );
  }

  const educationLevel =
    note.topic?.subject?.program?.educationLevel;

  const program = note.topic?.subject?.program;
  const subject = note.topic?.subject;
  const topic = note.topic;

  const resources = note.resources ?? [];

  return (
    <main className="min-h-screen bg-[#FFFDF7] text-[#202A31]">
      {/* Breadcrumbs */}
      <section className="border-b border-[#E8E4D9] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm">
            <Link
              href="/"
              className="text-[#748087] transition hover:text-[#24BD11]"
            >
              Home
            </Link>

            <ChevronRight
              size={15}
              className="shrink-0 text-[#AEB7BB]"
            />

            <Link
              href="/notes"
              className="text-[#748087] transition hover:text-[#24BD11]"
            >
              Notes
            </Link>

            {educationLevel && (
              <>
                <ChevronRight
                  size={15}
                  className="shrink-0 text-[#AEB7BB]"
                />

                <Link
                  href={`/notes/${educationLevel.slug}`}
                  className="text-[#748087] transition hover:text-[#24BD11]"
                >
                  {educationLevel.name}
                </Link>
              </>
            )}

            {program && educationLevel && (
              <>
                <ChevronRight
                  size={15}
                  className="shrink-0 text-[#AEB7BB]"
                />

                <Link
                  href={`/notes/${educationLevel.slug}/${program.slug}`}
                  className="text-[#748087] transition hover:text-[#24BD11]"
                >
                  {program.name}
                </Link>
              </>
            )}

            {subject && educationLevel && program && (
              <>
                <ChevronRight
                  size={15}
                  className="shrink-0 text-[#AEB7BB]"
                />

                <Link
                  href={`/notes/${educationLevel.slug}/${program.slug}/${subject.slug}`}
                  className="text-[#748087] transition hover:text-[#24BD11]"
                >
                  {subject.name}
                </Link>
              </>
            )}

            {topic &&
              educationLevel &&
              program &&
              subject && (
                <>
                  <ChevronRight
                    size={15}
                    className="shrink-0 text-[#AEB7BB]"
                  />

                  <Link
                    href={`/notes/${educationLevel.slug}/${program.slug}/${subject.slug}/${topic.slug}`}
                    className="text-[#748087] transition hover:text-[#24BD11]"
                  >
                    {topic.name}
                  </Link>
                </>
              )}

            <ChevronRight
              size={15}
              className="shrink-0 text-[#AEB7BB]"
            />

            <span className="max-w-[220px] truncate font-medium text-[#202A31]">
              {note.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Note header */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-6 lg:px-8 sm:pt-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#24BD11]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#209E12]">
              <BookOpen size={14} />
              Study note
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#202A31] sm:text-4xl lg:text-5xl">
              {note.title}
            </h1>

            {note.description && (
              <p className="mt-5 max-w-3xl text-base leading-7 text-[#66737A] sm:text-lg sm:leading-8">
                {note.description}
              </p>
            )}

            {topic && (
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[#748087]">
                <span>{subject?.name}</span>

                <span className="text-[#B4BCBF]">/</span>

                <span>{topic.name}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reader */}
      <section className="border-t border-[#E8E4D9] bg-[#F7F5EE]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-10">
          {/* Main resource area */}
          <div className="min-w-0">
            <div className="rounded-3xl border border-[#E4E0D5] bg-white p-5 shadow-[0_8px_30px_rgba(32,42,49,0.05)] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[#ECE9E0] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#24BD11]">
                    Learning resources
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#202A31]">
                    {resources.length === 1
                      ? "Study material"
                      : `${resources.length} study resources`}
                  </h2>
                </div>

                <div className="hidden rounded-xl bg-[#FFF8D9] px-3 py-2 text-xs font-semibold text-[#806A17] sm:block">
                  Open in a new tab
                </div>
              </div>

              {resources.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {resources.map((resource, index) => {
                    const Icon = getResourceIcon(resource.type);

                    return (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-[#E8E4D9] bg-[#FFFDF7] p-4 transition hover:-translate-y-0.5 hover:border-[#24BD11]/40 hover:shadow-[0_8px_24px_rgba(36,189,17,0.08)] sm:p-5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#24BD11]/10 text-[#24BD11]">
                          <Icon size={22} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#9AA3A7]">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3 className="truncate font-semibold text-[#202A31] group-hover:text-[#24BD11]">
                              {resource.title ||
                                getResourceLabel(resource.type)}
                            </h3>
                          </div>

                          <p className="mt-1 text-sm text-[#7A858A]">
                            {getResourceLabel(resource.type)}
                          </p>
                        </div>

                        <div className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#66737A] transition group-hover:text-[#24BD11] sm:flex">
                          {getResourceAction(resource.type)}
                          <ArrowUpRight size={17} />
                        </div>

                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-[#9BA4A8] sm:hidden"
                        />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F0EA] text-[#7B8589]">
                    <FileText size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#202A31]">
                    No resources yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#748087]">
                    This note has been published, but study material
                    has not been attached yet.
                  </p>
                </div>
              )}
            </div>

            {/* Back navigation */}
            <div className="mt-5">
              <Link
                href={`/notes/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#66737A] transition hover:text-[#24BD11]"
              >
                <ArrowLeft size={17} />
                Back to {topic?.name ?? "topic"}
              </Link>
            </div>
          </div>

          {/* Study sidebar */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-3xl border border-[#E4E0D5] bg-white p-5 shadow-[0_8px_30px_rgba(32,42,49,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0D8] text-[#C77B16]">
                  <BookOpen size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#9AA3A7]">
                    You are studying
                  </p>

                  <p className="mt-0.5 font-bold text-[#202A31]">
                    {topic?.name ?? "This topic"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-[#ECE9E0] pt-5">
                {subject && (
                  <div>
                    <p className="text-xs font-semibold text-[#9AA3A7]">
                      Subject
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#202A31]">
                      {subject.name}
                    </p>
                  </div>
                )}

                {program && (
                  <div>
                    <p className="text-xs font-semibold text-[#9AA3A7]">
                      Class / Program
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#202A31]">
                      {program.name}
                    </p>
                  </div>
                )}

                {educationLevel && (
                  <div>
                    <p className="text-xs font-semibold text-[#9AA3A7]">
                      Education level
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#202A31]">
                      {educationLevel.name}
                    </p>
                  </div>
                )}
              </div>

              {resources.length > 0 && (
                <div className="mt-5 rounded-2xl bg-[#F5FAF3] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#209E12]">
                    Resources
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#202A31]">
                    {resources.length}{" "}
                    {resources.length === 1
                      ? "resource"
                      : "resources"}{" "}
                    available
                  </p>
                </div>
              )}
            </div>

            {/* Search CTA */}
            <div className="mt-5 rounded-3xl bg-[#24BD11] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                Keep learning
              </p>

              <h3 className="mt-2 text-xl font-bold leading-tight">
                Looking for another note?
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/80">
                Search across Parro Notes and find the material you
                need.
              </p>

              <Link
                href="/search"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#202A31] transition hover:bg-[#FFFDF7]"
              >
                Search notes
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}