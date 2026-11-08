"use client";
import Link from "next/link";
import { FALLBACK_BOOK } from "@/lib/utils";

export default function BookCard({ book }) {
  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100 transition-shadow hover:shadow-lg">
      <figure className="h-64 bg-base-200">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_BOOK;
          }}
        />
      </figure>
      <div className="card-body">
        <span className="badge badge-accent badge-outline w-fit">{book.category}</span>
        <h3 className="card-title line-clamp-1">{book.title}</h3>
        <p className="line-clamp-1 text-sm opacity-70">by {book.author}</p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/books/${book._id}`} className="btn btn-primary btn-block">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
