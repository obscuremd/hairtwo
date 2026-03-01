"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateProvider } from "@/utils/onboarding";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { token } = useParams<{ token?: string }>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    if (email === "" || token === undefined) {
      toast.error("fields invalid");
      setLoading(false);
      return;
    }

    try {
      const res = await validateProvider({ email, code: token });
      if (res.success) {
        toast.success(res.message || "Profile created successfully!");
      } else {
        toast.error(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="max-w-2xl my-10 mx-auto shadow-sm border-gray-200 rounded-2xl bg-white">
      <CardContent className="p-7 sm:p-9 space-y-6">
        <div className="space-y-1 pb-5 border-b border-gray-100">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            Validate yor email Address
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            put in your email address to validate it
          </p>
        </div>
        <div className="space-y-5 mt-6 ">
          <div className="space-y-2">
            <Label>Email address</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="h-11"
            />
          </div>

          <Button
            className="w-full h-11 rounded-lg bg-primary-c hover:bg-secondary-c text-white font-semibold text-sm border-0 transition-colors disabled:opacity-60"
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
                Creating your profile…
              </span>
            ) : (
              "Finish setup"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure login protected with OTP verification.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
