"use client";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/", label = "Continue with Google" }) {
  async function handleClick() {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL });
    if (error) toast.error(error.message || "Google sign in did not work. Please try again.");
  }
  return (
    <button type="button" onClick={handleClick} className="btn btn-outline w-full">
      <FcGoogle size={20} />
      {label}
    </button>
  );
}
