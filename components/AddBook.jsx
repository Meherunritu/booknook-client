"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import BookForm from "./BookForm";
import SectionHeading from "./SectionHeading";

export default function AddBook() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function handleAdd(values) {
    await api("/books", { method: "POST", body: values });
    toast.success("Book added to the shelf.");
    router.push("/my-books");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <SectionHeading title="Add a book" text="Share a book from your shelf so others can borrow it." />
      <div className="card border border-base-300 bg-base-100">
        <div className="card-body">
          <BookForm user={session?.user} submitLabel="Add Book" onSubmit={handleAdd} />
        </div>
      </div>
    </div>
  );
}
