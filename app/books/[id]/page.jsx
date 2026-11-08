import PrivateRoute from "@/components/PrivateRoute";
import BookDetails from "@/components/BookDetails";

export const metadata = { title: "Book Details" };

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  return (
    <PrivateRoute>
      <BookDetails id={id} />
    </PrivateRoute>
  );
}
