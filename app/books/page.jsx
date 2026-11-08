import AllBooks from "@/components/AllBooks";
import { CATEGORIES } from "@/lib/utils";

export const metadata = { title: "All Books" };

export default async function BooksPage({ searchParams }) {
  const { category } = await searchParams;
  return <AllBooks initialCategory={CATEGORIES.includes(category) ? category : "All"} />;
}
