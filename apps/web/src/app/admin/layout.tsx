import { ReactNode, Suspense } from "react";

import AdminLayoutClient from "./AdminLayoutClient";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f8fb]" />
      }
    >
      <AdminLayoutClient>
        {children}
      </AdminLayoutClient>
    </Suspense>
  );
}