import RegisterForm from "@/components/RegisterForm";
import { safeRedirect } from "@/lib/utils";

export const metadata = { title: "Register" };

export default async function RegisterPage({ searchParams }) {
  const { redirect } = await searchParams;
  return <RegisterForm redirect={safeRedirect(redirect)} />;
}
