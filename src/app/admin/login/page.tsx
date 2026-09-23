import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <LoginForm />
    </main>
  );
}
