"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, Send, Reply } from "lucide-react";
import type { EventComment } from "@/types";
import type { APIResponse } from "@/types/api";

type Props = { eventId: string; isLoggedIn: boolean };

export function EventComments({ eventId, isLoggedIn }: Props) {
  const [comments, setComments] = useState<EventComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    const res = await fetch(`/api/events/${eventId}/comments`);
    const data: APIResponse<EventComment[]> = await res.json();
    if (data.success && data.data) setComments(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim() || !isLoggedIn || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent.trim() }),
      });
      if (res.ok) {
        setNewContent("");
        await fetchComments();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !isLoggedIn || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/events/${eventId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent.trim(), parentId }),
      });
      if (res.ok) {
        setReplyContent("");
        setReplyTo(null);
        await fetchComments();
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="mt-4 text-text-secondary">Loading comments...</p>;
  }

  return (
    <div className="mt-6 space-y-6">
      {isLoggedIn && (
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write a comment..."
            rows={2}
            className="flex-1 rounded-xl border border-accent-secondary/30 bg-bg-main px-4 py-3 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={!newContent.trim() || submitting}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary text-bg-main hover:bg-accent-light disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}

      <ul className="space-y-4">
        {comments.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border border-accent-secondary/20 bg-bg-main/30 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/20 text-accent-primary">
                  {(c.user?.name ?? "?").charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-text-main">{c.user?.name ?? "Anonymous"}</span>
                <span className="text-xs text-text-secondary">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="mt-2 text-text-secondary">{c.content}</p>
            {isLoggedIn && (
              <button
                type="button"
                onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                className="mt-2 flex items-center gap-1 text-sm text-accent-primary hover:text-accent-light"
              >
                <Reply className="h-3.5 w-3.5" />
                Reply
              </button>
            )}
            {replyTo === c.id && (
              <div className="mt-3 flex gap-2 pl-10">
                <input
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-sm text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitReply(c.id);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleSubmitReply(c.id)}
                  disabled={!replyContent.trim() || submitting}
                  className="rounded-lg bg-accent-primary px-3 py-2 text-sm font-medium text-bg-main hover:bg-accent-light disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            )}
            {c.replies?.length > 0 && (
              <ul className="mt-4 space-y-3 border-l-2 border-accent-secondary/20 pl-4">
                {c.replies.map((r) => (
                  <li key={r.id} className="rounded-lg bg-bg-main/50 p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-text-main">{r.user?.name ?? "Anonymous"}</span>
                      <span className="text-xs text-text-secondary">
                        {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{r.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {comments.length === 0 && (
        <p className="rounded-xl border border-accent-secondary/20 bg-bg-main/30 px-4 py-8 text-center text-text-secondary">
          No comments yet. {isLoggedIn ? "Be the first to comment!" : "Sign in to comment."}
        </p>
      )}
    </div>
  );
}
