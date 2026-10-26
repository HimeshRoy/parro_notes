"use client";

import {
  ChevronRight,
  Edit3,
  FileText,
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
  Note,
  Program,
  Subject,
  Topic,
} from "@/types/api";

interface NotesClientProps {
  educationLevelSlug: string;
  programSlug: string;
  subjectSlug: string;
  topicSlug: string;
}

interface NotesData {
  educationLevel: EducationLevel;
  program: Program;
  subject: Subject;
  topic: Topic;
  notes: Note[];
}

interface NoteForm {
  title: string;
  slug: string;
  description: string;
}

const emptyForm: NoteForm = {
  title: "",
  slug: "",
  description: "",
};

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NotesClient({
  educationLevelSlug,
  programSlug,
  subjectSlug,
  topicSlug,
}: NotesClientProps) {
  const [data, setData] = useState<NotesData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  const [form, setForm] = useState<NoteForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formError, setFormError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  /*
   * Load hierarchy + notes
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

        const subject = subjectsResponse.data.find(
          (item) => item.slug === subjectSlug,
        );

        if (!subject) {
          throw new Error("Subject not found.");
        }

        const topicsResponse = await apiRequest<ApiResponse<Topic[]>>(
          `/topics?subjectId=${subject.id}`,
        );

        const topic = topicsResponse.data.find(
          (item) => item.slug === topicSlug,
        );

        if (!topic) {
          throw new Error("Topic not found.");
        }

        const notesResponse = await apiRequest<ApiResponse<Note[]>>(
          `/notes?topicId=${topic.id}`,
        );

        setData({
          educationLevel,
          program,
          subject,
          topic,
          notes: notesResponse.data,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [educationLevelSlug, programSlug, subjectSlug, topicSlug]);

  /*
   * Search
   */
  const filteredNotes = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    if (!query) {
      return data.notes;
    }

    return data.notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(query) ||
        note.slug.toLowerCase().includes(query) ||
        note.description?.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  /*
   * Create modal
   */
  function openCreateModal() {
    setEditingNote(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  }

  /*
   * Edit modal
   */
  function openEditModal(note: Note) {
    setEditingNote(note);

    setForm({
      title: note.title,
      slug: note.slug,
      description: note.description ?? "",
    });

    setFormError("");
    setModalOpen(true);
  }

  /*
   * Close modal
   */
  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingNote(null);
    setForm(emptyForm);
    setFormError("");
  }

  /*
   * Form updates
   */
  function updateForm(field: keyof NoteForm, value: string) {
    if (field === "title" && !editingNote) {
      setForm((current) => ({
        ...current,
        title: value,
        slug: generateSlug(value),
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /*
   * Create / Update note
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!data) {
      return;
    }

    const title = form.title.trim();
    const slug = form.slug.trim();
    const description = form.description.trim();

    if (!title) {
      setFormError("Note title is required.");
      return;
    }

    if (!slug) {
      setFormError("Note slug is required.");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      if (editingNote) {
        const response = await adminApiRequest<ApiResponse<Note>>(
          `/notes/${editingNote.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title,
              slug,
              description: description || null,
              topicId: data.topic.id,
            }),
          },
        );

        setData((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            notes: current.notes.map((note) =>
              note.id === editingNote.id ? response.data : note,
            ),
          };
        });
      } else {
        const response = await adminApiRequest<ApiResponse<Note>>("/notes", {
          method: "POST",
          body: JSON.stringify({
            title,
            slug,
            description: description || null,
            topicId: data.topic.id,
          }),
        });

        setData((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            notes: [...current.notes, response.data],
          };
        });
      }

      closeModal();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save note.");
    } finally {
      setSaving(false);
    }
  }

  /*
   * Delete modal
   */
  function openDeleteModal(note: Note) {
    setDeletingNote(note);
    setDeleteError("");
    setDeleteOpen(true);
  }

  /*
   * Delete note
   */
  async function handleDelete() {
    if (!deletingNote) {
      return;
    }

    try {
      setDeleting(true);
      setDeleteError("");

      await adminApiRequest(`/notes/${deletingNote.id}`, {
        method: "DELETE",
      });

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          notes: current.notes.filter((note) => note.id !== deletingNote.id),
        };
      });

      setDeleteOpen(false);
      setDeletingNote(null);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete note.",
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
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-80 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-9 w-80 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white"
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
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">
              Unable to load notes
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
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/admin/content"
              className="text-slate-500 transition hover:text-slate-900"
            >
              Content
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-400" />

            <span className="text-slate-500">{data.educationLevel.name}</span>

            <ChevronRight className="h-4 w-4 text-slate-400" />

            <Link
              href={`/admin/content/${educationLevelSlug}/${programSlug}`}
              className="text-slate-500 transition hover:text-slate-900"
            >
              {data.program.name}
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-400" />

            <Link
              href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}`}
              className="text-slate-500 transition hover:text-slate-900"
            >
              {data.subject.name}
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-400" />

            <span className="font-medium text-slate-900">
              {data.topic.name}
            </span>
          </div>

          {/* Header */}
          <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#3157d5]">
                    {data.subject.name}
                  </p>

                  <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {data.topic.name}
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Manage the notes available inside this topic.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#294bb9] active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" />
              Add note
            </button>
          </div>

          {/* Search */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notes..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
              />
            </div>

            <p className="text-sm text-slate-500">
              {filteredNotes.length} of {data.notes.length} note
              {data.notes.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Notes */}
          {filteredNotes.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <FileText className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-900">
                {search ? "No notes found" : "No notes yet"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? "Try a different search term."
                  : "Create the first note for this topic."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  Add note
                </button>
              )}
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
                >
                  <Link
                    href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}/${note.slug}`}
                    className="block"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f3ff] text-[#3157d5]">
                        <FileText className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mt-5 text-base font-semibold text-slate-950 transition group-hover:text-[#3157d5]">
                      {note.title}
                    </h2>

                    <p className="mt-2 text-xs text-slate-400">/{note.slug}</p>

                    {note.description ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {note.description}
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
                      href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}/${note.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#3157d5]"
                    >
                      Manage resources
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(note)}
                        aria-label={`Edit ${note.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(note)}
                        aria-label={`Delete ${note.title}`}
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

      {/* Add / Edit modal */}
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
                  {editingNote ? "Edit note" : "Add note"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingNote
                    ? "Update this note's information."
                    : `Add a note to ${data.topic.name}.`}
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
                  htmlFor="note-title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Note title
                </label>

                <input
                  id="note-title"
                  type="text"
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  placeholder="e.g. Reflection of Light Notes"
                  autoFocus
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="note-slug"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Slug
                </label>

                <input
                  id="note-slug"
                  type="text"
                  value={form.slug}
                  onChange={(event) => updateForm("slug", event.target.value)}
                  placeholder="reflection-of-light-notes"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Used in the public URL.
                </p>
              </div>

              <div>
                <label
                  htmlFor="note-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="note-description"
                  value={form.description}
                  onChange={(event) =>
                    updateForm("description", event.target.value)
                  }
                  placeholder="Brief description of this note..."
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
                    : editingNote
                      ? "Save changes"
                      : "Create note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteOpen && deletingNote && (
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
              Delete note?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to delete{" "}
              <span className="font-semibold text-slate-800">
                {deletingNote.title}
              </span>
              . Any resources attached to this note will also be removed by the
              database relationship.
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
                    setDeletingNote(null);
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
                {deleting ? "Deleting..." : "Delete note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
