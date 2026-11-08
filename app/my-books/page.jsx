import PrivateRoute from "@/components/PrivateRoute";
import MyBooks from "@/components/MyBooks";

export const metadata = { title: "My Books" };

export default function Page() {
  return (
    <PrivateRoute>
      <MyBooks />
    </PrivateRoute>
  );
}
