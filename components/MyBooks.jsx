"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { FALLBACK_BOOK, formatDate } from "@/lib/utils";
import BookForm from "./BookForm";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";
import Spinner from "./Spinner";

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/books?mine=true")
      .then(setBooks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpdate(values) {
    const updated = await api(`/books/${editing._id}`, { method: "PATCH", body: values });
    setBooks((list) => list.map((b) => (b._id === updated._id ? updated : b)));
    setEditing(null);
    toast.success("Book updated.");
  }

  async function handleDelete() {
    setBusy(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((list) => list.filter((b) => b._id !== deleting._id));
      toast.success(`"${deleting.title}" was deleted.`);
      setDeleting(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading title="My books" text="The books you have added. Edit the details or take a book off the shelf." />

      {loading ? (
        <Spinner label="Loading your books…" />
      ) : error ? (
        <p className="py-12 text-center text-error">{error}</p>
      ) : books.length === 0 ? (
        <div className="py-12 text-center">
          <p className="opacity-75">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary mt-4">Add Your First Book</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Category</th>
                <th>Copies</th>
                <th>Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img
                      src={b.image}
                      alt={`Cover of ${b.title}`}
                      className="h-16 w-12 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_BOOK;
                      }}
                    />
                  </td>
                  <td>
                    <Link href={`/books/${b._id}`} className="font-semibold hover:text-accent">{b.title}</Link>
                    <div className="text-sm opacity-70">{b.author}</div>
                  </td>
                  <td>{b.category}</td>
                  <td>{b.availableCopies} of {b.totalCopies}</td>
                  <td>{formatDate(b.addedAt)}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(b)} className="btn btn-sm btn-outline"><Pencil size={15} /> Edit</button>
                      <button onClick={() => setDeleting(b)} className="btn btn-sm btn-error btn-outline"><Trash2 size={15} /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit book" wide>
        {editing && <BookForm key={editing._id} initial={editing} submitLabel="Save Changes" onSubmit={handleUpdate} />}
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete this book?">
        <p className="opacity-80">
          &ldquo;{deleting?.title}&rdquo; will be removed from the shelf, along with any borrow records for it. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => setDeleting(null)} className="btn btn-ghost">Keep Book</button>
          <button onClick={handleDelete} disabled={busy} className="btn btn-error">
            {busy && <span className="loading loading-spinner" />}
            Delete Book
          </button>
        </div>
      </Modal>
    </div>
  );
}
