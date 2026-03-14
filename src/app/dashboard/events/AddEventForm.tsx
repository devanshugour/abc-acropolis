"use client";

import { useState } from "react";
import type { APIResponse } from "@/types/api";

type Props = { onSuccess: () => void };

export function AddEventForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          venue,
          date: new Date(date).toISOString(),
          pdfUrl: pdfUrl || undefined,
        }),
      });
      const data: APIResponse<unknown> = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: "ok", text: "Event created." });
        setTitle("");
        setDescription("");
        setVenue("");
        setDate("");
        setPdfUrl("");
        onSuccess();
      } else {
        setMessage({ type: "err", text: (data.error as { message?: string })?.message ?? "Failed" });
      }
    } catch {
      setMessage({ type: "err", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-xl space-y-4 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6"
    >
      <h3 className="font-semibold text-text-main">Add event</h3>
      <div>
        <label className="block text-sm text-text-secondary">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-text-main"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary">Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-text-main"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary">Venue</label>
        <input
          type="text"
          required
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-text-main"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary">Date</label>
        <input
          type="datetime-local"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-text-main"
        />
      </div>
      <div>
        <label className="block text-sm text-text-secondary">PDF URL (optional)</label>
        <input
          type="url"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-text-main"
        />
      </div>
      {message && (
        <p className={message.type === "ok" ? "text-accent-primary" : "text-red-400"}>
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-accent-primary px-6 py-2 font-semibold text-bg-main disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create event"}
      </button>
    </form>
  );
}
