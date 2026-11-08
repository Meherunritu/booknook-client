"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { FALLBACK_BOOK, formatDate } from "@/lib/utils";
import Modal from "./Modal";
import Spinner from "./Spinner";

const DAY = 24 * 60 * 60 * 1000;
const dateInput = (offsetDays) => new Date(Date.now() + offsetDays * DAY).toISOString().slice(0, 10);

export default function BookDetails({ id }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [returnDate, setReturnDate] = useState(dateInput(7));

  useEffect(() => {
    api(`/books/${id}`)
      .then(setBook)
      .catch((e) => setError(e.message));
  }, [id]);

  async function confirmBorrow() {
    setBusy(true);
    try {
      await api("/borrows", { method: "POST", body: { bookId: id, returnDate } });
      toast.success(`You borrowed "${book.title}". Return it by ${formatDate(returnDate)}.`);
      setBook((b) => ({ ...b, availableCopies: b.availableCopies - 1 }));
      setOpen(false);
      router.push("/my-borrows");
    } catch (err) {
      toast.error(err.message);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">We could not open this book</h1>
        <p className="mt-3 opacity-75">{error}</p>
        <Link href="/books" className="btn btn-primary mt-6">Back to All Books</Link>
      </div>
    );
  }
  if (!book) return <Spinner label="Opening the book…" />;

  const available = book.availableCopies > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 md:grid-cols-5">
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="h-96 w-full rounded-box border border-base-300 object-cover md:col-span-2 md:h-[34rem]"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_BOOK;
          }}
        />
        <div className="md:col-span-3">
          <span className="badge badge-accent badge-outline">{book.category}</span>
          <h1 className="mt-3 text-4xl font-bold">{book.title}</h1>
          <p className="mt-1 text-lg opacity-75">by {book.author}</p>

          <p className="mt-6 max-w-prose whitespace-pre-line">{book.description}</p>

          <dl className="mt-8 grid gap-4 rounded-box border border-base-300 bg-base-200 p-5 sm:grid-cols-3">
            <div>
              <dt className="text-sm opacity-70">Added by</dt>
              <dd className="font-semibold">{book.addedBy?.name}</dd>
              <dd className="truncate text-xs opacity-70">{book.addedBy?.email}</dd>
            </div>
            <div>
              <dt className="text-sm opacity-70">Added on</dt>
              <dd className="font-semibold">{formatDate(book.addedAt)}</dd>
            </div>
            <div>
              <dt className="text-sm opacity-70">Copies available</dt>
              <dd className="font-semibold">{book.availableCopies} of {book.totalCopies}</dd>
            </div>
          </dl>

          <button onClick={() => setOpen(true)} disabled={!available} className="btn btn-primary btn-lg mt-8">
            {available ? "Borrow This Book" : "Not Available"}
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`Borrow "${book.title}"`}>
        <div className="grid gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Your name</span>
            <input readOnly value={user?.name || ""} className="input w-full bg-base-200" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Your email</span>
            <input readOnly value={user?.email || ""} className="input w-full bg-base-200" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Return by (up to 30 days)</span>
            <input type="date" min={dateInput(1)} max={dateInput(30)} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="input w-full" />
          </label>
          <button onClick={confirmBorrow} disabled={busy} className="btn btn-primary">
            {busy && <span className="loading loading-spinner" />}
            Confirm Borrow
          </button>
        </div>
      </Modal>
    </div>
  );
}
