"use client";

import {
  type Dispatch,
  type FormEvent,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleAlert,
  GraduationCap,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { apiRequest, getAdminToken } from "@/lib/api";
import type { EducationLevel } from "@/types/api";

interface ListResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface FormState {
  name: string;
  slug: string;
  description: string;
}

const emptyForm: FormState = {
  name: "",
  slug: "",
  description: "",
};

export default function ContentClient() {
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] =
    useState<EducationLevel | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugManuallyEdited, setSlugManuallyEdited] =
    useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<EducationLevel | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadEducationLevels = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");

      const token = getAdminToken();

      if (!token) {
        throw new Error(
          "Your admin session is unavailable. Sign in again.",
        );
      }

      const response = await apiRequest<
        ListResponse<EducationLevel[]>
      >("/education-levels", { token });

      if (!response.success || !Array.isArray(response.data)) {
        throw new Error(
          response.message || "The server returned invalid education-level data.",
        );
      }

      setLevels(response.data);
    } catch (error) {
      console.error("Unable to load education levels:", error);

      setLoadError(
        error instanceof Error
          ? error.message
          : "Unable to load education levels.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEducationLevels();
  }, [loadEducationLevels]);

  useEffect(() => {
    if (!openMenu) return;

    function closeMenuOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", closeMenuOutside);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
    };
  }, [openMenu]);

  const filteredLevels = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return levels;

    return levels.filter((level) =>
      [
        level.name,
        level.slug,
        level.description ?? "",
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [levels, search]);

  function openCreateModal() {
    setEditingLevel(null);
    setForm(emptyForm);
    setSlugManuallyEdited(false);
    setFormError("");
    setNotice("");
    setModalOpen(true);
  }

  function openEditModal(level: EducationLevel) {
    setEditingLevel(level);

    setForm({
      name: level.name,
      slug: level.slug,
      description: level.description ?? "",
    });

    setSlugManuallyEdited(level.slug !== slugify(level.name));
    setFormError("");
    setNotice("");
    setOpenMenu(null);
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingLevel(null);
    setForm(emptyForm);
    setSlugManuallyEdited(false);
    setFormError("");
  }

  function handleNameChange(name: string) {
    setForm((current) => ({
      ...current,
      name,
      slug: slugManuallyEdited
        ? current.slug
        : slugify(name),
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const name = form.name.trim();
    const slug = slugify(form.slug);
    const description = form.description.trim() || null;

    if (!name) {
      setFormError("Enter an education level name.");
      return;
    }

    if (!slug) {
      setFormError("Enter a valid URL slug.");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      const token = getAdminToken();

      if (!token) {
        throw new Error(
          "Your admin session is unavailable. Sign in again.",
        );
      }

      const payload = { name, slug, description };

      const response = await apiRequest<
        ListResponse<EducationLevel>
      >(
        editingLevel
          ? `/education-levels/${editingLevel.id}`
          : "/education-levels",
        {
          method: editingLevel ? "PUT" : "POST",
          token,
          body: JSON.stringify(payload),
        },
      );

      if (!response.success || !response.data?.id) {
        throw new Error(
          response.message || "The server did not confirm the save.",
        );
      }

      if (editingLevel) {
        setLevels((current) =>
          current.map((level) =>
            level.id === editingLevel.id
              ? response.data
              : level,
          ),
        );

        setNotice(`${response.data.name} was updated.`);
      } else {
        setLevels((current) => [
          response.data,
          ...current,
        ]);

        setNotice(`${response.data.name} was created.`);
      }

      setModalOpen(false);
      setEditingLevel(null);
      setForm(emptyForm);
      setSlugManuallyEdited(false);
    } catch (error) {
      console.error("Unable to save education level:", error);

      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to save education level.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      setDeleteError("");

      const token = getAdminToken();

      if (!token) {
        throw new Error(
          "Your admin session is unavailable. Sign in again.",
        );
      }

      await apiRequest(
        `/education-levels/${deleteTarget.id}`,
        {
          method: "DELETE",
          token,
        },
      );

      setLevels((current) =>
        current.filter((level) => level.id !== deleteTarget.id),
      );

      setNotice(`${deleteTarget.name} was deleted.`);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Unable to delete education level:", error);

      setDeleteError(
        error instanceof Error
          ? error.message
          : "Unable to delete education level.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      {/* Page heading */}
      <header className="border-b border-[#e8ecf2] pb-6">
        <div className="mb-3 flex items-center gap-2 text-[12px] text-[#667085]">
          <Link
            href="/admin"
            className="transition hover:text-[#174ea6]"
          >
            Workspace
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-[#b0b8c4]" />

          <span className="font-medium text-[#344054]">
            Content library
          </span>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[30px] font-semibold tracking-[-0.035em] text-[#101828]">
              Education library
            </h1>

            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[#667085]">
              Organize your learning content, from education levels
              down to individual notes and resources.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#174ea6] px-4 text-[13px] font-semibold text-white transition hover:bg-[#123f88] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#174ea6]/20"
          >
            <Plus className="h-4 w-4" />
            Add education level
          </button>
        </div>
      </header>

      {/* Page feedback */}
      {notice && (
        <div className="flex items-center gap-2 rounded-lg border border-[#cce8d5] bg-[#f1faf4] px-4 py-3 text-[13px] font-medium text-[#216e3a]">
          <Check className="h-4 w-4 shrink-0" />
          <span className="flex-1">{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="rounded p-1 hover:bg-[#e3f4e9]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {loadError && (
        <div className="flex items-start gap-3 rounded-lg border border-[#fecdca] bg-[#fff6f5] p-4">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#d92d20]" />

          <div>
            <p className="text-[13px] font-semibold text-[#b42318]">
              Could not load the education library
            </p>
            <p className="mt-1 text-[13px] text-[#b42318]">
              {loadError}
            </p>
            <button
              type="button"
              onClick={() => void loadEducationLevels()}
              className="mt-2 text-[12px] font-semibold text-[#174ea6] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#101828]">
            Education levels
          </h2>
          <p className="mt-1 text-[12px] text-[#667085]">
            {levels.length}{" "}
            {levels.length === 1 ? "level" : "levels"} in your library
          </p>
        </div>

        <div className="relative w-full sm:max-w-[340px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find an education level..."
            aria-label="Search education levels"
            className="h-10 w-full rounded-lg border border-[#dfe4ec] bg-white pl-9 pr-9 text-[13px] text-[#101828] outline-none placeholder:text-[#98a2b3] transition focus:border-[#8eaddb] focus:ring-4 focus:ring-[#174ea6]/[0.07]"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#344054]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* Library list */}
      <section className="overflow-visible rounded-xl border border-[#e4e7ec] bg-white">
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef4ff] text-[#174ea6]">
              <BookOpen className="h-[18px] w-[18px]" />
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-[#101828]">
                Your learning structure
              </h2>
              <p className="mt-0.5 text-[11px] text-[#98a2b3]">
                Start with a level, then open it to manage its programs.
              </p>
            </div>
          </div>

          <span className="hidden text-[11px] font-medium text-[#667085] sm:block">
            {filteredLevels.length} shown
          </span>
        </div>

        {loading ? (
          <LoadingState />
        ) : filteredLevels.length === 0 ? (
          <EmptyState
            hasSearch={Boolean(search.trim())}
            onCreate={openCreateModal}
            onClearSearch={() => setSearch("")}
          />
        ) : (
          <div>
            <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(120px,0.8fr)_minmax(160px,1.4fr)_auto] gap-4 border-b border-[#eaecf0] bg-[#fafbfc] px-6 py-3 md:grid">
              <ColumnLabel>Name</ColumnLabel>
              <ColumnLabel>URL slug</ColumnLabel>
              <ColumnLabel>Description</ColumnLabel>
              <span className="w-[104px] text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98a2b3]">
                Actions
              </span>
            </div>

            <div className="divide-y divide-[#eaecf0]">
              {filteredLevels.map((level) => (
                <EducationLevelRow
                  key={level.id}
                  level={level}
                  menuOpen={openMenu === level.id}
                  menuRef={openMenu === level.id ? menuRef : undefined}
                  onMenu={() =>
                    setOpenMenu((current) =>
                      current === level.id ? null : level.id,
                    )
                  }
                  onEdit={() => openEditModal(level)}
                  onDelete={() => {
                    setOpenMenu(null);
                    setDeleteError("");
                    setDeleteTarget(level);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && levels.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#eaecf0] bg-[#fafbfc] px-5 py-3 sm:px-6">
            <p className="text-[11px] text-[#667085]">
              Showing {filteredLevels.length} of {levels.length}{" "}
              {levels.length === 1 ? "level" : "levels"}
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#174ea6] hover:text-[#123f88]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add another
            </button>
          </div>
        )}
      </section>

      {/* Create and edit */}
      {modalOpen && (
        <EducationLevelModal
          editingLevel={editingLevel}
          form={form}
          saving={saving}
          error={formError}
          onChange={setForm}
          onNameChange={handleNameChange}
          onSlugChange={(slug) => {
            setSlugManuallyEdited(true);
            setForm((current) => ({ ...current, slug }));
          }}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteModal
          level={deleteTarget}
          deleting={deleting}
          error={deleteError}
          onCancel={() => {
            if (!deleting) {
              setDeleteTarget(null);
              setDeleteError("");
            }
          }}
          onConfirm={() => void handleDelete()}
        />
      )}
    </div>
  );
}

function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98a2b3]">
      {children}
    </span>
  );
}

function EducationLevelRow({
  level,
  menuOpen,
  menuRef,
  onMenu,
  onEdit,
  onDelete,
}: {
  level: EducationLevel;
  menuOpen: boolean;
  menuRef?: React.RefObject<HTMLDivElement | null>;
  onMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group relative grid gap-4 px-5 py-5 transition-colors hover:bg-[#fbfcfe] sm:px-6 md:grid-cols-[minmax(0,1.6fr)_minmax(120px,0.8fr)_minmax(160px,1.4fr)_auto] md:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e1eaff] bg-[#f2f6ff] text-[#174ea6]">
          <GraduationCap className="h-[19px] w-[19px]" strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <Link
            href={`/admin/content/${level.slug}`}
            className="text-[13px] font-semibold text-[#101828] transition hover:text-[#174ea6]"
          >
            {level.name}
          </Link>

          <p className="mt-1 text-[11px] text-[#98a2b3] md:hidden">
            /{level.slug}
          </p>

          <p className="mt-1 line-clamp-1 text-[12px] text-[#667085] md:hidden">
            {level.description || "No description"}
          </p>
        </div>
      </div>

      <div className="hidden min-w-0 md:block">
        <span className="inline-flex max-w-full truncate rounded-md bg-[#f2f4f7] px-2 py-1 font-mono text-[11px] text-[#475467]">
          /{level.slug}
        </span>
      </div>

      <p className="hidden min-w-0 truncate text-[12px] text-[#667085] md:block">
        {level.description || "No description"}
      </p>

      <div className="flex items-center justify-between gap-3 md:justify-end">
        <Link
          href={`/admin/content/${level.slug}`}
          className="inline-flex h-8 items-center gap-2 rounded-md px-2 text-[12px] font-semibold text-[#174ea6] transition hover:bg-[#eef4ff]"
        >
          Open level
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMenu();
            }}
            aria-label={`Actions for ${level.name}`}
            aria-expanded={menuOpen}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] transition hover:bg-[#f2f4f7] hover:text-[#344054]"
          >
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 w-40 rounded-lg border border-[#e4e7ec] bg-white p-1.5 shadow-[0_10px_30px_rgba(16,24,40,0.12)]">
              <button
                type="button"
                onClick={onEdit}
                className="flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-left text-[12px] font-medium text-[#344054] transition hover:bg-[#f8fafc]"
              >
                <Pencil className="h-3.5 w-3.5 text-[#667085]" />
                Edit details
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-left text-[12px] font-medium text-[#b42318] transition hover:bg-[#fff4f2]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete level
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EducationLevelModal({
  editingLevel,
  form,
  saving,
  error,
  onChange,
  onNameChange,
  onSlugChange,
  onClose,
  onSubmit,
}: {
  editingLevel: EducationLevel | null;
  form: FormState;
  saving: boolean;
  error: string;
  onChange: Dispatch<SetStateAction<FormState>>;
  onNameChange: (name: string) => void;
  onSlugChange: (slug: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101828]/35 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="level-modal-title"
        className="my-auto w-full max-w-[500px] overflow-hidden rounded-xl border border-[#e4e7ec] bg-white shadow-[0_24px_70px_rgba(16,24,40,0.2)]"
      >
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#174ea6]">
              Education library
            </p>

            <h2
              id="level-modal-title"
              className="mt-1.5 text-[20px] font-semibold tracking-[-0.025em] text-[#101828]"
            >
              {editingLevel
                ? "Edit education level"
                : "New education level"}
            </h2>

            <p className="mt-1.5 text-[12px] leading-5 text-[#667085]">
              {editingLevel
                ? "Change the details for this level."
                : "Create a level to organize your learning content."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close dialog"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#344054] disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-5 px-6 py-6">
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-[#fecdca] bg-[#fff6f5] px-3.5 py-3 text-[12px] text-[#b42318]">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="education-level-name"
                className="mb-1.5 block text-[12px] font-semibold text-[#344054]"
              >
                Name <span className="text-[#d92d20]">*</span>
              </label>

              <input
                id="education-level-name"
                required
                autoFocus
                maxLength={100}
                value={form.name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="e.g. School"
                className="h-10 w-full rounded-lg border border-[#d0d5dd] bg-white px-3 text-[13px] text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#8eaddb] focus:ring-4 focus:ring-[#174ea6]/[0.08]"
              />
            </div>

            <div>
              <label
                htmlFor="education-level-slug"
                className="mb-1.5 block text-[12px] font-semibold text-[#344054]"
              >
                URL slug <span className="text-[#d92d20]">*</span>
              </label>

              <div className="flex h-10 items-center rounded-lg border border-[#d0d5dd] bg-white px-3 focus-within:border-[#8eaddb] focus-within:ring-4 focus-within:ring-[#174ea6]/[0.08]">
                <span className="mr-1.5 text-[13px] text-[#98a2b3]">
                  /
                </span>

                <input
                  id="education-level-slug"
                  required
                  maxLength={120}
                  value={form.slug}
                  onChange={(event) =>
                    onSlugChange(slugify(event.target.value))
                  }
                  placeholder="school"
                  className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-[#101828] outline-none placeholder:text-[#98a2b3]"
                />
              </div>

              <p className="mt-1.5 text-[11px] text-[#98a2b3]">
                Generated from the name; you can customize it.
              </p>
            </div>

            <div>
              <label
                htmlFor="education-level-description"
                className="mb-1.5 block text-[12px] font-semibold text-[#344054]"
              >
                Description{" "}
                <span className="font-normal text-[#98a2b3]">
                  (optional)
                </span>
              </label>

              <textarea
                id="education-level-description"
                maxLength={500}
                rows={3}
                value={form.description}
                onChange={(event) =>
                  onChange((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Describe the type of learning content in this level."
                className="w-full resize-y rounded-lg border border-[#d0d5dd] bg-white px-3 py-2.5 text-[13px] leading-5 text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#8eaddb] focus:ring-4 focus:ring-[#174ea6]/[0.08]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-[#eaecf0] bg-[#fafbfc] px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[12px] font-semibold text-[#344054] transition hover:bg-[#f8fafc] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-9 min-w-[125px] items-center justify-center gap-2 rounded-lg bg-[#174ea6] px-4 text-[12px] font-semibold text-white transition hover:bg-[#123f88] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  {editingLevel ? "Save changes" : "Create level"}
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function DeleteModal({
  level,
  deleting,
  error,
  onCancel,
  onConfirm,
}: {
  level: EducationLevel;
  deleting: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#101828]/35 px-4 py-6">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-level-title"
        className="w-full max-w-[430px] overflow-hidden rounded-xl border border-[#e4e7ec] bg-white shadow-[0_24px_70px_rgba(16,24,40,0.2)]"
      >
        <div className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff1f0] text-[#d92d20]">
            <Trash2 className="h-[18px] w-[18px]" />
          </div>

          <h2
            id="delete-level-title"
            className="mt-4 text-[18px] font-semibold text-[#101828]"
          >
            Delete {level.name}?
          </h2>

          <p className="mt-2 text-[13px] leading-6 text-[#667085]">
            Deleting this education level may also delete its
            programs, subjects, topics and notes through cascading
            database relationships.
          </p>

          <p className="mt-2 text-[12px] font-medium text-[#b42318]">
            This action cannot be undone.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-[#fecdca] bg-[#fff6f5] px-3 py-2.5 text-[12px] text-[#b42318]">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2.5 border-t border-[#eaecf0] bg-[#fafbfc] px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[12px] font-semibold text-[#344054] hover:bg-[#f8fafc] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex h-9 min-w-[100px] items-center justify-center gap-2 rounded-lg bg-[#d92d20] px-4 text-[12px] font-semibold text-white transition hover:bg-[#b42318] disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete level"}
          </button>
        </div>
      </section>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="divide-y divide-[#eaecf0]">
      {[1, 2, 3].map((row) => (
        <div
          key={row}
          className="flex animate-pulse items-center gap-3 px-5 py-5 sm:px-6"
        >
          <div className="h-10 w-10 rounded-lg bg-[#f2f4f7]" />

          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-32 rounded bg-[#f2f4f7]" />
            <div className="h-3 w-56 max-w-full rounded bg-[#f2f4f7]" />
          </div>

          <div className="hidden h-8 w-24 rounded bg-[#f2f4f7] sm:block" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  hasSearch,
  onCreate,
  onClearSearch,
}: {
  hasSearch: boolean;
  onCreate: () => void;
  onClearSearch: () => void;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f6ff] text-[#174ea6]">
        <GraduationCap className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-[15px] font-semibold text-[#101828]">
        {hasSearch
          ? "No matching education levels"
          : "Your education library is empty"}
      </h3>

      <p className="mx-auto mt-1.5 max-w-sm text-[12px] leading-5 text-[#667085]">
        {hasSearch
          ? "Try another search term or clear your search."
          : "Create your first education level to start organizing programs, subjects, topics and notes."}
      </p>

      {hasSearch ? (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-5 text-[12px] font-semibold text-[#174ea6] hover:underline"
        >
          Clear search
        </button>
      ) : (
        <button
          type="button"
          onClick={onCreate}
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-[#174ea6] px-3.5 text-[12px] font-semibold text-white hover:bg-[#123f88]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create education level
        </button>
      )}
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}