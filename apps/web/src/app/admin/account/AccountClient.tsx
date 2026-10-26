"use client";

import { useEffect, useState, type FormEvent } from "react";

import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  User,
  UserRound,
} from "lucide-react";

import { adminApiRequest } from "@/lib/admin-api";
import { getCurrentAdmin, logoutAdmin } from "@/lib/auth/admin";

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

type PasswordField = "current" | "new" | "confirm";

export default function AccountClient() {
  const storedAdmin = getCurrentAdmin() as Partial<AdminProfile> | null;

  const [profile, setProfile] = useState<AdminProfile | null>(null);

  const [name, setName] = useState(storedAdmin?.name ?? "");

  const [email, setEmail] = useState(storedAdmin?.email ?? "");

  const [profileLoading, setProfileLoading] = useState(true);

  const [profileSaving, setProfileSaving] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");

  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordSaving, setPasswordSaving] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [visibleFields, setVisibleFields] = useState<
    Record<PasswordField, boolean>
  >({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setProfileLoading(true);
    setProfileError("");

    try {
      const response =
        await adminApiRequest<ApiResponse<AdminProfile>>("/auth/me");

      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);

      localStorage.setItem("parro_admin", JSON.stringify(response.data));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load account information.";

      setProfileError(message);
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setProfileMessage("");
    setProfileError("");

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      setProfileError("Name must be at least 2 characters.");
      return;
    }

    if (!normalizedEmail) {
      setProfileError("Email address is required.");
      return;
    }

    setProfileSaving(true);

    try {
      const response = await adminApiRequest<ApiResponse<AdminProfile>>(
        "/auth/me",
        {
          method: "PATCH",
          body: JSON.stringify({
            name: trimmedName,
            email: normalizedEmail,
          }),
        },
      );

      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);

      localStorage.setItem("parro_admin", JSON.stringify(response.data));

      setProfileMessage("Profile updated successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update profile.";

      setProfileError(message);
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Enter your current password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "New password must be different from your current password.",
      );
      return;
    }

    setPasswordSaving(true);

    try {
      const response = await adminApiRequest<ApiResponse<AdminProfile>>(
        "/auth/change-password",
        {
          method: "PATCH",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      if (response.data) {
        setProfile(response.data);

        localStorage.setItem("parro_admin", JSON.stringify(response.data));
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage("Password changed successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to change password.";

      setPasswordError(message);
    } finally {
      setPasswordSaving(false);
    }
  }

  function togglePassword(field: PasswordField) {
    setVisibleFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  function getPasswordType(field: PasswordField) {
    return visibleFields[field] ? "text" : "password";
  }

  if (profileLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Loader2 size={18} className="animate-spin" />
          Loading account information...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#3157d5]">Account</p>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          Account settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your administrator profile, password, and active session.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
                <UserRound size={19} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the information associated with your administrator
                  account.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="p-5 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="account-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="account-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="account-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="account-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            {profileMessage && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <Check size={17} />
                {profileMessage}
              </div>
            )}

            {profileError && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={17} />
                {profileError}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-4 text-sm font-medium text-white transition hover:bg-[#2849b8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {profileSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Security */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] text-[#3157d5]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-950">
                  Security
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Change your administrator password.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="p-5 sm:p-6">
            <div className="grid gap-5">
              <PasswordInput
                id="current-password"
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={visibleFields.current}
                onToggle={() => togglePassword("current")}
                type={getPasswordType("current")}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <PasswordInput
                  id="new-password"
                  label="New password"
                  value={newPassword}
                  onChange={setNewPassword}
                  visible={visibleFields.new}
                  onToggle={() => togglePassword("new")}
                  type={getPasswordType("new")}
                />

                <PasswordInput
                  id="confirm-password"
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  visible={visibleFields.confirm}
                  onToggle={() => togglePassword("confirm")}
                  type={getPasswordType("confirm")}
                />
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Use at least 8 characters. Avoid reusing a password from another
              account.
            </p>

            {passwordMessage && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <Check size={17} />
                {passwordMessage}
              </div>
            )}

            {passwordError && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={17} />
                {passwordError}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={passwordSaving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-4 text-sm font-medium text-white transition hover:bg-[#2849b8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {passwordSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <KeyRound size={16} />
                    Change password
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Session */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <KeyRound size={19} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    Current session
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    You are currently signed in as{" "}
                    <span className="font-medium text-slate-700">
                      {profile?.email}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  type: string;
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  visible,
  onToggle,
  type,
}: PasswordInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <KeyRound
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3157d5] focus:ring-4 focus:ring-[#3157d5]/10"
          placeholder="Enter password"
          autoComplete={
            id === "current-password" ? "current-password" : "new-password"
          }
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}
