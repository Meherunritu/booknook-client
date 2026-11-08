import { authClient } from "./auth-client";

const BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

/**
 * Small fetch wrapper for the Express API.
 * Protected routes get a fresh BetterAuth JWT in the Authorization header.
 */
export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new Error("Please log in again to continue.");
    headers.Authorization = `Bearer ${data.token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new Error("Cannot reach the BookNook server. Check your connection and try again.");
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Please try again.");
  return json;
}
