export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// Password rules: uppercase, lowercase, at least 6 characters.
export function passwordError(password) {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  return "";
}

// Only allow in-app paths as post-login redirects.
export function safeRedirect(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

const svg = (s) => `data:image/svg+xml;utf8,${encodeURIComponent(s)}`;

export const FALLBACK_AVATAR = svg(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='#1f2a44'/><circle cx='32' cy='24' r='11' fill='#e3a82b'/><path d='M10 58c3-14 13-20 22-20s19 6 22 20z' fill='#e3a82b'/></svg>"
);

export const FALLBACK_BOOK = svg(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'><rect width='300' height='400' fill='#1f2a44'/><rect x='28' y='28' width='244' height='344' fill='none' stroke='#e3a82b' stroke-width='3'/><text x='150' y='210' font-family='Georgia,serif' font-size='28' fill='#e3a82b' text-anchor='middle'>No cover</text></svg>"
);
