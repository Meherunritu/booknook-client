"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/upload";
import { CATEGORIES } from "@/lib/utils";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

// Used for both "Add Book" and "Edit Book". Pass `user` to show the read-only owner fields.
export default function BookForm({ initial, user, submitLabel, onSubmit }) {
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(initial?.image || "");

  function handleFile(e) {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : initial?.image || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const file = f.get("image");
    setBusy(true);
    try {
      let image = initial?.image;
      if (file && file.size > 0) image = await uploadImage(file);
      if (!image) throw new Error("Please choose a cover image for the book.");
      await onSubmit({
        title: f.get("title").trim(),
        author: f.get("author").trim(),
        category: f.get("category"),
        description: f.get("description").trim(),
        totalCopies: Number(f.get("totalCopies")),
        image,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <Field label="Book title">
        <input name="title" required maxLength={120} defaultValue={initial?.title} className="input w-full" placeholder="e.g. The Hundred Years of Solitude" />
      </Field>
      <Field label="Author name">
        <input name="author" required maxLength={80} defaultValue={initial?.author} className="input w-full" placeholder="e.g. Humayun Ahmed" />
      </Field>
      <Field label="Category">
        <select name="category" required defaultValue={initial?.category || ""} className="select w-full">
          <option value="" disabled>Choose a category</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Total copies">
        <input name="totalCopies" type="number" min={1} max={999} required defaultValue={initial?.totalCopies ?? 1} className="input w-full" />
      </Field>

      <div className="md:col-span-2">
        <Field label={initial ? "Cover image (leave empty to keep the current one)" : "Cover image"}>
          <input name="image" type="file" accept="image/*" onChange={handleFile} className="file-input w-full" />
        </Field>
        {preview && <img src={preview} alt="Cover preview" className="mt-3 h-40 rounded-box border border-base-300 object-cover" />}
      </div>

      <div className="md:col-span-2">
        <Field label="Short description">
          <textarea name="description" required maxLength={600} rows={4} defaultValue={initial?.description} className="textarea w-full" placeholder="What is this book about, and why should someone read it?" />
        </Field>
      </div>

      {user && (
        <>
          <Field label="Your name">
            <input readOnly value={user.name} className="input w-full bg-base-200" />
          </Field>
          <Field label="Your email">
            <input readOnly value={user.email} className="input w-full bg-base-200" />
          </Field>
        </>
      )}

      <div className="md:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary btn-lg w-full md:w-auto">
          {busy && <span className="loading loading-spinner" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
