"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { FALLBACK_BOOK, formatDate } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Spinner from "./Spinner";

export default function MyBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    api("/borrows")
      .then(setBorrows)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleReturn(borrow) {
    setReturningId(borrow._id);
    try {
      await api(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((list) => list.filter((b) => b._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" is back on the shelf. Thank you!`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeading title="My borrows" text="Books you are reading right now. Return each one when you are done." />

      {loading ? (
        <Spinner label="Loading your borrows…" />
      ) : error ? (
        <p className="py-12 text-center text-error">{error}</p>
      ) : borrows.length === 0 ? (
        <div className="py-12 text-center">
          <p className="opacity-75">You have not borrowed any books yet.</p>
          <Link href="/books" className="btn btn-primary mt-4">Browse Books</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Borrowed</th>
                <th>Return by</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => {
                const overdue = new Date(b.returnDate) < new Date();
                return (
                  <tr key={b._id}>
                    <td>
                      <img
                        src={b.bookImage}
                        alt={`Cover of ${b.bookTitle}`}
                        className="h-16 w-12 rounded object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_BOOK;
                        }}
                      />
                    </td>
                    <td className="font-semibold">{b.bookTitle}</td>
                    <td>{formatDate(b.borrowDate)}</td>
                    <td>
                      {formatDate(b.returnDate)}
                      {overdue && <span className="badge badge-error badge-sm ml-2">Overdue</span>}
                    </td>
                    <td className="text-right">
                      <button onClick={() => handleReturn(b)} disabled={returningId === b._id} className="btn btn-sm btn-primary">
                        {returningId === b._id && <span className="loading loading-spinner loading-xs" />}
                        Return Book
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
