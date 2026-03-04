"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Eye, EyeClosed, Mail, User, Lock, Check, Circle } from "iconoir-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterDialog() {
  const router = useRouter();

  const [step, setStep] = useState<"register" | "otp">("register");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    otp: "",
  });

  const handleRegister = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1200);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/appointments");
    }, 1200);
  };

  return (
    <div className="w-full p-1">
      <AnimatePresence mode="wait">
        {/* ── REGISTER STEP ─────────────────────────────────────── */}
        {step === "register" && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Create an account
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-400 mt-1">
                Join Hairxify to discover and book top beauty professionals near
                you.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    First name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      className="h-10 pl-9 "
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Last name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      className="h-10 pl-9"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="h-10 pl-9"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="h-10 pl-9 pr-10  "
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeClosed className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {/* Strength hint */}
                {form.password.length > 0 && (
                  <div className="flex gap-1 pt-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                          form.password.length >= level * 2
                            ? level <= 2
                              ? "bg-red-400"
                              : level === 3
                                ? "bg-yellow-400"
                                : "bg-primary-c"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <Button
                className="w-full h-10 rounded-lg bg-primary-c hover:bg-secondary-c text-white font-semibold text-sm border-0 transition-colors mt-2"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Circle className="animate-spin w-4 h-4" />
                    Creating account…
                  </span>
                ) : (
                  "Create account"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] text-gray-400 font-medium">
                  Are you a service provider?{" "}
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <p className="text-xs text-gray-400 text-center">
                <Link
                  href="/auth/register"
                  className="text-primary-c font-medium hover:text-secondary-c transition-colors underline-offset-2 hover:underline"
                >
                  Set up a business
                </Link>
              </p>
            </div>
          </motion.div>
        )}

        {/* ── OTP STEP ──────────────────────────────────────────── */}
        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Check your email
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-400 mt-1">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-gray-700">
                  {form.email || "your email"}
                </span>
                . Enter it below to verify your account.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-6">
              {/* OTP slots */}
              <InputOTP
                maxLength={6}
                value={form.otp}
                onChange={(value) => setForm({ ...form, otp: value })}
              >
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-11 h-12 text-base font-semibold rounded-lg border-gray-200 bg-gray-50 focus:border-primary-c"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {/* Progress indicator */}
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-0.5 w-5 rounded-full transition-colors duration-200 ${
                      i < form.otp.length ? "bg-primary-c" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <Button
                className="w-full h-10 rounded-lg bg-primary-c hover:bg-secondary-c text-white font-semibold text-sm border-0 transition-colors disabled:opacity-50"
                onClick={handleVerifyOTP}
                disabled={loading || form.otp.length < 6}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Circle className="animate-spin w-4 h-4" />
                    Verifying…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Verify & continue
                  </span>
                )}
              </Button>

              <div className="text-center space-y-1">
                <p className="text-xs text-gray-400">
                  Didn&apos;t receive a code?{" "}
                  <button
                    type="button"
                    className="text-primary-c font-medium hover:text-secondary-c transition-colors underline-offset-2 hover:underline"
                  >
                    Resend OTP
                  </button>
                </p>
                <button
                  type="button"
                  onClick={() => setStep("register")}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← Back to registration
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
