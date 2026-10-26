"use client";

import {
  BookOpen,
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
  Program,
  Subject,
  Topic,
} from "@/types/api";

interface TopicsClientProps {
  educationLevelSlug: string;
  programSlug: string;
  subjectSlug: string;
}

interface TopicsData {
  educationLevel: EducationLevel;
  program: Program;
  subject: Subject;
  topics: Topic[];
}

interface TopicForm {
  name: string;
  slug: string;
  description: string;
}

interface TopicResponse extends ApiResponse<Topic> {}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const emptyForm: TopicForm = {
  name: "",
  slug: "",
  description: "",
};

export default function TopicsClient({
  educationLevelSlug,
  programSlug,
  subjectSlug,
}: TopicsClientProps) {
  const [data, setData] = useState<TopicsData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const [deletingTopic, setDeletingTopic] = useState<Topic | null>(null);

  const [form, setForm] = useState<TopicForm>(emptyForm);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [formError, setFormError] = useState("");

  const [deleteError, setDeleteError] = useState("");

  /*
   * Load hierarchy + topics
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

        setData({
          educationLevel,
          program,
          subject,
          topics: topicsResponse.data,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load topics.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [educationLevelSlug, programSlug, subjectSlug]);

  /*
   * Search
   */
  const filteredTopics = useMemo(() => {
    if (!data) {
      return [];
    }

    const query = search.trim().toLowerCase();

    if (!query) {
      return data.topics;
    }

    return data.topics.filter((topic) => {
      return (
        topic.name.toLowerCase().includes(query) ||
        topic.slug.toLowerCase().includes(query) ||
        topic.description?.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  /*
   * Create
   */
  function openCreateModal() {
    setEditingTopic(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  }

  /*
   * Edit
   */
  function openEditModal(topic: Topic) {
    setEditingTopic(topic);

    setForm({
      name: topic.name,
      slug: topic.slug,
      description: topic.description ?? "",
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
    setEditingTopic(null);
    setForm(emptyForm);
    setFormError("");
  }

  /*
   * Update form
   */
  function updateForm(field: keyof TopicForm, value: string) {
    if (field === "name" && !editingTopic) {
      setForm((current) => ({
        ...current,
        name: value,
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
   * Create / Update
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!data) {
      return;
    }

    const name = form.name.trim();
    const slug = form.slug.trim();
    const description = form.description.trim();

    if (!name) {
      setFormError("Topic name is required.");
      return;
    }

    if (!slug) {
      setFormError("Topic slug is required.");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      if (editingTopic) {
        const response = await adminApiRequest<TopicResponse>(
          `/topics/${editingTopic.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name,
              slug,
              description: description || null,
              subjectId: data.subject.id,
            }),
          },
        );

        setData((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            topics: current.topics.map((topic) =>
              topic.id === editingTopic.id ? response.data : topic,
            ),
          };
        });
      } else {
        const response = await adminApiRequest<TopicResponse>("/topics", {
          method: "POST",
          body: JSON.stringify({
            name,
            slug,
            description: description || null,
            subjectId: data.subject.id,
          }),
        });

        setData((current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            topics: [...current.topics, response.data],
          };
        });
      }

      closeModal();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to save topic.",
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * Delete modal
   */
  function openDeleteModal(topic: Topic) {
    setDeletingTopic(topic);
    setDeleteError("");
    setDeleteOpen(true);
  }

  /*
   * Delete
   */
  async function handleDelete() {
    if (!deletingTopic) {
      return;
    }

    try {
      setDeleting(true);
      setDeleteError("");

      await adminApiRequest(`/topics/${deletingTopic.id}`, {
        method: "DELETE",
      });

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          topics: current.topics.filter(
            (topic) => topic.id !== deletingTopic.id,
          ),
        };
      });

      setDeleteOpen(false);
      setDeletingTopic(null);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete topic.",
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
          <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-9 w-72 animate-pulse rounded-lg bg-slate-200" />

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
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-slate-900">
              Unable to load topics
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

            <span className="font-medium text-slate-900">
              {data.subject.name}
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
                    {data.program.name}
                  </p>

                  <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {data.subject.name}
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Manage the topics and chapters inside this subject.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#294bb9] active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" />
              Add topic
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
                placeholder="Search topics..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
              />
            </div>

            <p className="text-sm text-slate-500">
              {filteredTopics.length} of {data.topics.length} topic
              {data.topics.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Topics */}
          {filteredTopics.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <FileText className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-900">
                {search ? "No topics found" : "No topics yet"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? "Try a different search term."
                  : "Create the first topic for this subject."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  Add topic
                </button>
              )}
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
                >
                  {/* Topic */}
                  <Link
                    href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topic.slug}`}
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

                    <h2 className="mt-5 pr-4 text-base font-semibold text-slate-950 transition group-hover:text-[#3157d5]">
                      {topic.name}
                    </h2>

                    <p className="mt-2 text-xs text-slate-400">/{topic.slug}</p>

                    {topic.description ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                        {topic.description}
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
                      href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topic.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#3157d5]"
                    >
                      Open topic
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(topic)}
                        aria-label={`Edit ${topic.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(topic)}
                        aria-label={`Delete ${topic.name}`}
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

      {/* Add / Edit Modal */}
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
                  {editingTopic ? "Edit topic" : "Add topic"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingTopic
                    ? "Update this topic's information."
                    : `Add a topic to ${data.subject.name}.`}
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

              {/* Name */}
              <div>
                <label
                  htmlFor="topic-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Topic name
                </label>

                <input
                  id="topic-name"
                  type="text"
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="e.g. Reflection of Light"
                  autoFocus
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="topic-slug"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Slug
                </label>

                <input
                  id="topic-slug"
                  type="text"
                  value={form.slug}
                  onChange={(event) => updateForm("slug", event.target.value)}
                  placeholder="reflection-of-light"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Used in the public URL.
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="topic-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="topic-description"
                  value={form.description}
                  onChange={(event) =>
                    updateForm("description", event.target.value)
                  }
                  placeholder="Brief description of this topic..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              {/* Buttons */}
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
                    : editingTopic
                      ? "Save changes"
                      : "Create topic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteOpen && deletingTopic && (
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
              Delete topic?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to delete{" "}
              <span className="font-semibold text-slate-800">
                {deletingTopic.name}
              </span>
              . Any notes belonging to this topic will also be affected by the
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
                    setDeletingTopic(null);
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
                {deleting ? "Deleting..." : "Delete topic"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
