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
      <div className="section-pad">
        <div className="page-container">
          <div className="card mx-auto max-w-md p-8 text-center">
            <h2 className="text-xl font-semibold text-accent-primary">Thank you!</h2>
            <p className="section-subtitle mt-2">
              We've received your interest. Our team will get in touch soon.
            </p>
            <Link href="/" className="btn-primary mt-6">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="section-pad border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container">
          <h1 className="hero-title">Join Club</h1>
          <p className="section-subtitle mt-4">Fill in your details and we'll add you to the club.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="page-container">
      <form
        onSubmit={handleSubmit}
        className="card max-w-xl space-y-4 p-6"
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
        <button type="submit" className="btn-primary w-full">
          Submit
        </button>
      </form>
        </div>
      </section>
    </div>
  );
}
