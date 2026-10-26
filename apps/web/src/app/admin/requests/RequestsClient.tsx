"use client";

import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Mail,
  MessageSquareText,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { adminApiRequest } from "@/lib/admin-api";

type RequestStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

interface HierarchyItem {
  id: string;
  name: string;
  slug: string;
}

interface NoteRequest {
  id: string;
  name: string;
  email: string;
  message: string;

  educationLevelId: string | null;
  programId: string | null;
  subjectId: string | null;
  topicId: string | null;

  status: RequestStatus;

  createdAt: string;
  updatedAt: string;

  educationLevel?: HierarchyItem | null;
  program?: HierarchyItem | null;
  subject?: HierarchyItem | null;
  topic?: HierarchyItem | null;
}

interface RequestsResponse {
  success: boolean;
  data: NoteRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface RequestResponse {
  success: boolean;
  data: NoteRequest;
}

interface ActionResponse {
  success: boolean;
  message?: string;
  data?: NoteRequest;
}

const PAGE_SIZE = 12;

const statusConfig: Record<
  RequestStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },

  IN_PROGRESS: {
    label: "In progress",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
    icon: RefreshCw,
  },

  COMPLETED: {
    label: "Completed",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: Check,
  },

  REJECTED: {
    label: "Rejected",
    className:
      "border-red-200 bg-red-50 text-red-700",
    icon: X,
  },
};

const filterOptions: Array<{
  value: "ALL" | RequestStatus;
  label: string;
}> = [
  {
    value: "ALL",
    label: "All requests",
  },
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "IN_PROGRESS",
    label: "In progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

/* ============================================================
   HELPERS
============================================================ */

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getRequestPath(request: NoteRequest) {
  return [
    request.educationLevel?.name,
    request.program?.name,
    request.subject?.name,
    request.topic?.name,
  ].filter(Boolean) as string[];
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
}: {
  status: RequestStatus;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon
        size={13}
        strokeWidth={2}
      />

      {config.label}
    </span>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: typeof FileText;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border bg-white p-4 text-left transition ${
        active
          ? "border-[#3157d5] ring-2 ring-[#3157d5]/10"
          : "border-[#e8eaf0] hover:border-[#d7dbe5]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#707584]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1d2433]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
          <Icon
            size={19}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </button>
  );
}

/* ============================================================
   REQUEST ROW
============================================================ */

function RequestRow({
  request,
  onView,
  onDelete,
  onStatusChange,
}: {
  request: NoteRequest;
  onView: (request: NoteRequest) => void;
  onDelete: (request: NoteRequest) => void;
  onStatusChange: (
    request: NoteRequest,
    status: RequestStatus,
  ) => void;
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [menuPosition, setMenuPosition] =
    useState({
      top: 0,
      right: 0,
    });

  const path = getRequestPath(request);

  function openMenu(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    const buttonRect =
      event.currentTarget.getBoundingClientRect();

    const menuHeight = 270;

    const shouldOpenAbove =
      window.innerHeight -
        buttonRect.bottom <
      menuHeight;

    const top = shouldOpenAbove
      ? Math.max(
          12,
          buttonRect.top - menuHeight - 8,
        )
      : buttonRect.bottom + 8;

    const right =
      window.innerWidth - buttonRect.right;

    setMenuPosition({
      top,
      right,
    });

    setMenuOpen(true);
  }

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function closeMenu() {
      setMenuOpen(false);
    }

    window.addEventListener(
      "resize",
      closeMenu,
    );

    window.addEventListener(
      "scroll",
      closeMenu,
      true,
    );

    return () => {
      window.removeEventListener(
        "resize",
        closeMenu,
      );

      window.removeEventListener(
        "scroll",
        closeMenu,
        true,
      );
    };
  }, [menuOpen]);

  return (
    <>
      <div className="group grid grid-cols-[minmax(240px,1.4fr)_minmax(180px,1fr)_minmax(180px,1fr)_140px_52px] items-center gap-5 border-b border-[#eef0f4] px-5 py-4 last:border-b-0 hover:bg-[#fafbfc]">
        {/* Requester */}

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] text-sm font-semibold text-[#3157d5]">
              {request.name
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#202633]">
                {request.name}
              </p>

              <p className="mt-0.5 truncate text-xs text-[#7b8190]">
                {request.email}
              </p>
            </div>
          </div>
        </div>

        {/* Requested note */}

        <div className="min-w-0">
          {path.length > 0 ? (
            <>
              <p className="truncate text-sm font-medium text-[#313746]">
                {path[path.length - 1]}
              </p>

              <p className="mt-0.5 truncate text-xs text-[#858b99]">
                {path.slice(0, -1).join(" / ")}
              </p>
            </>
          ) : (
            <span className="text-sm text-[#969ba7]">
              General request
            </span>
          )}
        </div>

        {/* Message */}

        <div className="min-w-0">
          <p className="line-clamp-2 text-sm leading-5 text-[#656b78]">
            {request.message}
          </p>
        </div>

        {/* Status */}

        <div>
          <StatusBadge
            status={request.status}
          />
        </div>

        {/* Action button */}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={openMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777d8a] transition hover:bg-[#eef0f4] hover:text-[#252b38]"
            aria-label="Request actions"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* ======================================================
          FIXED ACTION MENU
          It is outside the table flow so it can never be
          clipped by overflow-hidden/overflow-auto.
      ======================================================= */}

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[80] cursor-default"
            onClick={() =>
              setMenuOpen(false)
            }
            aria-label="Close actions menu"
          />

          <div
            className="fixed z-[90] w-52 overflow-hidden rounded-xl border border-[#e5e7ec] bg-white py-1 shadow-[0_18px_45px_rgba(20,28,40,0.16)]"
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
            }}
          >
            {/* View */}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onView(request);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#303643] transition hover:bg-[#f6f7f9]"
            >
              <Eye size={16} />

              View request
            </button>

            <div className="my-1 border-t border-[#eef0f3]" />

            {/* Status actions */}

            {(
              [
                "PENDING",
                "IN_PROGRESS",
                "COMPLETED",
                "REJECTED",
              ] as RequestStatus[]
            ).map((status) => (
              <button
                key={status}
                type="button"
                disabled={
                  request.status === status
                }
                onClick={() => {
                  setMenuOpen(false);

                  onStatusChange(
                    request,
                    status,
                  );
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs text-[#555c69] transition hover:bg-[#f6f7f9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "PENDING"
                      ? "bg-amber-500"
                      : status ===
                          "IN_PROGRESS"
                        ? "bg-blue-500"
                        : status ===
                            "COMPLETED"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                  }`}
                />

                Mark as{" "}
                {statusConfig[
                  status
                ].label.toLowerCase()}
              </button>
            ))}

            <div className="my-1 border-t border-[#eef0f3]" />

            {/* Delete */}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onDelete(request);
              }}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />

              Delete request
            </button>
          </div>
        </>
      )}
    </>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function RequestsClient() {
  const [requests, setRequests] =
    useState<NoteRequest[]>([]);

  const [selectedRequest, setSelectedRequest] =
    useState<NoteRequest | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<"ALL" | RequestStatus>("ALL");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const [confirmDelete, setConfirmDelete] =
    useState<NoteRequest | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [
    updatingStatusId,
    setUpdatingStatusId,
  ] = useState<string | null>(null);

  const [lastSynced, setLastSynced] =
    useState<Date | null>(null);

  /* ==========================================================
     LOAD REQUESTS
  ========================================================== */

  const loadRequests = useCallback(
    async (silent = false) => {
      try {
        if (!silent) {
          setLoading(true);
        }

        setError(null);

        const query =
          new URLSearchParams({
            page: String(page),
            limit: String(PAGE_SIZE),
          });

        if (statusFilter !== "ALL") {
          query.set(
            "status",
            statusFilter,
          );
        }

        const response =
          await adminApiRequest<RequestsResponse>(
            `/note-requests?${query.toString()}`,
          );

        setRequests(response.data);

        setTotal(
          response.pagination.total,
        );

        setTotalPages(
          response.pagination.totalPages,
        );

        setLastSynced(new Date());
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load requests",
        );
      } finally {
        if (!silent) {
          setLoading(false);
        }
      }
    },
    [page, statusFilter],
  );

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  /* ==========================================================
     AUTO SYNC EVERY 30 SECONDS
  ========================================================== */

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        loadRequests(true);
      }, 30_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadRequests]);

  /* ==========================================================
     SYNC WHEN ADMIN RETURNS TO TAB
  ========================================================== */

  useEffect(() => {
    function handleFocus() {
      loadRequests(true);
    }

    window.addEventListener(
      "focus",
      handleFocus,
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus,
      );
    };
  }, [loadRequests]);

  /* ==========================================================
     STATUS FILTER
  ========================================================== */

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  /* ==========================================================
     OPEN REQUEST
  ========================================================== */

  const openRequest = async (
    request: NoteRequest,
  ) => {
    try {
      setDetailsLoading(true);
      setError(null);

      const response =
        await adminApiRequest<RequestResponse>(
          `/note-requests/${request.id}`,
        );

      setSelectedRequest(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load request",
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  /* ==========================================================
     UPDATE STATUS
  ========================================================== */

  const updateStatus = async (
    request: NoteRequest,
    status: RequestStatus,
  ) => {
    try {
      setUpdatingStatusId(request.id);
      setError(null);

      await adminApiRequest<ActionResponse>(
        `/note-requests/${request.id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status,
          }),
        },
      );

      /*
       * Reload from backend instead of only changing
       * local state. This guarantees the UI represents
       * the actual database state.
       */

      await loadRequests(true);

      /*
       * If the detail modal is open, reload that request too.
       */

      if (
        selectedRequest?.id ===
        request.id
      ) {
        const response =
          await adminApiRequest<RequestResponse>(
            `/note-requests/${request.id}`,
          );

        setSelectedRequest(
          response.data,
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update request status",
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  /* ==========================================================
     DELETE REQUEST
  ========================================================== */

  const deleteRequest = async () => {
    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      await adminApiRequest(
        `/note-requests/${confirmDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (
        selectedRequest?.id ===
        confirmDelete.id
      ) {
        setSelectedRequest(null);
      }

      setConfirmDelete(null);

      /*
       * If the last item on a page was deleted,
       * move back one page before syncing.
       */

      if (
        requests.length === 1 &&
        page > 1
      ) {
        setPage((current) =>
          Math.max(1, current - 1),
        );
      } else {
        await loadRequests(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete request",
      );
    } finally {
      setDeleting(false);
    }
  };

  /* ==========================================================
     SEARCH
  ========================================================== */

  const filteredRequests =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return requests;
      }

      return requests.filter(
        (request) => {
          const hierarchy =
            getRequestPath(request)
              .join(" ")
              .toLowerCase();

          return (
            request.name
              .toLowerCase()
              .includes(query) ||
            request.email
              .toLowerCase()
              .includes(query) ||
            request.message
              .toLowerCase()
              .includes(query) ||
            hierarchy.includes(query)
          );
        },
      );
    }, [requests, search]);

  /* ==========================================================
     STATS
  ========================================================== */

  const stats = useMemo(() => {
    return {
      all: total,

      pending: requests.filter(
        (request) =>
          request.status === "PENDING",
      ).length,

      inProgress: requests.filter(
        (request) =>
          request.status === "IN_PROGRESS",
      ).length,

      completed: requests.filter(
        (request) =>
          request.status === "COMPLETED",
      ).length,

      rejected: requests.filter(
        (request) =>
          request.status === "REJECTED",
      ).length,
    };
  }, [requests, total]);

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <div className="min-h-full bg-[#f7f8fb]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#3157d5]">
              Management
            </p>

            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-[#1d2433] sm:text-3xl">
                Note requests
              </h1>

              {/* Live indicator */}

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                Live
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#737987]">
              Review requests from students
              and manage their progress.
            </p>
          </div>

          {/* Dynamic sync status */}

          <div className="flex items-center gap-2 self-start text-xs text-[#8a909d] lg:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            {loading
              ? "Syncing..."
              : lastSynced
                ? `Synced ${lastSynced.toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    },
                  )}`
                : "Connected"}
          </div>
        </div>

        {/* ====================================================
            STATS
        ===================================================== */}

        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <StatCard
            label="All requests"
            value={stats.all}
            icon={FileText}
            active={
              statusFilter === "ALL"
            }
            onClick={() =>
              setStatusFilter("ALL")
            }
          />

          <StatCard
            label="Pending"
            value={stats.pending}
            icon={Clock3}
            active={
              statusFilter === "PENDING"
            }
            onClick={() =>
              setStatusFilter("PENDING")
            }
          />

          <StatCard
            label="In progress"
            value={stats.inProgress}
            icon={RefreshCw}
            active={
              statusFilter ===
              "IN_PROGRESS"
            }
            onClick={() =>
              setStatusFilter(
                "IN_PROGRESS",
              )
            }
          />

          <StatCard
            label="Completed"
            value={stats.completed}
            icon={Check}
            active={
              statusFilter ===
              "COMPLETED"
            }
            onClick={() =>
              setStatusFilter(
                "COMPLETED",
              )
            }
          />

          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={X}
            active={
              statusFilter ===
              "REJECTED"
            }
            onClick={() =>
              setStatusFilter(
                "REJECTED",
              )
            }
          />
        </div>

        {/* ====================================================
            MAIN PANEL
        ===================================================== */}

        <div className="mt-6 overflow-visible rounded-2xl border border-[#e7e9ee] bg-white shadow-sm">
          {/* ==================================================
              TOOLBAR
          =================================================== */}

          <div className="flex flex-col gap-4 border-b border-[#eceef2] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9096a3]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search by name, email, subject..."
                className="h-10 w-full rounded-xl border border-[#dfe2e8] bg-[#fafbfc] pl-10 pr-4 text-sm text-[#252b38] outline-none transition placeholder:text-[#9a9faa] focus:border-[#3157d5] focus:bg-white focus:ring-3 focus:ring-[#3157d5]/10"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {filterOptions.map(
                (option) => (
                  <button
                    key={
                      option.value
                    }
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        option.value,
                      )
                    }
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition ${
                      statusFilter ===
                      option.value
                        ? "bg-[#3157d5] text-white"
                        : "text-[#666d7b] hover:bg-[#f2f4f7] hover:text-[#303643]"
                    }`}
                  >
                    {option.label}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* ==================================================
              ERROR
          =================================================== */}

          {error && (
            <div className="m-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-medium">
                  Something went wrong
                </p>

                <p className="mt-0.5 text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* ==================================================
              LOADING
          =================================================== */}

          {loading ? (
            <div className="divide-y divide-[#eef0f4]">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="grid animate-pulse grid-cols-[minmax(240px,1.4fr)_minmax(180px,1fr)_minmax(180px,1fr)_140px_52px] gap-5 px-5 py-5"
                >
                  <div className="h-9 rounded-lg bg-[#f0f2f5]" />

                  <div className="h-8 rounded-lg bg-[#f0f2f5]" />

                  <div className="h-8 rounded-lg bg-[#f0f2f5]" />

                  <div className="h-7 rounded-full bg-[#f0f2f5]" />

                  <div className="h-9 w-9 rounded-lg bg-[#f0f2f5]" />
                </div>
              ))}
            </div>
          ) : filteredRequests.length ===
            0 ? (
            /* =================================================
               EMPTY STATE
            ================================================== */

            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#3157d5]">
                <MessageSquareText size={24} />
              </div>

              <h2 className="mt-5 text-base font-semibold text-[#252b38]">
                {search
                  ? "No matching requests"
                  : "No requests found"}
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#7b8190]">
                {search
                  ? "Try a different name, email address, subject or topic."
                  : "Student note requests will appear here when they are submitted."}
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  DESKTOP TABLE HEADER
              ================================================== */}

              <div className="hidden grid-cols-[minmax(240px,1.4fr)_minmax(180px,1fr)_minmax(180px,1fr)_140px_52px] gap-5 border-b border-[#eceef2] bg-[#fafbfc] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a909d] lg:grid">
                <span>Requester</span>

                <span>Requested note</span>

                <span>Message</span>

                <span>Status</span>

                <span />
              </div>

              {/* =================================================
                  DESKTOP ROWS
              ================================================== */}

              <div className="hidden lg:block">
                {filteredRequests.map(
                  (request) => (
                    <RequestRow
                      key={request.id}
                      request={request}
                      onView={openRequest}
                      onDelete={
                        setConfirmDelete
                      }
                      onStatusChange={
                        updateStatus
                      }
                    />
                  ),
                )}
              </div>

              {/* =================================================
                  MOBILE / TABLET
              ================================================== */}

              <div className="divide-y divide-[#eef0f4] lg:hidden">
                {filteredRequests.map(
                  (request) => {
                    const path =
                      getRequestPath(
                        request,
                      );

                    return (
                      <div
                        key={
                          request.id
                        }
                        className="p-4 sm:p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] font-semibold text-[#3157d5]">
                              {request.name
                                .trim()
                                .charAt(
                                  0,
                                )
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#202633]">
                                {
                                  request.name
                                }
                              </p>

                              <p className="mt-0.5 truncate text-xs text-[#7b8190]">
                                {
                                  request.email
                                }
                              </p>
                            </div>
                          </div>

                          <StatusBadge
                            status={
                              request.status
                            }
                          />
                        </div>

                        <div className="mt-4 rounded-xl bg-[#fafbfc] p-3.5">
                          <p className="text-xs font-medium text-[#8a909d]">
                            Requested note
                          </p>

                          <p className="mt-1 text-sm font-medium text-[#303643]">
                            {path[
                              path.length -
                                1
                            ] ??
                              "General request"}
                          </p>

                          {path.length >
                            1 && (
                            <p className="mt-1 text-xs text-[#858b99]">
                              {path
                                .slice(
                                  0,
                                  -1,
                                )
                                .join(
                                  " / ",
                                )}
                            </p>
                          )}
                        </div>

                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#656b78]">
                          {
                            request.message
                          }
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="text-xs text-[#8a909d]">
                            {formatDate(
                              request.createdAt,
                            )}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                openRequest(
                                  request,
                                )
                              }
                              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dfe2e8] bg-white px-3 text-xs font-medium text-[#353b48]"
                            >
                              <Eye
                                size={
                                  14
                                }
                              />

                              View
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setConfirmDelete(
                                  request,
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadede] text-red-600"
                              aria-label="Delete request"
                            >
                              <Trash2
                                size={
                                  15
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </>
          )}

          {/* ==================================================
              PAGINATION
          =================================================== */}

          {!loading &&
            filteredRequests.length >
              0 && (
              <div className="flex flex-col gap-3 border-t border-[#eceef2] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-xs text-[#7d8390]">
                  Showing{" "}
                  <span className="font-medium text-[#444a57]">
                    {Math.min(
                      (page - 1) *
                        PAGE_SIZE +
                        1,
                      total,
                    )}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-[#444a57]">
                    {Math.min(
                      page *
                        PAGE_SIZE,
                      total,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#444a57]">
                    {total}
                  </span>{" "}
                  requests
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={
                      page <= 1
                    }
                    onClick={() =>
                      setPage(
                        (
                          current,
                        ) =>
                          Math.max(
                            1,
                            current -
                              1,
                          ),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe2e8] text-[#5e6572] transition hover:bg-[#f7f8fa] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft
                      size={16}
                    />
                  </button>

                  <span className="min-w-20 text-center text-xs font-medium text-[#555c69]">
                    Page {page} of{" "}
                    {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={
                      page >=
                      totalPages
                    }
                    onClick={() =>
                      setPage(
                        (
                          current,
                        ) =>
                          Math.min(
                            totalPages,
                            current +
                              1,
                          ),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe2e8] text-[#5e6572] transition hover:bg-[#f7f8fa] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight
                      size={16}
                    />
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* ======================================================
          DETAILS MODAL
      ======================================================= */}

      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#eceef2] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#3157d5]">
                  Request details
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[#202633]">
                  {
                    selectedRequest.name
                  }
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRequest(
                    null,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777d89] hover:bg-[#f2f3f6]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-5 py-5 sm:px-6">
              {/* User information */}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#e9ebef] p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#858b98]">
                    <UserRound size={14} />

                    Name
                  </div>

                  <p className="mt-2 text-sm font-medium text-[#303643]">
                    {
                      selectedRequest.name
                    }
                  </p>
                </div>

                <div className="rounded-xl border border-[#e9ebef] p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#858b98]">
                    <Mail size={14} />

                    Email
                  </div>

                  <p className="mt-2 break-all text-sm font-medium text-[#303643]">
                    {
                      selectedRequest.email
                    }
                  </p>
                </div>
              </div>

              {/* Education path */}

              <div className="mt-3 rounded-xl border border-[#e9ebef] p-4">
                <p className="text-xs font-medium text-[#858b98]">
                  Requested education
                  path
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {getRequestPath(
                    selectedRequest,
                  ).map(
                    (
                      item,
                      index,
                    ) => {
                      const path =
                        getRequestPath(
                          selectedRequest,
                        );

                      return (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-center gap-2"
                        >
                          <span className="rounded-lg bg-[#f3f5f8] px-3 py-1.5 text-xs font-medium text-[#454b58]">
                            {item}
                          </span>

                          {index <
                            path.length -
                              1 && (
                            <ChevronRight
                              size={
                                13
                              }
                              className="text-[#a1a6b0]"
                            />
                          )}
                        </div>
                      );
                    },
                  )}

                  {getRequestPath(
                    selectedRequest,
                  ).length ===
                    0 && (
                    <span className="text-sm text-[#8b909b]">
                      No specific
                      education path
                      selected.
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}

              <div className="mt-3 rounded-xl border border-[#e9ebef] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-medium text-[#858b98]">
                    Status
                  </p>

                  <StatusBadge
                    status={
                      selectedRequest.status
                    }
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      "PENDING",
                      "IN_PROGRESS",
                      "COMPLETED",
                      "REJECTED",
                    ] as RequestStatus[]
                  ).map(
                    (status) => {
                      const active =
                        selectedRequest.status ===
                        status;

                      const updating =
                        updatingStatusId ===
                        selectedRequest.id;

                      return (
                        <button
                          key={status}
                          type="button"
                          disabled={
                            active ||
                            updating
                          }
                          onClick={() =>
                            updateStatus(
                              selectedRequest,
                              status,
                            )
                          }
                          className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                            active
                              ? "border-[#3157d5] bg-[#eef2ff] text-[#3157d5]"
                              : "border-[#e1e4e9] text-[#656b78] hover:bg-[#f7f8fa]"
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {updating &&
                          !active ? (
                            <span className="inline-flex items-center gap-1.5">
                              <RefreshCw
                                size={
                                  13
                                }
                                className="animate-spin"
                              />

                              Updating
                            </span>
                          ) : (
                            statusConfig[
                              status
                            ].label
                          )}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Message */}

              <div className="mt-3 rounded-xl border border-[#e9ebef] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#858b98]">
                  <MessageSquareText
                    size={14}
                  />

                  Message
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#454b58]">
                  {
                    selectedRequest.message
                  }
                </p>
              </div>

              {/* Dates */}

              <div className="mt-3 flex flex-col gap-2 text-xs text-[#8a909b] sm:flex-row sm:items-center sm:justify-between">
                <span>
                  Submitted{" "}
                  {formatDateTime(
                    selectedRequest.createdAt,
                  )}
                </span>

                <span>
                  Updated{" "}
                  {formatDateTime(
                    selectedRequest.updatedAt,
                  )}
                </span>
              </div>

              {/* Delete */}

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setConfirmDelete(
                      selectedRequest,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={15} />

                  Delete request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          DELETE CONFIRMATION
      ======================================================= */}

      {confirmDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#202633]">
              Delete this request?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#717785]">
              This will permanently
              remove the note request
              from Parro Notes. This
              action cannot be undone.
            </p>

            <div className="mt-5 rounded-xl bg-[#f7f8fa] p-3.5">
              <p className="text-sm font-medium text-[#353b47]">
                {
                  confirmDelete.name
                }
              </p>

              <p className="mt-1 truncate text-xs text-[#858b98]">
                {
                  confirmDelete.email
                }
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setConfirmDelete(
                    null,
                  )
                }
                className="rounded-lg border border-[#dfe2e8] px-4 py-2.5 text-sm font-medium text-[#555c69] hover:bg-[#f7f8fa] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={deleteRequest}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting && (
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                )}

                Delete request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          DETAILS LOADING
      ======================================================= */}

      {detailsLoading && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/20">
          <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-xl">
            <RefreshCw
              size={17}
              className="animate-spin text-[#3157d5]"
            />

            <span className="text-sm font-medium text-[#444a56]">
              Loading request...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}