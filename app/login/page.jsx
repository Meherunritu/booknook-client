import LoginForm from "@/components/LoginForm";
import { safeRedirect } from "@/lib/utils";

export const metadata = { title: "Login" };

export default async function LoginPage({ searchParams }) {
  const { redirect } = await searchParams;
  return <LoginForm redirect={safeRedirect(redirect)} />;
}
