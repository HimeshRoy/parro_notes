
"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FileText,
  FolderTree,
  GraduationCap,
  Search,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  SearchResponse,
  SearchResult,
} from "@/types/api";

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build URLs that match the public notes hierarchy:
 * /notes/school
 * /notes/school/class-10
 * /notes/school/class-10/science
 * /notes/school/class-10/science/physics
 * /notes/school/class-10/science/physics/refraction-notes
 *
 * The API currently provides the parent's names and the
 * result's own slug, so parent slugs are derived from names.
 */
function getResultHref(result: SearchResult): string {
  const hierarchy = result.hierarchy;

  let segments: string[];

  switch (result.type) {
    case "education-level":
      segments = [result.slug];
      break;

    case "program":
      segments = [
        hierarchy.educationLevel
          ? slugify(hierarchy.educationLevel)
          : "",
        result.slug,
      ];
      break;

    case "subject":
      segments = [
        hierarchy.educationLevel
          ? slugify(hierarchy.educationLevel)
          : "",
        hierarchy.program ? slugify(hierarchy.program) : "",
        result.slug,
      ];
      break;

    case "topic":
      segments = [
        hierarchy.educationLevel
          ? slugify(hierarchy.educationLevel)
          : "",
        hierarchy.program ? slugify(hierarchy.program) : "",
        hierarchy.subject ? slugify(hierarchy.subject) : "",
        result.slug,
      ];
      break;

    case "note":
      segments = [
        hierarchy.educationLevel
          ? slugify(hierarchy.educationLevel)
          : "",
        hierarchy.program ? slugify(hierarchy.program) : "",
        hierarchy.subject ? slugify(hierarchy.subject) : "",
        hierarchy.topic ? slugify(hierarchy.topic) : "",
        result.slug,
      ];
      break;

    default:
      return "/notes";
  }

  // Avoid creating an incorrect nested URL if the API
  // hasn't supplied the required parent information.
  if (segments.some((segment) => !segment)) {
    return "/notes";
  }

  return `/notes/${segments
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function getTypeLabel(type: SearchResult["type"]): string {
  switch (type) {
    case "note":
      return "Study note";
    case "topic":
      return "Topic";
    case "subject":
      return "Subject";
    case "program":
      return "Class / program";
    case "education-level":
      return "Education level";
    default:
      return "Resource";
  }
}

function getTypeIcon(type: SearchResult["type"]) {
  switch (type) {
    case "note":
      return <FileText size={18} strokeWidth={2} />;
    case "topic":
      return <FolderTree size={18} strokeWidth={2} />;
    case "subject":
      return <BookOpen size={18} strokeWidth={2} />;
    case "program":
    case "education-level":
      return <GraduationCap size={18} strokeWidth={2} />;
    default:
      return <Search size={18} strokeWidth={2} />;
  }
}

export default function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryFromUrl = searchParams.get("q")?.trim() ?? "";

  const [input, setInput] = useState(queryFromUrl);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(Boolean(queryFromUrl));
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (!queryFromUrl) {
      setResults([]);
      setTotal(0);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function loadResults() {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest<
          ApiResponse<SearchResponse>
        >(`/search?q=${encodeURIComponent(queryFromUrl)}`, {
          signal: controller.signal,
        });

        setResults(response.data.results);
        setTotal(response.data.total);
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

        setResults([]);
        setTotal(0);
        setError("We couldn't load your results. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadResults();

    return () => controller.abort();
  }, [queryFromUrl]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = input.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    if (value === queryFromUrl) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  function clearSearch() {
    setInput("");
    router.push("/search");
  }

  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#FFFDF7] text-[#202A31]">
      {/* Search header */}

      <section className="border-b border-[#E9E6DB] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8E7] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#209E12]">
              <Search size={14} strokeWidth={2.5} />
              Study library
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] text-[#202A31] sm:text-5xl">
              Find what you need.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#748079] sm:text-lg">
              One search for your study notes, subjects, topics,
              classes and learning resources.
            </p>

            {/* Search input */}

            <form onSubmit={handleSearch} className="mt-8">
              <div className="flex min-h-[68px] items-center gap-2 rounded-[20px] border border-[#DCE5D8] bg-[#FFFDF7] p-2 shadow-[0_8px_28px_rgba(32,42,49,0.045)] transition-colors focus-within:border-[#24BD11]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#EAF8E7] text-[#24BD11]">
                  <Search size={22} strokeWidth={2.2} />
                </span>

                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Search notes, subjects, topics..."
                  aria-label="Search the Parro Notes library"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="block h-12 min-w-0 flex-1 appearance-none border-0 bg-transparent px-2 text-base font-medium text-[#202A31] shadow-none outline-none ring-0 placeholder:text-[#9AA39F] focus:!border-0 focus:!shadow-none focus:!outline-none focus:!ring-0 focus-visible:!outline-none"
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />

                {input.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    title="Clear search"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#7B8580] transition-colors hover:bg-[#EAF8E7] hover:text-[#202A31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24BD11]"
                  >
                    <X size={19} strokeWidth={2} />
                  </button>
                )}

                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[15px] bg-[#24BD11] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#1FA70F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24BD11] sm:px-5"
                >
                  <span className="hidden sm:inline">Search</span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2.2}
                    className="sm:hidden"
                  />
                  <ChevronRight
                    size={17}
                    strokeWidth={2.5}
                    className="hidden sm:block"
                  />
                </button>
              </div>

              <p className="mt-3 px-1 text-xs text-[#919991]">
                Search by a note title, topic, subject or class name.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Search results */}

      <section className="mx-auto max-w-5xl px-5 py-9 sm:px-6 sm:py-12 lg:px-8">
        {!queryFromUrl && !loading && (
          <div className="rounded-[24px] border border-[#E7E7DC] bg-white px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#EAF8E7] text-[#24BD11]">
              <BookOpen size={26} strokeWidth={1.9} />
            </div>

            <h2 className="mt-5 text-xl font-extrabold tracking-tight">
              What are you studying today?
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#748079]">
              Enter a keyword above. Select any result to open its
              class, subject, topic or study note.
            </p>
          </div>
        )}

        {loading && (
          <div className="space-y-3" aria-label="Loading results">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-[22px] border border-[#E6E9E1] bg-white"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-[20px] border border-[#F0D8D4] bg-[#FFF7F5] p-6"
          >
            <p className="font-bold text-[#B94738]">{error}</p>
            <button
              type="button"
              onClick={() =>
                router.refresh()
              }
              className="mt-3 text-sm font-bold text-[#A43D30] underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && queryFromUrl && results.length === 0 && (
          <div className="rounded-[24px] border border-[#E7E7DC] bg-white px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F3F1EA] text-[#7B8580]">
              <Search size={25} strokeWidth={1.9} />
            </div>

            <h2 className="mt-5 text-xl font-extrabold tracking-tight">
              No matches this time
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#748079]">
              We couldn't find anything for{" "}
              <span className="font-bold text-[#202A31]">
                “{queryFromUrl}”
              </span>
              . Try a shorter or different keyword.
            </p>

            <button
              type="button"
              onClick={clearSearch}
              className="mt-5 rounded-xl bg-[#EAF8E7] px-4 py-2.5 text-sm font-bold text-[#209E12] transition-colors hover:bg-[#DDF3D8]"
            >
              Clear search
            </button>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#7B8580]">
                  Results for{" "}
                  <span className="font-bold text-[#202A31]">
                    “{queryFromUrl}”
                  </span>
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-[-0.035em]">
                  {total} {total === 1 ? "result" : "results"}
                </h2>
              </div>

            </div>

            <div className="grid gap-3">
              {results.map((result) => {
                const href = getResultHref(result);

                return (
                  <Link
                    key={`${result.type}-${result.id}`}
                    href={href}
                    aria-label={`Open ${getTypeLabel(result.type)}: ${result.title}`}
                    className="group block rounded-[22px] border border-[#E5E8DF] bg-white p-5 shadow-[0_3px_14px_rgba(32,42,49,0.025)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B9DDB1] hover:shadow-[0_10px_26px_rgba(32,42,49,0.065)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24BD11] sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#EAF8E7] text-[#24BD11] transition-colors group-hover:bg-[#24BD11] group-hover:text-white">
                        {getTypeIcon(result.type)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#209E12]">
                            {getTypeLabel(result.type)}
                          </span>

                          {result.code && (
                            <>
                              <span className="text-[#D2D8D0]">/</span>
                              <span className="text-xs font-semibold text-[#858E87]">
                                {result.code}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="mt-2 text-lg font-extrabold tracking-[-0.025em] text-[#202A31] transition-colors group-hover:text-[#209E12] sm:text-xl">
                          {result.title}
                        </h3>

                        {result.description && (
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#748079]">
                            {result.description}
                          </p>
                        )}

                        {Object.values(result.hierarchy).some(Boolean) && (
                          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#929A93]">
                            {Object.values(result.hierarchy)
                              .filter(
                                (value): value is string =>
                                  Boolean(value),
                              )
                              .map((item, index, array) => (
                                <span
                                  key={`${item}-${index}`}
                                  className="inline-flex items-center gap-2"
                                >
                                  {item}
                                  {index < array.length - 1 && (
                                    <span className="text-[#C5CDC3]">
                                      /
                                    </span>
                                  )}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>

                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#8A948B] transition-all group-hover:translate-x-0.5 group-hover:bg-[#EAF8E7] group-hover:text-[#209E12]">
                        <ArrowUpRight size={19} strokeWidth={2.1} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
