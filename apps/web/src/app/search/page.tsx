"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers3,
  Search,
  X,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type {
  SearchResponse,
  SearchResult,
  SearchResultType,
} from "@/types/api";

function getResultIcon(type: SearchResultType) {
  switch (type) {
    case "note":
      return FileText;

    case "topic":
      return Layers3;

    case "subject":
      return BookOpen;

    case "program":
      return GraduationCap;

    default:
      return Layers3;
  }
}

function getResultLabel(type: SearchResultType) {
  switch (type) {
    case "note":
      return "Note";

    case "topic":
      return "Topic";

    case "subject":
      return "Subject";

    case "program":
      return "Class / Program";

    case "education-level":
      return "Education level";

    default:
      return "Result";
  }
}

function getHierarchy(result: SearchResult) {
  return [
    result.hierarchy.educationLevel,
    result.hierarchy.program,
    result.hierarchy.subject,
    result.hierarchy.topic,
  ].filter(Boolean);
}

export default function SearchPage() {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchedQuery, setSearchedQuery] =
    useState(initialQuery);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialQuery.trim()) {
      setResults([]);
      setSearchedQuery("");
      return;
    }

    setQuery(initialQuery);

    async function runInitialSearch() {
      await performSearch(initialQuery);
    }

    runInitialSearch();
  }, [initialQuery]);

  async function performSearch(value: string) {
    const cleanQuery = value.trim();

    if (!cleanQuery) {
      setResults([]);
      setSearchedQuery("");
      setError("");
      return;
    }

    if (cleanQuery.length < 2) {
      setResults([]);
      setSearchedQuery(cleanQuery);
      setError("Type at least 2 characters to search.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await apiRequest<{
        success: boolean;
        data: SearchResponse;
      }>(
        `/search?q=${encodeURIComponent(cleanQuery)}`,
      );

      setResults(response.data.results ?? []);
      setSearchedQuery(response.data.query);
    } catch (err) {
      setResults([]);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to search Parro Notes.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    window.history.replaceState(
      null,
      "",
      `/search?q=${encodeURIComponent(cleanQuery)}`,
    );

    performSearch(cleanQuery);
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
    setSearchedQuery("");
    setError("");

    window.history.replaceState(null, "", "/search");
  }

  const hasSearch = searchedQuery.trim().length > 0;

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* Search hero */}
      <section className="border-b border-[#E8E4D9] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24BD11]/10 text-[#24BD11]">
              <Search size={26} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#24BD11]">
              Parro Notes search
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#202A31] sm:text-5xl">
              Find what you need.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6B777C]">
              Search across classes, subjects, topics and notes.
              Jump directly to the material you want to study.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 max-w-2xl"
            >
              <div className="relative">
                <Search
                  size={20}
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8D989C]"
                />

                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search notes, subjects, topics..."
                  className="h-16 w-full rounded-2xl border border-[#DCD8CC] bg-[#FFFDF7] pl-13 pr-14 text-base text-[#202A31] shadow-[0_8px_30px_rgba(32,42,49,0.06)] outline-none transition placeholder:text-[#A1AAAE] focus:border-[#24BD11] focus:ring-4 focus:ring-[#24BD11]/10"
                />

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#7C878B] transition hover:bg-[#F0EEE7] hover:text-[#202A31]"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
        {!hasSearch && (
          <div className="rounded-3xl border border-[#E5E1D7] bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F1EA] text-[#7C878B]">
              <Search size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#202A31]">
              Start searching
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737E83]">
              Search for a note, topic, subject or class and
              we&apos;ll take you directly to it.
            </p>
          </div>
        )}

        {hasSearch && (
          <>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#24BD11]">
                  Search results
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#202A31]">
                  Results for &quot;{searchedQuery}&quot;
                </h2>
              </div>

              {!loading && !error && (
                <p className="text-sm text-[#7A858A]">
                  {results.length}{" "}
                  {results.length === 1
                    ? "result"
                    : "results"}
                </p>
              )}
            </div>

            {loading && (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-2xl border border-[#E6E2D8] bg-white"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-[#E8C9C2] bg-[#FFF5F2] px-5 py-4 text-sm font-medium text-[#A34B3C]">
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              results.length === 0 && (
                <div className="rounded-3xl border border-[#E5E1D7] bg-white p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F1EA] text-[#7C878B]">
                    <Search size={24} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-[#202A31]">
                    Nothing found
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737E83]">
                    Try a different keyword, subject, topic or
                    note title.
                  </p>

                  <Link
                    href="/request"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#24BD11] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1FA80F]"
                  >
                    Request a note
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}

            {!loading &&
              !error &&
              results.length > 0 && (
                <div className="space-y-3">
                  {results.map((result) => {
                    const Icon = getResultIcon(
                      result.type,
                    );

                    const hierarchy =
                      getHierarchy(result);

                    return (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.href}
                        className="group flex gap-4 rounded-2xl border border-[#E5E1D7] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#24BD11]/40 hover:shadow-[0_10px_30px_rgba(36,189,17,0.07)] sm:p-5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#24BD11]/10 text-[#24BD11]">
                          <Icon size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#24BD11]">
                              {getResultLabel(
                                result.type,
                              )}
                            </span>

                            {result.code && (
                              <span className="rounded-md bg-[#F3F1EA] px-2 py-0.5 text-[11px] font-semibold text-[#727D82]">
                                {result.code}
                              </span>
                            )}
                          </div>

                          <h3 className="mt-1 truncate text-base font-bold text-[#202A31] transition group-hover:text-[#24BD11]">
                            {result.title}
                          </h3>

                          {result.description && (
                            <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#737E83]">
                              {result.description}
                            </p>
                          )}

                          {hierarchy.length > 0 && (
                            <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-[#929B9F]">
                              {hierarchy.map(
                                (item, index) => (
                                  <span
                                    key={`${item}-${index}`}
                                    className="flex items-center gap-1.5"
                                  >
                                    {index > 0 && (
                                      <ChevronRight
                                        size={12}
                                      />
                                    )}
                                    {item}
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center">
                          <ArrowRight
                            size={18}
                            className="text-[#A4ADB0] transition group-hover:translate-x-1 group-hover:text-[#24BD11]"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
          </>
        )}
      </section>
    </main>
  );
}