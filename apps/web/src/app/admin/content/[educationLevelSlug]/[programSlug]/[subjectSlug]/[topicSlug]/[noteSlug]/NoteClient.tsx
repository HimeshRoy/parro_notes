"use client";

import {
  ArrowLeft,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Film,
  Link2,
  Loader2,
  Pencil,
  Presentation,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { apiRequest } from "@/lib/api";
import { adminApiRequest } from "@/lib/admin-api";

import type {
  ApiResponse,
  EducationLevel,
  Note,
  NoteResource,
  NoteResourceType,
  Program,
  Subject,
  Topic,
} from "@/types/api";

interface NoteClientProps {
  educationLevelSlug: string;
  programSlug: string;
  subjectSlug: string;
  topicSlug: string;
  noteSlug: string;
}

interface NoteData {
  educationLevel: EducationLevel;
  program: Program;
  subject: Subject;
  topic: Topic;
  note: Note;
}

type ResourceFilter = "ALL" | NoteResourceType;

interface UploadFormState {
  title: string;
  file: File | null;
  type: NoteResourceType | "";
  externalUrl: string;
}

const emptyUploadForm: UploadFormState = {
  title: "",
  file: null,
  type: "",
  externalUrl: "",
};

function getResourceIcon(type: NoteResourceType) {
  switch (type) {
    case "PDF":
      return FileText;

    case "DOCUMENT":
      return File;

    case "PRESENTATION":
      return Presentation;

    case "IMAGE":
      return FileImage;

    case "VIDEO":
      return Film;

    case "EXTERNAL_LINK":
      return Link2;

    default:
      return File;
  }
}

function getResourceLabel(type: NoteResourceType) {
  switch (type) {
    case "PDF":
      return "PDF";

    case "DOCUMENT":
      return "Document";

    case "PRESENTATION":
      return "Presentation";

    case "IMAGE":
      return "Image";

    case "VIDEO":
      return "Video";

    case "EXTERNAL_LINK":
      return "External link";

    default:
      return type;
  }
}

function getAcceptForType(type: NoteResourceType | "") {
  switch (type) {
    case "PDF":
      return ".pdf,application/pdf";

    case "DOCUMENT":
      return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    case "PRESENTATION":
      return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";

    case "IMAGE":
      return "image/*";

    case "VIDEO":
      return "video/*";

    default:
      return "";
  }
}

function detectTypeFromFile(file: File): NoteResourceType | "" {
  const mime = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    return "PDF";
  }

  if (
    mime === "application/msword" ||
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".doc") ||
    name.endsWith(".docx")
  ) {
    return "DOCUMENT";
  }

  if (
    mime === "application/vnd.ms-powerpoint" ||
    mime ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    name.endsWith(".ppt") ||
    name.endsWith(".pptx")
  ) {
    return "PRESENTATION";
  }

  if (mime.startsWith("image/")) {
    return "IMAGE";
  }

  if (mime.startsWith("video/")) {
    return "VIDEO";
  }

  return "";
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export default function NoteClient({
  educationLevelSlug,
  programSlug,
  subjectSlug,
  topicSlug,
  noteSlug,
}: NoteClientProps) {
  const [data, setData] = useState<NoteData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>("ALL");

  const [editingNote, setEditingNote] = useState(false);

  const [noteTitle, setNoteTitle] = useState("");

  const [noteSlugValue, setNoteSlugValue] = useState("");

  const [noteDescription, setNoteDescription] = useState("");

  const [savingNote, setSavingNote] = useState(false);

  const [noteError, setNoteError] = useState("");

  const [uploadOpen, setUploadOpen] = useState(false);

  const [uploadForm, setUploadForm] =
    useState<UploadFormState>(emptyUploadForm);

  const [uploading, setUploading] = useState(false);

  const [uploadError, setUploadError] = useState("");

  const [dragging, setDragging] = useState(false);

  const [deleteResource, setDeleteResource] = useState<NoteResource | null>(
    null,
  );

  const [deletingResource, setDeletingResource] = useState(false);

  const [resourceError, setResourceError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
   * Load note hierarchy
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

        const note = notesResponse.data.find((item) => item.slug === noteSlug);

        if (!note) {
          throw new Error("Note not found.");
        }

        const resourcesResponse = await apiRequest<ApiResponse<NoteResource[]>>(
          `/note-resources/note/${note.id}`,
        );

        setData({
          educationLevel,
          program,
          subject,
          topic,
          note: {
            ...note,
            resources: resourcesResponse.data,
          },
        });

        setNoteTitle(note.title);
        setNoteSlugValue(note.slug);
        setNoteDescription(note.description ?? "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load note.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [educationLevelSlug, programSlug, subjectSlug, topicSlug, noteSlug]);

  /*
   * Filter resources
   */
  const filteredResources = useMemo(() => {
    if (!data) {
      return [];
    }

    if (resourceFilter === "ALL") {
      return data.note.resources;
    }

    return data.note.resources.filter(
      (resource) => resource.type === resourceFilter,
    );
  }, [data, resourceFilter]);

  /*
   * Update note
   */
  async function handleSaveNote() {
    if (!data) {
      return;
    }

    const title = noteTitle.trim();
    const slug = noteSlugValue.trim();
    const description = noteDescription.trim();

    if (!title) {
      setNoteError("Note title is required.");
      return;
    }

    if (!slug) {
      setNoteError("Note slug is required.");
      return;
    }

    try {
      setSavingNote(true);
      setNoteError("");

      const response = await adminApiRequest<ApiResponse<Note>>(
        `/notes/${data.note.id}`,
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
          note: {
            ...response.data,
            resources: current.note.resources,
          },
        };
      });

      setEditingNote(false);
    } catch (err) {
      setNoteError(
        err instanceof Error ? err.message : "Failed to update note.",
      );
    } finally {
      setSavingNote(false);
    }
  }

  /*
   * Select upload file
   */
  function handleFileSelected(file: File | null) {
    if (!file) {
      return;
    }

    const detectedType = detectTypeFromFile(file);

    if (!detectedType) {
      setUploadError("This file type is not supported.");
      return;
    }

    setUploadError("");

    setUploadForm((current) => ({
      ...current,
      file,
      type: detectedType,
      title: current.title || file.name.replace(/\.[^/.]+$/, ""),
    }));
  }

  /*
   * Drag and drop
   */
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    handleFileSelected(file ?? null);
  }

  /*
   * Upload resource
   */
  async function handleUploadResource() {
    if (!data) {
      return;
    }

    const isExternal = uploadForm.type === "EXTERNAL_LINK";

    if (!isExternal && !uploadForm.file) {
      setUploadError("Please select a file.");
      return;
    }

    if (isExternal && !uploadForm.externalUrl.trim()) {
      setUploadError("Please enter the external URL.");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");

      const formData = new FormData();

      formData.append("noteId", data.note.id);

      formData.append("title", uploadForm.title.trim());

      formData.append("type", uploadForm.type);

      if (isExternal) {
        formData.append("url", uploadForm.externalUrl.trim());
      } else if (uploadForm.file) {
        formData.append("file", uploadForm.file);
      }

      const response = await adminApiRequest<ApiResponse<NoteResource>>(
        "/note-resources",
        {
          method: "POST",
          body: formData,
        },
      );

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          note: {
            ...current.note,
            resources: [...current.note.resources, response.data],
          },
        };
      });

      setUploadForm(emptyUploadForm);
      setUploadOpen(false);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Failed to upload resource.",
      );
    } finally {
      setUploading(false);
    }
  }

  /*
   * Delete resource
   */
  async function handleDeleteResource() {
    if (!deleteResource) {
      return;
    }

    try {
      setDeletingResource(true);
      setResourceError("");

      await adminApiRequest(`/note-resources/${deleteResource.id}`, {
        method: "DELETE",
      });

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          note: {
            ...current.note,
            resources: current.note.resources.filter(
              (resource) => resource.id !== deleteResource.id,
            ),
          },
        };
      });

      setDeleteResource(null);
    } catch (err) {
      setResourceError(
        err instanceof Error ? err.message : "Failed to delete resource.",
      );
    } finally {
      setDeletingResource(false);
    }
  }

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f7f8fb] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />

          <div className="mt-5 h-10 w-96 max-w-full animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-3 h-4 w-[500px] max-w-full animate-pulse rounded bg-slate-200" />

          <div className="mt-10 h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-2xl bg-white" />
            <div className="h-28 animate-pulse rounded-2xl bg-white" />
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
              Unable to load note
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

            <span className="text-slate-300">/</span>

            <span className="text-slate-500">{data.educationLevel.name}</span>

            <span className="text-slate-300">/</span>

            <Link
              href={`/admin/content/${educationLevelSlug}/${programSlug}`}
              className="text-slate-500 transition hover:text-slate-900"
            >
              {data.program.name}
            </Link>

            <span className="text-slate-300">/</span>

            <Link
              href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}`}
              className="text-slate-500 transition hover:text-slate-900"
            >
              {data.subject.name}
            </Link>

            <span className="text-slate-300">/</span>

            <Link
              href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}`}
              className="text-slate-500 transition hover:text-slate-900"
            >
              {data.topic.name}
            </Link>

            <span className="text-slate-300">/</span>

            <span className="font-medium text-slate-900">
              {data.note.title}
            </span>
          </div>

          {/* Header */}
          <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#3157d5]">
                  {data.topic.name}
                </p>

                <h1 className="mt-1 break-words text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  {data.note.title}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  {data.note.description ||
                    "Manage this note and all of its learning resources."}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/content/${educationLevelSlug}/${programSlug}/${subjectSlug}/${topicSlug}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>

              <button
                type="button"
                onClick={() => {
                  setEditingNote(true);
                  setNoteError("");
                }}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Pencil className="h-4 w-4" />
                Edit note
              </button>
            </div>
          </div>

          {/* Note information */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Note information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Basic information used for this note.
                </p>
              </div>
            </div>

            {editingNote ? (
              <div className="space-y-5 p-5 sm:p-6">
                {noteError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {noteError}
                  </div>
                )}

                <div className="grid gap-5 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="note-title"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Title
                    </label>

                    <input
                      id="note-title"
                      value={noteTitle}
                      onChange={(event) => setNoteTitle(event.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none transition focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
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
                      value={noteSlugValue}
                      onChange={(event) => setNoteSlugValue(event.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none transition focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="note-description"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="note-description"
                    rows={4}
                    value={noteDescription}
                    onChange={(event) => setNoteDescription(event.target.value)}
                    className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNote(false);
                      setNoteError("");
                      setNoteTitle(data.note.title);
                      setNoteSlugValue(data.note.slug);
                      setNoteDescription(data.note.description ?? "");
                    }}
                    disabled={savingNote}
                    className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveNote}
                    disabled={savingNote}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#3157d5] px-4 text-sm font-semibold text-white transition hover:bg-[#294bb9] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingNote ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}

                    {savingNote ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Title
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {data.note.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Slug
                  </p>

                  <p className="mt-2 break-all text-sm text-slate-600">
                    /{data.note.slug}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Resources
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {data.note.resources.length}{" "}
                    {data.note.resources.length === 1 ? "file" : "files"}
                  </p>
                </div>

                {data.note.description && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Description
                    </p>

                    <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
                      {data.note.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Resources */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    Learning resources
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload and manage all files attached to this note.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUploadForm(emptyUploadForm);
                    setUploadError("");
                    setUploadOpen(true);
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#3157d5] px-4 text-sm font-semibold text-white transition hover:bg-[#294bb9]"
                >
                  <Upload className="h-4 w-4" />
                  Upload resource
                </button>
              </div>

              {/* Filters */}
              <div className="mt-5 flex flex-wrap gap-2">
                {(
                  [
                    "ALL",
                    "PDF",
                    "DOCUMENT",
                    "PRESENTATION",
                    "IMAGE",
                    "VIDEO",
                    "EXTERNAL_LINK",
                  ] as ResourceFilter[]
                ).map((filter) => {
                  const active = resourceFilter === filter;

                  const count =
                    filter === "ALL"
                      ? data.note.resources.length
                      : data.note.resources.filter(
                          (resource) => resource.type === filter,
                        ).length;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setResourceFilter(filter)}
                      className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition ${
                        active
                          ? "border-[#3157d5] bg-[#eef2ff] text-[#3157d5]"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      {filter === "ALL" ? "All" : getResourceLabel(filter)}

                      <span
                        className={active ? "text-[#3157d5]" : "text-slate-400"}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resource list */}
            <div className="p-5 sm:p-6">
              {filteredResources.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 px-6 py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Upload className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    {data.note.resources.length === 0
                      ? "No resources yet"
                      : "No resources in this category"}
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    {data.note.resources.length === 0
                      ? "Upload PDFs, documents, presentations, images, videos, or add an external link."
                      : "Try another resource category."}
                  </p>

                  {data.note.resources.length === 0 && (
                    <button
                      type="button"
                      onClick={() => setUploadOpen(true)}
                      className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      <Upload className="h-4 w-4" />
                      Upload resource
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResources.map((resource) => {
                    const Icon = getResourceIcon(resource.type);

                    return (
                      <div
                        key={resource.id}
                        className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 sm:flex-row sm:items-center"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f3ff] text-[#3157d5]">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {resource.title ||
                                getResourceLabel(resource.type)}
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                              <span>{getResourceLabel(resource.type)}</span>

                              <span>·</span>

                              <span className="max-w-[280px] truncate">
                                {resource.url}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open
                          </a>

                          <button
                            type="button"
                            onClick={() => setDeleteResource(resource)}
                            className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            aria-label={`Delete ${
                              resource.title || "resource"
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Upload modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Add learning resource
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a file or external link to this note.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!uploading) {
                    setUploadOpen(false);
                    setUploadError("");
                    setUploadForm(emptyUploadForm);
                  }
                }}
                disabled={uploading}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {uploadError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {uploadError}
                </div>
              )}

              {/* Resource type */}
              <div>
                <label
                  htmlFor="resource-type"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Resource type
                </label>

                <select
                  id="resource-type"
                  value={uploadForm.type}
                  onChange={(event) => {
                    const type = event.target.value as NoteResourceType | "";

                    setUploadForm((current) => ({
                      ...current,
                      type,
                      file: null,
                      externalUrl: "",
                    }));

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  disabled={uploading}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                >
                  <option value="">Select resource type</option>

                  <option value="PDF">PDF</option>

                  <option value="DOCUMENT">Document</option>

                  <option value="PRESENTATION">Presentation</option>

                  <option value="IMAGE">Image</option>

                  <option value="VIDEO">Video</option>

                  <option value="EXTERNAL_LINK">External link</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="resource-title"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Resource title
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <input
                  id="resource-title"
                  value={uploadForm.title}
                  onChange={(event) =>
                    setUploadForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g. Chapter PDF"
                  disabled={uploading}
                  className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                />
              </div>

              {/* File upload */}
              {uploadForm.type && uploadForm.type !== "EXTERNAL_LINK" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    File
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={getAcceptForType(uploadForm.type)}
                    onChange={(event) =>
                      handleFileSelected(event.target.files?.[0] ?? null)
                    }
                    className="hidden"
                  />

                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => {
                      if (!uploading) {
                        fileInputRef.current?.click();
                      }
                    }}
                    className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
                      dragging
                        ? "border-[#3157d5] bg-[#eef2ff]"
                        : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
                      <Upload className="h-5 w-5" />
                    </div>

                    {uploadForm.file ? (
                      <>
                        <p className="mt-4 truncate px-4 text-sm font-semibold text-slate-900">
                          {uploadForm.file.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatFileSize(uploadForm.file.size)}
                        </p>

                        <p className="mt-3 text-xs font-medium text-[#3157d5]">
                          Choose another file
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mt-4 text-sm font-semibold text-slate-900">
                          Drop your file here
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          or click to browse
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* External URL */}
              {uploadForm.type === "EXTERNAL_LINK" && (
                <div>
                  <label
                    htmlFor="resource-url"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    External URL
                  </label>

                  <input
                    id="resource-url"
                    type="url"
                    value={uploadForm.externalUrl}
                    onChange={(event) =>
                      setUploadForm((current) => ({
                        ...current,
                        externalUrl: event.target.value,
                      }))
                    }
                    placeholder="https://example.com/resource"
                    disabled={uploading}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    if (!uploading) {
                      setUploadOpen(false);
                      setUploadError("");
                      setUploadForm(emptyUploadForm);
                    }
                  }}
                  disabled={uploading}
                  className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUploadResource}
                  disabled={uploading || !uploadForm.type}
                  className="inline-flex h-10 min-w-32 items-center justify-center gap-2 rounded-lg bg-[#3157d5] px-4 text-sm font-semibold text-white transition hover:bg-[#294bb9] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}

                  {uploading ? "Uploading..." : "Add resource"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete resource modal */}
      {deleteResource && (
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
              Delete resource?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to permanently delete{" "}
              <span className="font-semibold text-slate-800">
                {deleteResource.title || getResourceLabel(deleteResource.type)}
              </span>
              . The file will also be removed from Cloudinary.
            </p>

            {resourceError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {resourceError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!deletingResource) {
                    setDeleteResource(null);
                    setResourceError("");
                  }
                }}
                disabled={deletingResource}
                className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteResource}
                disabled={deletingResource}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingResource && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {deletingResource ? "Deleting..." : "Delete resource"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
