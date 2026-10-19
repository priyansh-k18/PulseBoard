"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  PRESET_PROFILES,
  login,
  logout,
  switchProfile,
  updateProfile,
} from "@/store/slices/authSlice";
import { setDisplayName } from "@/store/slices/preferencesSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Check, LogIn, LogOut, User, X } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [tab, setTab] = useState<"switch" | "edit">("switch");

  const [formName, setFormName] = useState(auth.user.name);
  const [formRole, setFormRole] = useState(auth.user.role);
  const [formBio, setFormBio] = useState(auth.user.bio);

  const handleSelectPreset = (key: string) => {
    dispatch(switchProfile(key));
    const selected = PRESET_PROFILES[key];
    if (selected) {
      dispatch(setDisplayName(selected.name));
      setFormName(selected.name);
      setFormRole(selected.role);
      setFormBio(selected.bio);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name: formName,
        role: formRole,
        bio: formBio,
      }),
    );
    dispatch(setDisplayName(formName));
    onClose();
  };

  const handleToggleAuth = () => {
    if (auth.isAuthenticated) {
      dispatch(logout());
      dispatch(setDisplayName("Guest"));
    } else {
      const alex = PRESET_PROFILES.alex;
      dispatch(login(alex));
      dispatch(setDisplayName(alex.name));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl text-[var(--foreground)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-xl">
                  {auth.user.avatar || "👤"}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight">
                    {auth.isAuthenticated ? auth.user.name : "Guest Mode"}
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    {auth.isAuthenticated ? auth.user.role : "Sign in to customize"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex gap-2 border-b border-[var(--border)] pb-3">
              <button
                type="button"
                onClick={() => setTab("switch")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  tab === "switch"
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                Switch Persona
              </button>
              <button
                type="button"
                onClick={() => setTab("edit")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  tab === "edit"
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleToggleAuth}
                className="ml-auto inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:text-rose-500 transition"
              >
                {auth.isAuthenticated ? (
                  <>
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </>
                ) : (
                  <>
                    <LogIn size={13} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>

            {tab === "switch" ? (
              <div className="mt-4 space-y-2.5">
                <p className="text-xs text-[var(--muted)]">
                  Select a demo account to test different personalization profiles:
                </p>
                {Object.entries(PRESET_PROFILES).map(([key, profile]) => {
                  const isActive =
                    auth.isAuthenticated && auth.user.email === profile.email;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectPreset(key)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                          : "border-[var(--border)] hover:bg-[var(--surface-muted)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{profile.avatar}</span>
                        <div>
                          <p className="text-sm font-semibold">{profile.name}</p>
                          <p className="text-xs text-[var(--muted)]">{profile.role}</p>
                        </div>
                      </div>
                      {isActive && (
                        <Check size={18} className="text-[var(--accent)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[var(--muted)]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="mt-1 h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted)]">
                    Professional Role / Title
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="mt-1 h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--muted)]">
                    Bio
                  </label>
                  <textarea
                    rows={2}
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-2 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg px-3 py-1.5 text-xs text-[var(--muted)] hover:bg-[var(--surface-muted)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-[var(--accent-contrast)] hover:brightness-110"
                  >
                    <User size={13} />
                    <span>Save Profile</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
