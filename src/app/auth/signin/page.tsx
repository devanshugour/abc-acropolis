"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  return (
    <div className="mt-6 space-y-3">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="btn-secondary w-full"
      >
        Continue with Google
      </button>
      <form
        action={async (formData) => {
          await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            callbackUrl,
          });
        }}
        className="space-y-3"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main placeholder:text-text-secondary"
        />
        <input
          name="password"
          type="password"
          placeholder="Password (use: demo)"
          className="w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main placeholder:text-text-secondary"
        />
        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-text-main">Sign in</h1>
        <p className="section-subtitle mt-2 text-sm">
          Use Google or demo credentials (email + password &quot;demo&quot;) to access the dashboard.
        </p>
        <Suspense fallback={<div className="mt-6 h-32 animate-pulse rounded-xl bg-bg-main" />}>
          <SignInForm />
        </Suspense>
        <Link href="/" className="btn-secondary mt-6 w-full justify-center">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
