"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Menu } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FALLBACK_AVATAR } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const links = [...publicLinks, ...(user ? privateLinks : [])];
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const closeMenu = () => document.activeElement?.blur();

  async function handleLogout() {
    closeMenu();
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  }

  const items = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} onClick={closeMenu} className={isActive(l.href) ? "font-semibold text-accent" : ""}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu">
              <Menu size={22} />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow">
              {items}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <BookOpen size={26} />
            BookNook
          </Link>
        </div>

        <nav className="navbar-center hidden lg:flex" aria-label="Main">
          <ul className="menu menu-horizontal gap-1 px-1">{items}</ul>
        </nav>

        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Open account menu">
                <div className="w-10 rounded-full ring-2 ring-secondary">
                  <img
                    src={user.image || FALLBACK_AVATAR}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_AVATAR;
                    }}
                  />
                </div>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow">
                <li className="menu-title normal-case">
                  <span className="block truncate text-base font-semibold text-base-content">{user.name}</span>
                  <span className="block truncate text-xs font-normal">{user.email}</span>
                </li>
                <li>
                  <Link href="/profile" onClick={closeMenu}>My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
