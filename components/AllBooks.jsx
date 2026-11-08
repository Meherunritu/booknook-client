"use client";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/utils";
import BookCard from "./BookCard";
import SectionHeading from "./SectionHeading";
import Spinner from "./Spinner";

export default function AllBooks({ initialCategory = "All" }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    api("/books", { auth: false })
      .then(setBooks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter(
      (b) => (category === "All" || b.category === category) && `${b.title} ${b.author}`.toLowerCase().includes(q)
    );
  }, [books, category, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeading title="All books" text="Everything on the shelf right now. Search by title or author, or filter by category." />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="input w-full md:max-w-sm">
          <Search size={18} className="opacity-60" />
          <input type="search" placeholder="Search title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`btn btn-sm ${category === c ? "btn-primary" : "btn-outline"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner label="Loading the shelf…" />
      ) : error ? (
        <p className="py-12 text-center text-error">{error}</p>
      ) : visible.length === 0 ? (
        <p className="py-12 text-center opacity-75">No books match your search. Try another word or category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((b) => (
            <BookCard key={b._id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
