"use client";

import { useState } from "react";
import type { ContactFormData, ContactSubmissionResult } from "@/types";

const initial: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initial);
  const [status, setStatus] = useState<ContactSubmissionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as ContactSubmissionResult & { success?: boolean; message?: string };
      if (res.ok && data.success !== false) {
        setStatus({ success: true, message: data.message ?? "Message sent successfully. We'll get back to you soon." });
        setForm(initial);
      } else {
        setStatus({ success: false, message: data.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ success: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-main">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-main">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text-main">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
          placeholder="Subject"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-main">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
          placeholder="Your message"
        />
      </div>
      {status && (
        <p
          className={`text-sm ${status.success ? "text-accent-primary" : "text-red-400"}`}
        >
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-accent-primary py-3 font-semibold text-bg-main transition-colors hover:bg-accent-light disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
