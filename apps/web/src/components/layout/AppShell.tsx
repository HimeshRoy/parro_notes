"use client";

import { usePathname } from "next/navigation";

import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/admin-login";

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <PublicHeader />

      <main>{children}</main>

      <PublicFooter />
    </>
  );
}