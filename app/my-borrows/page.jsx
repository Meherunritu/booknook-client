import PrivateRoute from "@/components/PrivateRoute";
import MyBorrows from "@/components/MyBorrows";

export const metadata = { title: "My Borrows" };

export default function Page() {
  return (
    <PrivateRoute>
      <MyBorrows />
    </PrivateRoute>
  );
}
