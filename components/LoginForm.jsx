"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "./AuthShell";
import GoogleButton from "./GoogleButton";

export default function LoginForm({ redirect = "/" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error: authError } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setLoading(false);
    if (authError) {
      const message = authError.message || "We could not log you in. Check your email and password.";
      setError(message);
      toast.error(message);
      return;
    }
    toast.success("Welcome back to BookNook!");
    router.push(redirect);
  }

  const registerHref = redirect === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirect)}`;

  return (
    <AuthShell
      title="Log in"
      subtitle="Welcome back. Pick up where you left off."
      footer={
        <>
          New to BookNook? <Link href={registerHref} className="link link-accent font-semibold">Create an account</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className="input w-full" placeholder="you@example.com" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <input name="password" type={show ? "text" : "password"} required autoComplete="current-password" className="input w-full pr-12" placeholder="Your password" />
            <button type="button" onClick={() => setShow((s) => !s)} className="btn btn-ghost btn-sm btn-circle absolute right-1 top-1/2 -translate-y-1/2" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <button
          type="button"
          onClick={() => toast("Password reset is not available yet. Log in with Google or register a new account.")}
          className="link link-hover w-fit text-sm"
        >
          Forgot password?
        </button>
        {error && <p role="alert" className="rounded-field bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner" />}
          Log In
        </button>
      </form>
      <div className="divider my-1">or</div>
      <GoogleButton callbackURL={redirect} label="Log in with Google" />
    </AuthShell>
  );
}
