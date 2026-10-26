import { Suspense } from "react";
import NavbarClient from "./NavbarClient";

function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="h-12 w-32 animate-pulse rounded-xl bg-slate-100" />

        <div className="hidden h-11 w-full max-w-md animate-pulse rounded-xl bg-slate-100 sm:block" />
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarClient />
    </Suspense>
  );
}