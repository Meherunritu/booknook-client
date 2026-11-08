import { BookOpen } from "lucide-react";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 md:grid-cols-2">
      <div className="hidden rounded-box bg-primary p-10 text-primary-content md:block">
        <BookOpen size={40} className="text-secondary" />
        <h2 className="mt-6 text-3xl font-bold">Add a book, borrow a book, return a book.</h2>
        <p className="mt-4 opacity-85">One account lets you share your shelf, borrow from your neighbours and keep track of what you are reading.</p>
      </div>
      <div className="card border border-base-300 bg-base-100">
        <div className="card-body">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mb-2 opacity-75">{subtitle}</p>
          {children}
          <p className="mt-4 text-center text-sm">{footer}</p>
        </div>
      </div>
    </div>
  );
}
