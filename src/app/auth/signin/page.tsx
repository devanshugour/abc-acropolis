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
        className="flex w-full items-center justify-center gap-2 rounded-full border border-accent-secondary/50 bg-bg-main py-3 font-medium text-text-main hover:bg-accent-primary/10"
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
        <button
          type="submit"
          className="w-full rounded-full bg-accent-primary py-3 font-semibold text-bg-main hover:bg-accent-light"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main px-4">
      <div className="w-full max-w-md rounded-2xl border border-accent-secondary/20 bg-bg-card p-8">
        <h1 className="text-2xl font-bold text-text-main">Sign in</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Use Google or demo credentials (email + password &quot;demo&quot;) to access the dashboard.
        </p>
        <Suspense fallback={<div className="mt-6 h-32 animate-pulse rounded-lg bg-bg-main" />}>
          <SignInForm />
        </Suspense>
        <Link href="/" className="mt-6 block text-center text-sm text-accent-primary hover:text-accent-light">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
