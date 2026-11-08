"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("booknook");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "booknook");
  }, []);

  function toggle() {
    const next = theme === "booknook" ? "booknight" : "booknook";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("booknook-theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Switch between light and dark theme">
      {theme === "booknook" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
