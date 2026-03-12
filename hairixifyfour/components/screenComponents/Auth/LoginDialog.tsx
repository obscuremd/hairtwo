"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "@/utils/onboarding";

export default function LoginDialog({
  setDialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const result = await signIn({ email: form.email, password: form.password });

    setLoading(false);

    if (result.success) {
      toast.success(result.message || "Signed in successfully!");
      setDialogOpen(false);
      window.location.reload();
    } else {
      toast.error(result.message || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className="sm:max-w-md rounded-2xl p-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold text-center">
          Welcome Back 👋
        </DialogTitle>
        <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
          Sign in to manage your bookings, appointments, and business settings.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5 mt-6">
        <div className="space-y-2">
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2 relative">
          <Label>Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="h-11 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button
          className="w-full h-11 rounded-xl text-base"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Your session is securely managed after sign in.
        </p>
      </div>
    </div>
  );
}
