import { Suspense } from "react";

import SearchPageContent from "./SearchPageContent";

function SearchLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <section className="border-b border-[#E8E4D9] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="h-5 w-24 animate-pulse rounded-full bg-[#EDE9DF]" />

            <div className="mt-5 h-12 w-80 animate-pulse rounded-xl bg-[#EDE9DF]" />

            <div className="mt-8 h-16 w-full animate-pulse rounded-2xl bg-[#F3F1EA]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="h-28 animate-pulse rounded-3xl bg-white" />
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}