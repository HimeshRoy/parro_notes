"use client";

import {
  BookOpen,
  ChevronRight,
  Edit3,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { apiRequest } from "@/lib/api";
import { adminApiRequest } from "@/lib/admin-api";

import type {
  ApiResponse,
  EducationLevel,
  Program,
  Subject,
} from "@/types/api";

interface SubjectsClientProps {
  educationLevelSlug: string;
  programSlug: string;
}

interface SubjectsData {
  educationLevel: EducationLevel;
  program: Program;
  subjects: Subject[];
}

interface SubjectForm {
  name: string;
  slug: string;
  code: string;
  description: string;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const emptyForm: SubjectForm = {
  name: "",
  slug: "",
  code: "",
  description: "",
};

export default function SubjectsClient({
  educationLevelSlug,
  programSlug,
}: SubjectsClientProps) {
  const [data, setData] = useState<SubjectsData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);

  const [form, setForm] = useState<SubjectForm>(emptyForm);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [formError, setFormError] = useState("");

  const [deleteError, setDeleteError] = useState("");

  /*
   * Load education level, program and subjects
   */
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const educationResponse =
          await apiRequest<ApiResponse<EducationLevel[]>>("/education-levels");

        const educationLevel = educationResponse.data.find(
          (item) => item.slug === educationLevelSlug,
        );

        if (!educationLevel) {
          throw new Error("Education level not found.");
        }

        const programsResponse = await apiRequest<ApiResponse<Program[]>>(
          `/programs?educationLevelId=${educationLevel.id}`,
        );

        const program = programsResponse.data.find(
          (item) => item.slug === programSlug,
        );

        if (!program) {
          throw new Error("Program or class not found.");
        }

        const subjectsResponse = await apiRequest<ApiResponse<Subject[]>>(
          `/subjects?programId=${program.id}`,
        );

        setData({
          educationLevel,
          program,
          subjects: subjectsResponse.data,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load subjects.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [educationLevelSlug, programSlug]);

  /*
   * Filter subjects
   */
  const filteredSubjects = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    if (!query) {
      return data.subjects;
    }

    return data.subjects.filter((subject) => {
      return (
        subject.name.toLowerCase().includes(query) ||
        subject.slug.toLowerCase().includes(query) ||
        subject.code?.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  /*
   * Open create modal
   */
  function openCreateModal() {
    setEditingSubject(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  }

  /*
   * Open edit modal
   */
  function openEditModal(subject: Subject) {
    setEditingSubject(subject);

    setForm({
      name: subject.name,
      slug: subject.slug,
      code: subject.code ?? "",
      description: subject.description ?? "",
    });

    setFormError("");
    setModalOpen(true);
  }

  /*
   * Close form modal
   */
  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingSubject(null);
    setForm(emptyForm);
    setFormError("");
  }

  /*
   * Form change
   */
  function updateForm(field: keyof SubjectForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (field === "name" && !editingSubject) {
      setForm((current) => ({
        ...current,
        name: value,
        slug: generateSlug(value),
      }));
    }
  }

  /*
   * Create / update subject
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!data) {
      return;
    }

    const name = form.name.trim();
    const slug = form.slug.trim();
    const code = form.code.trim();
    const description = form.description.trim();

    if (!name) {
      setFormError("Subject name is required.");
      return;
    }

    if (!slug) {
      setFormError("Subject slug is required.");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      if (editingSubject) {
        const response = await adminApiRequest<ApiResponse<Subject>>(
          `/subjects/${editingSubject.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name,
              slug,
              code: code || null,
              description: description || null,
              programId: data.program.id,
            }),
          },
        );

        setData((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            subjects: current.subjects.map((subject) =>
              subject.id === editingSubject.id ? response.data : subject,
            ),
          };
        });
      } else {
        const response = await adminApiRequest<ApiResponse<Subject>>(
          "/subjects",
          {
            method: "POST",
            body: JSON.stringify({
              name,
              slug,
              code: code || null,
              description: description || null,
              programId: data.program.id,
            }),
          },
        );

        setData((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            subjects: [...current.subjects, response.data],
          };
        });
      }

      closeModal();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to save subject.",
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * Open delete confirmation
   */
  function openDeleteModal(subject: Subject) {
    setDeletingSubject(subject);
    setDeleteError("");
    setDeleteOpen(true);
  }

  /*
   * Delete subject
   */
  async function handleDelete() {
    if (!deletingSubject) {
      return;
    }

    try {
      setDeleting(true);
      setDeleteError("");

      await adminApiRequest(`/subjects/${deletingSubject.id}`, {
        method: "DELETE",
      });

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          subjects: current.subjects.filter(
            (subject) => subject.id !== deletingSubject.id,
          ),
        };
      });

      setDeleteOpen(false);
      setDeletingSubject(null);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete subject.",
      );
    } finally {
      setDeleting(false);
    }
  }

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-3 h-9 w-72 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">
              Unable to load subjects
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error || "Something went wrong."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/admin/content"
              className="text-slate-500 transition-colors hover:text-slate-900"
            >
              Content
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-400" />

            <span className="text-slate-500">{data.educationLevel.name}</span>

            <ChevronRight className="h-4 w-4 text-slate-400" />

            <span className="font-medium text-slate-900">
              {data.program.name}
            </span>
          </div>

          {/* Header */}
          <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#3157d5]">
                    {data.educationLevel.name}
                  </p>

                  <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {data.program.name}
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Manage the subjects available inside this program or class.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#294bb9] active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" />
              Add subject
            </button>
          </div>

          {/* Toolbar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search subjects..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
              />
            </div>

            <p className="text-sm text-slate-500">
              {filteredSubjects.length} of {data.subjects.length} subject
              {data.subjects.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Subject list */}
          {filteredSubjects.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <BookOpen className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-900">
                {search ? "No subjects found" : "No subjects yet"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? "Try a different search term."
                  : "Create the first subject for this program."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  Add subject
                </button>
              )}
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
                >
                  {/* Subject icon */}
                  <Link
                    href={`/admin/content/${educationLevelSlug}/${programSlug}/${subject.slug}`}
                    className="block"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f3ff] text-[#3157d5]">
                        <BookOpen className="h-5 w-5" />
                      </div>

                      {subject.code && (
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {subject.code}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-5 pr-12 text-base font-semibold text-slate-950 transition group-hover:text-[#3157d5]">
                      {subject.name}
                    </h2>

                    <p className="mt-2 text-xs text-slate-400">
                      /{subject.slug}
                    </p>

                    {subject.description ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                        {subject.description}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-slate-400">
                        No description added.
                      </p>
                    )}
                  </Link>

                  {/* Actions */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <Link
                      href={`/admin/content/${educationLevelSlug}/${programSlug}/${subject.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#3157d5]"
                    >
                      Open subject
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(subject)}
                        aria-label={`Edit ${subject.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(subject)}
                        aria-label={`Delete ${subject.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {editingSubject ? "Edit subject" : "Add subject"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingSubject
                    ? "Update this subject's information."
                    : `Add a subject to ${data.program.name}.`}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              <div>
                <label
                  htmlFor="subject-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject name
                </label>

                <input
                  id="subject-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="e.g. Physics"
                  autoFocus
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="subject-slug"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Slug
                </label>

                <input
                  id="subject-slug"
                  type="text"
                  value={form.slug}
                  onChange={(event) => updateForm("slug", event.target.value)}
                  placeholder="physics"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Used in the public URL.
                </p>
              </div>

              <div>
                <label
                  htmlFor="subject-code"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Code
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="subject-code"
                  type="text"
                  value={form.code}
                  onChange={(event) => updateForm("code", event.target.value)}
                  placeholder="e.g. PHY101"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="subject-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="subject-description"
                  value={form.description}
                  onChange={(event) =>
                    updateForm("description", event.target.value)
                  }
                  placeholder="Brief description of the subject..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-10 min-w-28 items-center justify-center rounded-lg bg-[#3157d5] px-4 text-sm font-semibold text-white transition hover:bg-[#294bb9] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingSubject
                      ? "Save changes"
                      : "Create subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteOpen && deletingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-950">
              Delete subject?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to delete{" "}
              <span className="font-semibold text-slate-800">
                {deletingSubject.name}
              </span>
              . This action cannot be undone.
            </p>

            {deleteError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {deleteError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!deleting) {
                    setDeleteOpen(false);
                    setDeletingSubject(null);
                  }
                }}
                disabled={deleting}
                className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete subject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
