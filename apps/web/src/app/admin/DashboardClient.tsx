"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  FolderTree,
  GraduationCap,
  MessageSquareText,
} from "lucide-react";

import { apiRequest, getAdminToken } from "@/lib/api";

interface CountResponse {
  success: boolean;
  data: {
    educationLevels: number;
    programs: number;
    subjects: number;
    topics: number;
    notes: number;
    resources: number;
    requests: number;
  };
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ElementType;
}

export default function DashboardClient() {
  const [counts, setCounts] = useState<CountResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = getAdminToken();

        if (!token) {
          return;
        }

        /*
         * This endpoint will be added in the backend dashboard phase.
         * Keeping the request here lets the dashboard become live
         * without changing the UI later.
         */
        const response = await apiRequest<CountResponse>(
          "/admin/dashboard",
          {
            token,
          },
        );

        setCounts(response.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats: StatItem[] = [
    {
      label: "Education levels",
      value: counts?.educationLevels ?? 0,
      icon: GraduationCap,
    },
    {
      label: "Programs",
      value: counts?.programs ?? 0,
      icon: FolderTree,
    },
    {
      label: "Subjects",
      value: counts?.subjects ?? 0,
      icon: BookOpen,
    },
    {
      label: "Topics",
      value: counts?.topics ?? 0,
      icon: FolderTree,
    },
    {
      label: "Notes",
      value: counts?.notes ?? 0,
      icon: FileText,
    },
    {
      label: "Resources",
      value: counts?.resources ?? 0,
      icon: FileText,
    },
    {
      label: "Requests",
      value: counts?.requests ?? 0,
      icon: MessageSquareText,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Administration
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the Parro Notes learning library from one place.
            </p>
          </div>

          <Link
            href="/admin/content"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Manage content
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.slice(0, 4).map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main workspace */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-950">
              Content library
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Navigate through your education structure and manage
              content in context.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <DashboardLink
              href="/admin/content"
              icon={GraduationCap}
              title="Education levels"
              description="Start from school, college or another education level."
            />

            <DashboardLink
              href="/admin/content"
              icon={FolderTree}
              title="Programs & classes"
              description="Manage classes and programs inside each education level."
            />

            <DashboardLink
              href="/admin/content"
              icon={BookOpen}
              title="Subjects & topics"
              description="Organize subjects and their topics without jumping between pages."
            />

            <DashboardLink
              href="/admin/content"
              icon={FileText}
              title="Notes & resources"
              description="Create notes and attach PDFs, documents, videos and links."
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-950">
              Requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep track of notes requested by students.
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total requests
                </p>

                <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                  {loading ? "—" : counts?.requests ?? 0}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                <MessageSquareText className="h-5 w-5" />
              </div>
            </div>

            <Link
              href="/admin/requests"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View requests
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lower stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.slice(4).map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                  <Icon className="h-4 w-4" />
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {stat.label}
                </span>
              </div>

              <span className="text-lg font-semibold text-slate-950">
                {loading ? "—" : stat.value}
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function DashboardLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-blue-600" />
    </Link>
  );
}