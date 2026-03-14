"use client";

import { useState } from "react";
import Link from "next/link";

export default function JoinClubPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", interest: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-md rounded-2xl border border-accent-secondary/20 bg-bg-card p-8 text-center">
          <h2 className="text-xl font-semibold text-accent-primary">Thank you!</h2>
          <p className="mt-2 text-text-secondary">
            We've received your interest. Our team will get in touch soon.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-accent-primary px-6 py-2 font-semibold text-bg-main hover:bg-accent-light"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-text-main">Join Club</h1>
      <p className="mt-4 text-lg text-text-secondary">
        Fill in your details and we'll add you to the club.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-xl space-y-4 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6"
      >
        <div>
          <label htmlFor="j-name" className="block text-sm font-medium text-text-main">
            Name
          </label>
          <input
            id="j-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="j-email" className="block text-sm font-medium text-text-main">
            Email
          </label>
          <input
            id="j-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="j-interest" className="block text-sm font-medium text-text-main">
            Area of interest
          </label>
          <select
            id="j-interest"
            value={form.interest}
            onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
          >
            <option value="">Select</option>
            <option value="tech">Tech</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-accent-primary py-3 font-semibold text-bg-main hover:bg-accent-light"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
