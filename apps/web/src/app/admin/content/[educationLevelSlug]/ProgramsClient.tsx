"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  FolderTree,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { apiRequest, getAdminToken } from "@/lib/api";
import type {
  EducationLevel,
  Program,
} from "@/types/api";

interface ProgramsResponse {
  success: boolean;
  data: Program[];
}

interface EducationLevelsResponse {
  success: boolean;
  data: EducationLevel[];
}

interface ProgramResponse {
  success: boolean;
  message?: string;
  data: Program;
}

interface ProgramsClientProps {
  educationLevelSlug: string;
}

type ProgramFormMode = "create" | "edit";

export default function ProgramsClient({
  educationLevelSlug,
}: ProgramsClientProps) {
  const [educationLevel, setEducationLevel] =
    useState<EducationLevel | null>(null);

  const [programs, setPrograms] = useState<Program[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] =
    useState<ProgramFormMode>("create");

  const [selectedProgram, setSelectedProgram] =
    useState<Program | null>(null);

  const [deleteProgram, setDeleteProgram] =
    useState<Program | null>(null);

  useEffect(() => {
    loadContent();
  }, [educationLevelSlug]);

  async function loadContent() {
    try {
      setLoading(true);
      setError("");

      const token = getAdminToken();

      if (!token) {
        return;
      }

      const [
        educationLevelsResponse,
        programsResponse,
      ] = await Promise.all([
        apiRequest<EducationLevelsResponse>(
          "/education-levels",
          {
            token,
          },
        ),

        apiRequest<ProgramsResponse>(
          "/programs",
          {
            token,
          },
        ),
      ]);

      const currentLevel =
        educationLevelsResponse.data.find(
          (level) =>
            level.slug.toLowerCase() ===
            educationLevelSlug.toLowerCase(),
        );

      if (!currentLevel) {
        throw new Error(
          "Education level could not be found.",
        );
      }

      setEducationLevel(currentLevel);

      const levelPrograms =
        programsResponse.data.filter(
          (program) =>
            program.educationLevelId ===
            currentLevel.id,
        );

      setPrograms(levelPrograms);
    } catch (err) {
      console.error(
        "Failed to load programs:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load programs.",
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredPrograms = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return programs;
    }

    return programs.filter((program) => {
      return (
        program.name
          .toLowerCase()
          .includes(query) ||
        program.slug
          .toLowerCase()
          .includes(query) ||
        program.description
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [programs, search]);

  function openCreateModal() {
    setFormMode("create");
    setSelectedProgram(null);
    setFormOpen(true);
  }

  function openEditModal(program: Program) {
    setFormMode("edit");
    setSelectedProgram(program);
    setFormOpen(true);
  }

  function closeFormModal() {
    setFormOpen(false);
    setSelectedProgram(null);
  }

  function handleProgramSaved(
    program: Program,
  ) {
    setPrograms((current) => {
      const existingIndex =
        current.findIndex(
          (item) => item.id === program.id,
        );

      if (existingIndex === -1) {
        return [...current, program];
      }

      return current.map((item) =>
        item.id === program.id
          ? program
          : item,
      );
    });

    closeFormModal();
  }

  function handleProgramDeleted(
    programId: string,
  ) {
    setPrograms((current) =>
      current.filter(
        (program) => program.id !== programId,
      ),
    );

    setDeleteProgram(null);
  }

  return (
    <>
      <div className="space-y-8">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <section>
          <div className="mb-6">
            <Link
              href="/admin/content"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 transition hover:text-slate-950"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white transition group-hover:border-slate-300 group-hover:bg-slate-50">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>

              <span>Education levels</span>
            </Link>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[12px] font-medium text-slate-400">
                <span>Content</span>
                <span>/</span>
                <span className="text-slate-600">
                  {educationLevel?.name ??
                    "Education level"}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#174ea6]">
                  <FolderTree className="h-5 w-5" />
                </div>

                <div>
                  <h1 className="text-[30px] font-semibold tracking-[-0.035em] text-slate-950">
                    {educationLevel?.name ??
                      "Education level"}
                  </h1>

                  <p className="mt-1 text-[13px] text-slate-500">
                    Programs and classes inside this
                    education level.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              disabled={!educationLevel}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#174ea6] px-5 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(23,78,166,0.16)] transition hover:bg-[#123d82] hover:shadow-[0_10px_28px_rgba(23,78,166,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Add program
            </button>
          </div>
        </section>

        {/* =====================================================
            SEARCH
        ===================================================== */}
        {!loading && !error && (
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative min-w-0 flex-1 sm:max-w-[480px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search programs or classes..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/5"
              />
            </div>

            <div className="flex items-center gap-3 px-1">
              <div className="text-right">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
                  Programs
                </p>

                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  {filteredPrograms.length}
                </p>
              </div>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[12px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}
        {error && !loading && (
          <section className="rounded-2xl border border-red-200 bg-red-50/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-red-900">
                  Unable to load programs
                </h2>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={loadContent}
                className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-red-200 transition hover:bg-red-50"
              >
                Try again
              </button>
            </div>
          </section>
        )}

        {/* =====================================================
            CONTENT
        ===================================================== */}
        {loading ? (
          <LoadingState />
        ) : !error ? (
          <section>
            {filteredPrograms.length === 0 ? (
              <EmptyState
                hasSearch={Boolean(
                  search.trim(),
                )}
                onAdd={openCreateModal}
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredPrograms.map(
                  (program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      educationLevelSlug={
                        educationLevelSlug
                      }
                      onEdit={() =>
                        openEditModal(
                          program,
                        )
                      }
                      onDelete={() =>
                        setDeleteProgram(
                          program,
                        )
                      }
                    />
                  ),
                )}
              </div>
            )}
          </section>
        ) : null}
      </div>

      {/* =======================================================
          CREATE / EDIT MODAL
      ======================================================= */}
      {formOpen && educationLevel && (
        <ProgramFormModal
          mode={formMode}
          educationLevel={educationLevel}
          program={selectedProgram}
          onClose={closeFormModal}
          onSaved={handleProgramSaved}
        />
      )}

      {/* =======================================================
          DELETE MODAL
      ======================================================= */}
      {deleteProgram && (
        <DeleteProgramModal
          program={deleteProgram}
          onClose={() =>
            setDeleteProgram(null)
          }
          onDeleted={handleProgramDeleted}
        />
      )}
    </>
  );
}

/* =============================================================
   PROGRAM CARD
============================================================= */

function ProgramCard({
  program,
  educationLevelSlug,
  onEdit,
  onDelete,
}: {
  program: Program;
  educationLevelSlug: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:border-slate-300 hover:shadow-[0_12px_35px_rgba(16,24,40,0.07)]">
      {/* Card content */}
      <Link
        href={`/admin/content/${educationLevelSlug}/${program.slug}`}
        className="group block"
      >
        <div className="h-1 bg-[#174ea6]" />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#174ea6] transition group-hover:bg-[#174ea6] group-hover:text-white">
              <FolderTree className="h-[19px] w-[19px]" />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition group-hover:bg-blue-50 group-hover:text-[#174ea6]">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className="mt-7">
            <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-slate-950">
              {program.name}
            </h2>

            <div className="mt-2 inline-flex rounded-md bg-slate-50 px-2 py-1">
              <span className="text-[11px] font-medium text-slate-500">
                /{program.slug}
              </span>
            </div>

            <p
              className={[
                "mt-4 text-[13px] leading-5",
                program.description
                  ? "line-clamp-2 text-slate-500"
                  : "text-slate-400",
              ].join(" ")}
            >
              {program.description ??
                "Open this program to manage its subjects and learning content."}
            </p>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3">
        <Link
          href={`/admin/content/${educationLevelSlug}/${program.slug}`}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-semibold text-[#174ea6] transition hover:bg-blue-50"
        >
          Open program
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium text-slate-500 transition hover:bg-white hover:text-[#174ea6]"
            aria-label={`Edit ${program.name}`}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Delete ${program.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   CREATE / EDIT MODAL
============================================================= */

function ProgramFormModal({
  mode,
  educationLevel,
  program,
  onClose,
  onSaved,
}: {
  mode: ProgramFormMode;
  educationLevel: EducationLevel;
  program: Program | null;
  onClose: () => void;
  onSaved: (program: Program) => void;
}) {
  const isEdit = mode === "edit";

  const [name, setName] = useState(
    program?.name ?? "",
  );

  const [slug, setSlug] = useState(
    program?.slug ?? "",
  );

  const [description, setDescription] =
    useState(
      program?.description ?? "",
    );

  const [slugEdited, setSlugEdited] =
    useState(isEdit);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slugEdited) {
      setSlug(generateSlug(name));
    }
  }, [name, slugEdited]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanSlug = slug.trim();

    if (!cleanName) {
      setError("Program name is required.");
      return;
    }

    if (!cleanSlug) {
      setError("Program slug is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token = getAdminToken();

      if (!token) {
        throw new Error(
          "Your admin session has expired. Please sign in again.",
        );
      }

      const body = {
        name: cleanName,
        slug: cleanSlug,
        description:
          description.trim() || null,
        educationLevelId:
          educationLevel.id,
      };

      const response =
        await apiRequest<ProgramResponse>(
          isEdit
            ? `/programs/${program?.id}`
            : "/programs",
          {
            method: isEdit
              ? "PUT"
              : "POST",
            token,
            body: JSON.stringify(body),
          },
        );

      onSaved(response.data);
    } catch (err) {
      console.error(
        "Failed to save program:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save program.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!saving) {
            onClose();
          }
        }
      }}
    >
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#174ea6]">
              {isEdit ? (
                <Pencil className="h-[18px] w-[18px]" />
              ) : (
                <FolderTree className="h-[18px] w-[18px]" />
              )}
            </div>

            <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-slate-950">
              {isEdit
                ? "Edit program"
                : "Add program"}
            </h2>

            <p className="mt-1 text-[13px] leading-5 text-slate-500">
              {isEdit
                ? "Update this program's information."
                : "Create a program inside "}
              {!isEdit && (
                <span className="font-medium text-slate-700">
                  {educationLevel.name}
                </span>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-[13px] font-medium leading-5 text-red-700">
                  {error}
                </p>
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="program-name"
                className="mb-2 block text-[12px] font-semibold text-slate-700"
              >
                Program name
              </label>

              <input
                id="program-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value,
                  )
                }
                placeholder="e.g. Class 10"
                autoFocus
                disabled={saving}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 disabled:bg-slate-50"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="program-slug"
                  className="text-[12px] font-semibold text-slate-700"
                >
                  URL slug
                </label>

                <span className="text-[10px] text-slate-400">
                  Public URL identifier
                </span>
              </div>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/5">
                <span className="flex items-center border-r border-slate-200 px-3 text-[12px] text-slate-400">
                  /
                </span>

                <input
                  id="program-slug"
                  type="text"
                  value={slug}
                  onChange={(event) => {
                    setSlugEdited(true);

                    setSlug(
                      generateSlug(
                        event.target
                          .value,
                      ),
                    );
                  }}
                  placeholder="class-10"
                  disabled={saving}
                  className="h-11 min-w-0 flex-1 bg-transparent px-3 text-[13px] text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="program-description"
                className="mb-2 block text-[12px] font-semibold text-slate-700"
              >
                Description
                <span className="ml-1 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <textarea
                id="program-description"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value,
                  )
                }
                placeholder="Briefly describe this program..."
                rows={3}
                disabled={saving}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[13px] leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 disabled:bg-slate-50"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-10 rounded-xl px-4 text-[13px] font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#174ea6] px-5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#123d82] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isEdit
                    ? "Saving..."
                    : "Creating..."}
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  {isEdit
                    ? "Save changes"
                    : "Create program"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =============================================================
   DELETE MODAL
============================================================= */

function DeleteProgramModal({
  program,
  onClose,
  onDeleted,
}: {
  program: Program;
  onClose: () => void;
  onDeleted: (programId: string) => void;
}) {
  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleDelete() {
    try {
      setDeleting(true);
      setError("");

      const token = getAdminToken();

      if (!token) {
        throw new Error(
          "Your admin session has expired. Please sign in again.",
        );
      }

      await apiRequest<{
        success: boolean;
        message?: string;
      }>(`/programs/${program.id}`, {
        method: "DELETE",
        token,
      });

      onDeleted(program.id);
    } catch (err) {
      console.error(
        "Failed to delete program:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete program.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!deleting) {
            onClose();
          }
        }
      }}
    >
      <div className="w-full max-w-[440px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        <div className="p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">
            Delete program?
          </h2>

          <p className="mt-2 text-[13px] leading-6 text-slate-500">
            You are about to delete{" "}
            <span className="font-semibold text-slate-800">
              {program.name}
            </span>
            .
          </p>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[12px] leading-5 text-amber-800">
              This may also remove the subjects,
              topics and notes belonging to this
              program because the content hierarchy
              uses cascading deletion.
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-[12px] font-medium text-red-700">
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="h-10 rounded-xl px-4 text-[13px] font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-[13px] font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete program
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   LOADING
============================================================= */

function LoadingState() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="h-1 animate-pulse bg-slate-100" />

          <div className="p-6">
            <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />

            <div className="mt-7 h-5 w-32 animate-pulse rounded bg-slate-100" />

            <div className="mt-3 h-5 w-20 animate-pulse rounded bg-slate-100" />

            <div className="mt-5 h-10 w-full animate-pulse rounded bg-slate-100" />
          </div>

          <div className="h-14 animate-pulse border-t border-slate-100 bg-slate-50" />
        </div>
      ))}
    </div>
  );
}

/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState({
  hasSearch,
  onAdd,
}: {
  hasSearch: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#174ea6]">
        <FolderTree className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">
        {hasSearch
          ? "No programs found"
          : "This level is empty"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-slate-500">
        {hasSearch
          ? "Try another search term or clear the current search."
          : "Create the first program or class for this education level to continue building your library."}
      </p>

      {!hasSearch && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#174ea6] px-4 text-[13px] font-semibold text-white transition hover:bg-[#123d82]"
        >
          <Plus className="h-4 w-4" />
          Add first program
        </button>
      )}
    </div>
  );
}

/* =============================================================
   SLUG
============================================================= */

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}