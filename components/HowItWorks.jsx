import { BookMarked, PlusCircle, Undo2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  { icon: PlusCircle, title: "Add a book", text: "List a book from your shelf with a cover, a short description and the number of copies you can share." },
  { icon: BookMarked, title: "Borrow a book", text: "Open any book, confirm your details and pick a return date. One copy is set aside just for you." },
  { icon: Undo2, title: "Return a book", text: "Finished reading? Press Return Book in My Borrows and the copy goes back on the shelf." },
];

export default function HowItWorks() {
  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading title="How borrowing works" text="Three steps, and you only ever hold one copy of a book at a time." />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="card h-full border border-base-300 bg-base-100">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold text-accent">Step {i + 1}</span>
                </div>
                <h3 className="card-title mt-2">{title}</h3>
                <p className="opacity-75">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
