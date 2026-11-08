"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import BookCard from "./BookCard";
import SectionHeading from "./SectionHeading";
import Spinner from "./Spinner";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/books?limit=6", { auth: false })
      .then(setBooks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading title="New arrivals" text="The six books most recently added to the shelf." />
      {loading ? (
        <Spinner label="Fetching the newest books…" className="py-12" />
      ) : error ? (
        <p className="text-center text-error">{error}</p>
      ) : books.length === 0 ? (
        <div className="text-center">
          <p className="opacity-75">The shelf is empty. Be the first to add a book.</p>
          <Link href="/add-book" className="btn btn-primary mt-4">Add a Book</Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/books" className="btn btn-primary btn-lg">See All Books</Link>
          </div>
        </>
      )}
    </section>
  );
}
