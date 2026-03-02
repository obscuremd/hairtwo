"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateProvider } from "@/utils/onboarding";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";

export default function Page() {
  const { token } = useParams<{ token?: string }>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    if (email === "" || token === undefined) {
      toast.error("Please provide a valid email address to continue.");
      setLoading(false);
      return;
    }

    try {
      const res = await validateProvider({ email, code: token });

      if (res.success) {
        toast.success(
          res.message ||
            "Your email has been successfully verified. You can now log in to your account.",
        );
      } else {
        toast.error(
          res.message ||
            "We couldn’t verify your email. Please check your details and try again.",
        );
      }
    } catch {
      toast.error(
        "An unexpected error occurred. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-c/10">
              <MailCheck className="h-6 w-6 text-primary-c" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                Verify Your Email
              </h1>
              <p className="text-sm text-gray-500">
                Enter your email address to complete your account setup.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="h-11"
              />
            </div>

            <Button
              className="w-full h-11 rounded-lg bg-primary-c hover:bg-secondary-c text-white font-semibold text-sm transition-colors disabled:opacity-60"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Complete Verification"
              )}
            </Button>

            <p className="text-xs text-center text-gray-400">
              Your account security is protected with email verification.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
