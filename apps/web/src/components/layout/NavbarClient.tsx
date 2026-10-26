"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import SearchBox from "../SearchBox";

export default function NavbarClient() {
  const pathname = usePathname();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="Parro Notes home"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-green-50 via-blue-50 to-red-50 ring-1 ring-slate-200">
            <Image
              src="/parro-logo.png"
              alt="Parro Notes"
              width={42}
              height={42}
              className="h-10 w-10 object-contain rounded-lg"
              priority
            />
          </div>

          <div className="hidden leading-none sm:block">
            <div className="text-xl font-extrabold tracking-tight text-slate-900">
              Parro
            </div>
            <div className="mt-1 text-xs font-bold tracking-[0.22em] text-blue-600">
              NOTES
            </div>
          </div>
        </Link>

        {/* Desktop search */}
        <div className="hidden w-full max-w-md md:block">
          <SearchBox />
        </div>

        {/* Mobile search button */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 md:hidden"
          aria-label={mobileSearchOpen ? "Close search" : "Open search"}
        >
          {mobileSearchOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile search */}
      {mobileSearchOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <SearchBox />
        </div>
      )}
    </header>
  );
}