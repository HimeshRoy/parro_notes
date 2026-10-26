"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { apiRequest } from "@/lib/api";
import type {
  ApiResponse,
  SearchResponse,
  SearchResult,
} from "@/types/api";

export default function SearchBox() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      setError("");
      return;
    }

    const timeout = setTimeout(async () => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError("");
      setOpen(true);

      try {
        const response = await apiRequest<
          ApiResponse<SearchResponse>
        >(
          `/search?q=${encodeURIComponent(value)}`,
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

        setResults([]);
        setError("Unable to search right now.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const submitSearch = () => {
    const value = query.trim();

    if (!value) return;

    setOpen(false);

    router.push(
      `/search?q=${encodeURIComponent(value)}`
    );
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const getTypeLabel = (result: SearchResult) => {
    switch (result.type) {
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
    <div className="relative w-full max-w-md">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch();
        }}
      >
        <Search
          size={19}
          strokeWidth={2}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            if (query.trim()) {
              setOpen(true);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search notes, subjects, topics..."
          aria-label="Search notes"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-11 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {loading && (
            <div className="flex items-center gap-3 px-4 py-5 text-sm text-slate-500">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Searching Parro Notes...
            </div>
          )}

          {!loading && error && (
            <div className="px-4 py-5 text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            results.length === 0 && (
              <div className="px-4 py-6 text-center">
                <p className="text-sm font-semibold text-slate-800">
                  No results found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try a different subject, topic, or note name.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            results.length > 0 && (
              <div className="max-h-[420px] overflow-y-auto py-2">
                {results.slice(0, 8).map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    type="button"
                    onClick={() => {
                      setOpen(false);

                      router.push(
                        `/search?q=${encodeURIComponent(
                          result.title
                        )}`
                      );
                    }}
                    className="block w-full px-4 py-3 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {result.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {[
                            result.hierarchy.subject,
                            result.hierarchy.topic,
                            result.hierarchy.program,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                        {getTypeLabel(result)}
                      </span>
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={submitSearch}
                  className="mt-1 w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                >
                  View all search results
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
}