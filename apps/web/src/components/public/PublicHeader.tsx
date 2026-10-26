"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e7df] bg-[#faf9f5]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:h-[74px] sm:px-6 lg:px-8">
        {/* Logo */}

        <Link
          href="/"
          aria-label="Parro Notes home"
          className="inline-flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white shadow-[0_4px_12px_rgba(32,37,45,0.10)]">
            <Image
              src="/parro-logo.png"
              alt="Parro Notes"
              width={40}
              height={40}
              priority
              className="h-full w-full object-contain"
            />
          </span>

          <span className="text-[18px] font-black tracking-[-0.035em] text-[#20252d] flex flex-col">
            <span>
            Parro{" "}
            <span className="text-[#fc3024]">
              Notes
            </span>
            </span>
            <span className="text-xs font-light text-gray-500">
              Powered by nbca.co.in
            </span>
          </span>
        </Link>

        {/* Search */}

        <Link
          href="/search"
          aria-label="Search notes"
          className="flex h-11 w-11 items-center justify-center rounded-[15px] border border-[#e8e6df] bg-white text-[#20252d] shadow-[0_4px_12px_rgba(32,37,45,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[#24BD11]/30 hover:text-[#24BD11] active:translate-y-0"
        >
          <Search
            size={20}
            strokeWidth={2.2}
          />
        </Link>
      </div>
    </header>
  );
}