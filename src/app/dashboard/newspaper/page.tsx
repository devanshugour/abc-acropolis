"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { APIResponse } from "@/types/api";

interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  commentCount: number;
}

export default function DashboardNewspaperPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publish, setPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/news?all=true")
      .then((res) => res.json())
      .then((data: APIResponse<NewsPost[]>) => {
        if (data.success && data.data) setPosts(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

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
      if (data.success) {
        setTitle("");
        setExcerpt("");
        setContent("");
        setImageUrl("");
        setPublish(false);
        setShowForm(false);
        const list = await fetch("/api/news?all=true").then((r) => r.json()) as APIResponse<NewsPost[]>;
        if (list.success && list.data) setPosts(list.data);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/news/${slug}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Newspaper</h1>
          <p className="mt-1 text-text-secondary">
            Manage news articles. Create, publish, and view comments.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-bg-main hover:bg-accent-light"
        >
          {showForm ? "Cancel" : "Add article"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-text-main">New article</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Excerpt (short summary)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={2}
                className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
                className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Image URL (optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-4 py-2 text-text-main focus:border-accent-primary focus:outline-none"
              />
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
              <span className="text-sm text-text-secondary">Publish immediately</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-bg-main hover:bg-accent-light disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create article"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-xl border border-accent-secondary/20 bg-bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-text-main">{p.title}</h3>
                <p className="mt-1 truncate text-sm text-text-secondary">{p.excerpt}</p>
                <p className="mt-1 text-xs text-text-secondary">
                  {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "Draft"} · {p.commentCount} comments
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/newspaper/${p.slug}`}
                  className="rounded-lg border border-accent-secondary/30 px-3 py-1.5 text-sm text-text-main hover:bg-bg-main"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p.slug)}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && !showForm && (
            <p className="text-text-secondary">No articles yet. Add one above.</p>
          )}
        </div>
      )}
    </div>
  );
}
