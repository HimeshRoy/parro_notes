"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileQuestion,
  Send,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type { ApiResponse } from "@/types/api";

export default function RequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanNoteTitle = noteTitle.trim();
    const cleanMessage = message.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanNoteTitle ||
      !cleanMessage
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (cleanName.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (cleanNoteTitle.length < 3) {
      setError("Please tell us what note or material you need.");
      return;
    }

    if (cleanMessage.length < 10) {
      setError(
        "Please provide a little more detail about what you need.",
      );
      return;
    }

    try {
      setSubmitting(true);

      /*
       * We intentionally do not send education/program/
       * subject/topic IDs here.
       *
       * A note request is for something that is NOT
       * currently available in the library.
       */
      await apiRequest<ApiResponse<unknown>>(
        "/note-requests",
        {
          method: "POST",
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,

            /*
             * Keep the request title inside the message
             * because the current backend already accepts
             * one message field.
             */
            message: `Requested note: ${cleanNoteTitle}\n\n${cleanMessage}`,
          }),
        },
      );

      setSuccess(true);

      setName("");
      setEmail("");
      setNoteTitle("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your request.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ============================================================
     SUCCESS
  ============================================================ */

  if (success) {
    return (
      <main className="min-h-screen bg-[#FFFDF7]">
        <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-3xl items-center justify-center px-5 py-16 sm:px-6">
          <div className="w-full rounded-[2rem] border border-[#E7E3D8] bg-white p-8 text-center shadow-[0_15px_50px_rgba(32,42,49,0.06)] sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#24BD11]/10 text-[#24BD11]">
              <CheckCircle2
                size={30}
                strokeWidth={2}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#24BD11]">
              Request received
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#202A31] sm:text-4xl">
              We&apos;ll look into it.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6E797E]">
              Your request has been submitted successfully.
              We&apos;ll review what you need and add the
              material when possible.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/notes"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24BD11] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1FA80F]"
              >
                Browse available notes
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDD9CE] px-5 py-3 text-sm font-semibold text-[#526067] transition hover:bg-[#F8F6EF]"
              >
                Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ========================================================
          TOP BAR
      ========================================================= */}

      <section className="border-b border-[#E8E4D9] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 lg:px-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#66737A] transition hover:text-[#24BD11]"
          >
            <ArrowLeft
              size={17}
              strokeWidth={2.1}
            />

            Back to notes
          </Link>
        </div>
      </section>

      {/* ========================================================
          CONTENT
      ========================================================= */}

      <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          {/* ====================================================
              INTRO
          ==================================================== */}

          <div className="lg:sticky lg:top-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24BD11]/10 text-[#24BD11]">
              <FileQuestion
                size={26}
                strokeWidth={2}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-[#24BD11]">
              Request a note
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#202A31] sm:text-5xl">
              Can&apos;t find what you need?
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#68747A]">
              Tell us what study material is missing from
              Parro Notes. You don&apos;t need to search through
              the library or select an existing topic.
            </p>

            {/* Helpful box */}

            <div className="mt-8 rounded-2xl border border-[#E7E3D8] bg-[#F7F5EE] p-5">
              <p className="text-sm font-bold text-[#202A31]">
                Tell us things like
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#6D787D]">
                <li>
                  Class or program
                </li>

                <li>
                  Subject and chapter/topic
                </li>

                <li>
                  The type of material you need
                </li>

                <li>
                  Any specific concepts, diagrams, or
                  questions you want covered
                </li>
              </ul>
            </div>
          </div>

          {/* ====================================================
              FORM
          ==================================================== */}

          <div className="rounded-[2rem] border border-[#E4E0D5] bg-white p-6 shadow-[0_12px_40px_rgba(32,42,49,0.05)] sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#202A31]"
                >
                  Your name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="mt-2 h-12 w-full rounded-xl border border-[#DDD9CE] bg-[#FFFDF7] px-4 text-sm text-[#202A31] outline-none transition placeholder:text-[#A1AAAE] focus:border-[#24BD11] focus:ring-4 focus:ring-[#24BD11]/10"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#202A31]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 h-12 w-full rounded-xl border border-[#DDD9CE] bg-[#FFFDF7] px-4 text-sm text-[#202A31] outline-none transition placeholder:text-[#A1AAAE] focus:border-[#24BD11] focus:ring-4 focus:ring-[#24BD11]/10"
                />
              </div>

              {/* Requested note */}

              <div>
                <label
                  htmlFor="noteTitle"
                  className="text-sm font-semibold text-[#202A31]"
                >
                  What note do you need?
                </label>

                <input
                  id="noteTitle"
                  type="text"
                  value={noteTitle}
                  onChange={(event) =>
                    setNoteTitle(event.target.value)
                  }
                  placeholder="e.g. Class 10 Physics — Electromagnetic Induction"
                  className="mt-2 h-12 w-full rounded-xl border border-[#DDD9CE] bg-[#FFFDF7] px-4 text-sm text-[#202A31] outline-none transition placeholder:text-[#A1AAAE] focus:border-[#24BD11] focus:ring-4 focus:ring-[#24BD11]/10"
                />
              </div>

              {/* Details */}

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[#202A31]"
                >
                  Tell us what you need
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Tell us the class, subject, chapter/topic, and what kind of material you want. For example: I need complete notes with explanations, diagrams, and numerical problems."
                  rows={7}
                  className="mt-2 w-full resize-none rounded-xl border border-[#DDD9CE] bg-[#FFFDF7] px-4 py-3 text-sm leading-6 text-[#202A31] outline-none transition placeholder:text-[#A1AAAE] focus:border-[#24BD11] focus:ring-4 focus:ring-[#24BD11]/10"
                />

                <p className="mt-2 text-xs leading-5 text-[#8A9497]">
                  The more detail you provide, the easier it is
                  for us to understand exactly what material is
                  missing.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-[#E8C9C2] bg-[#FFF5F2] px-4 py-3 text-sm font-medium leading-6 text-[#A34B3C]">
                  {error}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#24BD11] px-5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(36,189,17,0.14)] transition hover:bg-[#1FA80F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send
                  size={17}
                  strokeWidth={2.1}
                />

                {submitting
                  ? "Sending request..."
                  : "Send note request"}
              </button>

              <p className="text-center text-xs leading-5 text-[#8A9497]">
                Only submit requests for study material that
                isn&apos;t already available in the library.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}