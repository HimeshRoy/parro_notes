"use client";

import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  SearchResponse,
  SearchResult,
} from "@/types/api";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.trim() ?? "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadResults() {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest<
          ApiResponse<SearchResponse>
        >(
          `/search?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          }
        );

        setResults(response.data.results);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        setError("Unable to load search results.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadResults();

    return () => controller.abort();
  }, [query]);

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "note":
        return "Note";

      case "topic":
        return "Topic";

      case "subject":
        return "Subject";

      case "academic-period":
        return "Academic Period";

      case "program":
        return "Program";

      case "education-level":
        return "Education Level";

      default:
        return "Result";
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
            Search
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Search Parro Notes
          </h1>

          {query && (
            <p className="mt-3 text-slate-500">
              Results for{" "}
              <span className="font-semibold text-slate-800">
                "{query}"
              </span>
            </p>
          )}
        </div>

        {!query && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <Search
              size={32}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Start searching
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Search for notes, subjects, topics, programs, or academic periods.
            </p>
          </div>
        )}

        {loading && query && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Searching the Parro Notes library...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          query &&
          results.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <h2 className="text-lg font-bold text-slate-900">
                No results found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                We couldn't find anything matching "{query}".
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          results.length > 0 && (
            <div className="mt-10 grid gap-4">
              {results.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                          {getTypeLabel(result.type)}
                        </span>

                        {result.code && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                            {result.code}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-xl font-bold text-slate-900">
                        {result.title}
                      </h2>

                      {result.description && (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                          {result.description}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
                        {Object.values(result.hierarchy)
                          .filter(Boolean)
                          .map((item, index, array) => (
                            <span key={`${item}-${index}`}>
                              {item}
                              {index < array.length - 1 && (
                                <span className="ml-2 text-slate-300">
                                  /
                                </span>
                              )}
                            </span>
                          ))}
                      </div>
                    </div>

                    <Link
                      href={`/notes/${result.id}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow-md"
                    >
                      View
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  );
}