"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { passwordError } from "@/lib/utils";
import AuthShell from "./AuthShell";
import GoogleButton from "./GoogleButton";

export default function RegisterForm({ redirect = "/" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const password = f.get("password");

    const problem = passwordError(password);
    setPwError(problem);
    if (problem) return; // never register with an invalid password

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name: f.get("name").trim(),
      email: f.get("email"),
      password,
      image: f.get("photo").trim(),
    });
    setLoading(false);
    if (authError) {
      const message = authError.message || "We could not create your account. Please try again.";
      setError(message);
      toast.error(message);
      return;
    }
    toast.success("Account created. Please log in.");
    router.push(redirect === "/" ? "/login" : `/login?redirect=${encodeURIComponent(redirect)}`);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join BookNook to add, borrow and return books."
      footer={
        <>
          Already have an account? <Link href="/login" className="link link-accent font-semibold">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input name="name" required autoComplete="name" className="input w-full" placeholder="Your full name" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className="input w-full" placeholder="you@example.com" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Photo URL</span>
          <input name="photo" type="url" required className="input w-full" placeholder="https://example.com/me.jpg" />
        </label>
        <div>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Password</span>
            <div className="relative">
              <input
                name="password"
                type={show ? "text" : "password"}
                required
                autoComplete="new-password"
                onChange={() => setPwError("")}
                className={`input w-full pr-12 ${pwError ? "input-error" : ""}`}
                placeholder="Uppercase, lowercase, 6+ characters"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="btn btn-ghost btn-sm btn-circle absolute right-1 top-1/2 -translate-y-1/2" aria-label={show ? "Hide password" : "Show password"}>
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          {pwError && <p role="alert" className="mt-1 text-sm text-error">{pwError}</p>}
        </div>
        {error && <p role="alert" className="rounded-field bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner" />}
          Register
        </button>
      </form>
      <div className="divider my-1">or</div>
      <GoogleButton callbackURL="/" label="Sign up with Google" />
    </AuthShell>
  );
}
