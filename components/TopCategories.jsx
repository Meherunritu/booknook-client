import Link from "next/link";
import { Feather, FlaskConical, Landmark, Shapes, Smile } from "lucide-react";
import SectionHeading from "./SectionHeading";

const categories = [
  { name: "Fiction", icon: Feather, text: "Novels and short stories" },
  { name: "Science", icon: FlaskConical, text: "How the world works" },
  { name: "History", icon: Landmark, text: "People, places and times" },
  { name: "Kids", icon: Smile, text: "Picture books and early readers" },
  { name: "Others", icon: Shapes, text: "Everything else on the shelf" },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading title="Browse by category" text="Jump straight to the part of the shelf you like best." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map(({ name, icon: Icon, text }) => (
          <Link
            key={name}
            href={`/books?category=${name}`}
            className="card h-full border border-base-300 bg-base-100 transition-colors hover:border-accent"
          >
            <div className="card-body items-center text-center">
              <Icon size={32} className="text-accent" />
              <h3 className="card-title">{name}</h3>
              <p className="text-sm opacity-70">{text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
