import PrivateRoute from "@/components/PrivateRoute";
import AddBook from "@/components/AddBook";

export const metadata = { title: "Add Book" };

export default function Page() {
  return (
    <PrivateRoute>
      <AddBook />
    </PrivateRoute>
  );
}
