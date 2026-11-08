import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="text-7xl font-bold text-secondary">404</p>
      <h1 className="mt-4 text-3xl font-bold">This page is not on the shelf</h1>
      <p className="mt-3 opacity-75">The page you are looking for may have moved, or the link may be wrong.</p>
      <Link href="/" className="btn btn-primary btn-lg mt-8">Back to Home</Link>
    </div>
  );
}
