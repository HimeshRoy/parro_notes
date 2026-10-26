"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { apiRequest } from "@/lib/api";

interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    admin: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiRequest<LoginResponse>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: normalizedEmail,
            password,
          }),
        },
      );

      if (!response.data?.token) {
        throw new Error(
          "Authentication token was not returned.",
        );
      }

      localStorage.setItem(
        "parro_admin_token",
        response.data.token,
      );

      localStorage.setItem(
        "parro_admin",
        JSON.stringify(response.data.admin),
      );

      router.replace("/admin");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_520px]">
        {/* Brand panel */}
        <section className="relative hidden overflow-hidden border-r border-slate-200 bg-white lg:flex">
          <div className="flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <span className="text-lg font-bold">P</span>
                </div>

                <div>
                  <p className="text-base font-semibold tracking-tight text-slate-950">
                    Parro Notes
                  </p>

                  <p className="text-xs text-slate-500">
                    Learning, organized.
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="max-w-xl pb-16">
              <p className="mb-5 text-sm font-semibold text-blue-600">
                Administration
              </p>

              <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950 xl:text-6xl">
                Keep the learning library organized.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-500">
                Manage education levels, classes, subjects, topics,
                notes and learning resources from one place.
              </p>

              <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
                <div className="h-px w-10 bg-slate-300" />
                <span>Parro Notes Administration</span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-slate-400">
              Authorized administrators only.
            </p>
          </div>
        </section>

        {/* Login panel */}
        <section className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5 py-10 sm:px-8">
          <div className="w-full max-w-[400px]">
            {/* Mobile brand */}
            <div className="mb-12 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <span className="text-lg font-bold">P</span>
                </div>

                <div>
                  <p className="text-base font-semibold tracking-tight text-slate-950">
                    Parro Notes
                  </p>

                  <p className="text-xs text-slate-500">
                    Administration
                  </p>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to manage your learning library.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    disabled={loading}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    disabled={loading}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-11 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-center text-xs leading-5 text-slate-400">
                This area is restricted to authorized Parro Notes
                administrators.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}