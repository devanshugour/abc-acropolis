"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { APIResponse } from "@/types/api";

export default function CreateNewspaperPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publish, setPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          imageUrl: imageUrl.trim() || undefined,
          publish,
        }),
      });
      const data = (await res.json()) as APIResponse<{ slug: string }>;
      if (data.success) router.push("/dashboard/newspaper");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Link
        href="/dashboard/newspaper"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-light"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to newspaper
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-text-main">Create article</h1>
      <p className="mt-2 text-text-secondary">Add a new news article. Optionally publish immediately.</p>
      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-4 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Excerpt</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2} className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={6} className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary">Image URL (optional)</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
          <span className="text-sm text-text-secondary">Publish immediately</span>
        </label>
        <button type="submit" disabled={submitting} className="rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-bg-main hover:bg-accent-light disabled:opacity-50">
          {submitting ? "Creating..." : "Create article"}
        </button>
      </form>
    </div>
  );
}
