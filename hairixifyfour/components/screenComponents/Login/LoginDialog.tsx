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
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<"login" | "otp">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleLogin = async () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1200);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      router.push("/dashboard/appointments");
    }, 1200);
  };

  return (
    <div className="sm:max-w-md rounded-2xl p-6">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold text-center">
          {step === "login" ? "Welcome Back 👋" : "Verify Your Identity"}
        </DialogTitle>
        <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
          {step === "login"
            ? "Sign in to manage your bookings, appointments, and business settings."
            : "Enter the 6-digit OTP sent to your email address."}
        </DialogDescription>
      </DialogHeader>

      {step === "login" && (
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
            Continue
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure login protected with OTP verification.
          </p>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-6 mt-6 flex flex-col items-center">
          <InputOTP
            maxLength={6}
            value={form.otp}
            onChange={(value) => setForm({ ...form, otp: value })}
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button
            className="w-full h-11 rounded-xl text-base"
            onClick={handleVerifyOTP}
            disabled={loading || form.otp.length < 6}
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Verify & Continue
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Didn’t receive a code?{" "}
            <span className="underline cursor-pointer hover:text-foreground">
              Resend OTP
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
