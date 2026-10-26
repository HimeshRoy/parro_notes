"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  X,
  MessageSquareText,
} from "lucide-react";

import {
  getCurrentAdmin,
  isAdminAuthenticated,
  logoutAdmin,
} from "@/lib/auth/admin";

interface AdminLayoutProps {
  children: ReactNode;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

const navigation = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "Content",
        href: "/admin/content",
        icon: BookOpen,
      },
      {
        label: "Requests",
        href: "/admin/requests",
        icon: MessageSquareText,
      },
    ],
  },
];

export default function AdminLayoutClient({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);

  const [ready, setReady] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      window.location.replace("/admin-login");
      return;
    }

    const currentAdmin = getCurrentAdmin();

    if (currentAdmin) {
      setAdmin(currentAdmin);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setProfileOpen(false);
        searchRef.current?.blur();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="flex items-center gap-3 text-sm text-[#667085]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#e4e7ec] border-t-[#174ea6]" />
          Loading workspace
        </div>
      </div>
    );
  }

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function handleSearchSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    router.push(
      `/admin/content?search=${encodeURIComponent(query)}`,
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#101828]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[#101828]/30 lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col",
          "border-r border-[#eaecf0] bg-white",
          "transition-[width,transform] duration-200 ease-out",
          collapsed
            ? "w-[78px]"
            : "w-[248px]",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Brand */}
        <div
          className={[
            "flex h-[72px] shrink-0 items-center",
            "border-b border-[#eaecf0]",
            collapsed
              ? "justify-center px-3"
              : "px-5",
          ].join(" ")}
        >
          <Link
            href="/admin"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#174ea6] text-sm font-bold text-white">
              P
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#101828]">
                  Parro Notes
                </div>

                <div className="mt-0.5 text-[11px] text-[#98a2b3]">
                  Admin workspace
                </div>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#344054] lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          {navigation.map((group) => (
            <div
              key={group.label}
              className="mb-7 last:mb-0"
            >
              {!collapsed && (
                <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#98a2b3]">
                  {group.label}
                </div>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={
                        collapsed
                          ? item.label
                          : undefined
                      }
                      className={[
                        "relative flex h-10 items-center gap-3 rounded-[9px] px-3",
                        "text-[13px] font-medium",
                        "transition-colors duration-150",
                        collapsed
                          ? "justify-center"
                          : "",
                        active
                          ? "bg-[#eef4ff] text-[#174ea6]"
                          : "text-[#667085] hover:bg-[#f8fafc] hover:text-[#101828]",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#174ea6]" />
                      )}

                      <Icon
                        className={[
                          "h-[17px] w-[17px] shrink-0",
                          active
                            ? "text-[#174ea6]"
                            : "text-[#98a2b3]",
                        ].join(" ")}
                        strokeWidth={1.8}
                      />

                      {!collapsed && (
                        <>
                          <span className="flex-1">
                            {item.label}
                          </span>

                          {active && (
                            <ChevronRight className="h-3.5 w-3.5 text-[#7b9ed0]" />
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {!collapsed && (
            <div className="mt-8 border-t border-[#f0f2f5] pt-6">
              <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#98a2b3]">
                System
              </div>

              <Link
                href="/admin/account"
                className={[
                  "mt-2 flex h-10 items-center gap-3 rounded-[9px] px-3",
                  "text-[13px] font-medium transition",
                  isActive("/admin/account")
                    ? "bg-[#eef4ff] text-[#174ea6]"
                    : "text-[#667085] hover:bg-[#f8fafc] hover:text-[#101828]",
                ].join(" ")}
              >
                <Settings
                  className="h-[17px] w-[17px] text-[#98a2b3]"
                  strokeWidth={1.8}
                />

                <span>Settings</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Account */}
        <div className="shrink-0 border-t border-[#eaecf0] p-3">
          {admin && !collapsed && (
            <div className="mb-2 rounded-[10px] bg-[#f8fafc] px-3 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0ff] text-[10px] font-bold text-[#174ea6]">
                  {getInitials(admin.name)}
                </div>

                <div className="min-w-0">
                  <div className="truncate text-[12px] font-semibold text-[#344054]">
                    {admin.name}
                  </div>

                  <div className="mt-0.5 truncate text-[10px] text-[#98a2b3]">
                    {admin.email}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={logoutAdmin}
            title={
              collapsed
                ? "Sign out"
                : undefined
            }
            className={[
              "flex h-9 w-full items-center gap-3 rounded-[9px] px-3",
              "text-[12px] font-medium text-[#667085]",
              "transition hover:bg-[#fff5f4] hover:text-[#d92d20]",
              collapsed
                ? "justify-center"
                : "",
            ].join(" ")}
          >
            <LogOut
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            {!collapsed && (
              <span>Sign out</span>
            )}
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className={[
          "min-h-screen transition-[margin] duration-200",
          collapsed
            ? "lg:ml-[78px]"
            : "lg:ml-[248px]",
        ].join(" ")}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-[72px] border-b border-[#eaecf0] bg-white">
          <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e4e7ec] text-[#667085] hover:bg-[#f8fafc] lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Desktop collapse */}
            <button
              type="button"
              onClick={() =>
                setCollapsed(
                  (value) => !value,
                )
              }
              aria-label={
                collapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[#e4e7ec] text-[#667085] hover:bg-[#f8fafc] lg:flex"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative ml-1 w-full max-w-[390px]"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />

              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search Parro Notes..."
                className="h-9 w-full rounded-lg border border-[#e4e7ec] bg-[#f9fafb] pl-9 pr-12 text-[12px] text-[#101828] outline-none transition placeholder:text-[#98a2b3] focus:border-[#b8c9e5] focus:bg-white focus:ring-4 focus:ring-[#174ea6]/5"
              />

              <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-[#e4e7ec] bg-white px-1.5 py-0.5 text-[9px] font-medium text-[#98a2b3] sm:block">
                Ctrl K
              </span>
            </form>

            <div className="ml-auto flex items-center gap-2">
              {/* Website */}
              <Link
                href="/"
                target="_blank"
                className="hidden h-9 items-center gap-2 rounded-lg px-3 text-[12px] font-medium text-[#667085] transition hover:bg-[#f8fafc] hover:text-[#101828] sm:flex"
              >
                View website
                <ExternalLink
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />
              </Link>

              {/* Profile */}
              {admin && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setProfileOpen(
                        (value) => !value,
                      )
                    }
                    className="flex h-9 items-center gap-2 rounded-lg border border-[#e4e7ec] bg-white px-2 transition hover:bg-[#f8fafc]"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f0ff] text-[9px] font-bold text-[#174ea6]">
                      {getInitials(admin.name)}
                    </div>

                    <span className="hidden max-w-[100px] truncate text-[12px] font-semibold text-[#344054] md:block">
                      {admin.name}
                    </span>

                    <ChevronDown className="h-3.5 w-3.5 text-[#98a2b3]" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-[#e4e7ec] bg-white p-1.5 shadow-[0_12px_35px_rgba(16,24,40,0.12)]">
                      <div className="border-b border-[#f0f2f5] px-3 py-2.5">
                        <p className="truncate text-[12px] font-semibold text-[#344054]">
                          {admin.name}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-[#98a2b3]">
                          {admin.email}
                        </p>
                      </div>

                      <Link
                        href="/admin/account"
                        className="mt-1 flex h-9 items-center gap-2 rounded-lg px-3 text-[12px] font-medium text-[#667085] hover:bg-[#f8fafc] hover:text-[#101828]"
                      >
                        <Settings className="h-4 w-4" />
                        Account settings
                      </Link>

                      <button
                        type="button"
                        onClick={logoutAdmin}
                        className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-[12px] font-medium text-[#667085] hover:bg-[#fff5f4] hover:text-[#d92d20]"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="min-h-[calc(100vh-72px)]">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-7 lg:px-9 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "A";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}