import { Suspense } from "react";
import { redirect } from "next/navigation";
import { authEnabled, getSessionUser } from "@/lib/auth";
import { SignIn } from "@/components/SignIn";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  if (!authEnabled()) redirect("/");
  if (await getSessionUser()) redirect("/");
  return <Suspense><SignIn /></Suspense>;
}
