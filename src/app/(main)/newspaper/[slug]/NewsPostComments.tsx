"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, Send } from "lucide-react";
import type { APIResponse } from "@/types/api";

interface CommentUser {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: CommentUser | null;
  replies: Comment[];
}

export function NewsPostComments({
  postSlug,
  initialCount,
}: {
  postSlug: string;
  initialCount: number;
}) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetch(`/api/news/${postSlug}/comments`)
      .then((res) => res.json())
      .then((data: APIResponse<Comment[]>) => {
        if (data.success && data.data) setComments(data.data);
      })
      .finally(() => setLoading(false));
  }, [postSlug]);

  const submitComment = async (content: string, parentId?: string) => {
    if (!content.trim()) return;
    const res = await fetch(`/api/news/${postSlug}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.trim(), parentId: parentId || null }),
    });
    const data = (await res.json()) as APIResponse<Comment>;
    if (data.success && data.data) {
      if (parentId) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentId
              ? { ...c, replies: [...c.replies, data.data!] }
              : c
          )
        );
      } else {
        setComments((prev) => [data.data!, ...prev]);
      }
      setNewContent("");
      setReplyTo(null);
      setReplyContent("");
    }
  };

  if (loading) {
    return (
      <div className="text-text-secondary">
        <MessageCircle className="inline h-5 w-5" /> Loading comments...
      </div>
    );
  }

  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
        <MessageCircle className="h-5 w-5" />
        Comments ({comments.length + comments.reduce((n, c) => n + c.replies.length, 0)})
      </h2>
      {session?.user ? (
        <div className="mt-4">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full rounded-lg border border-accent-secondary/30 bg-bg-card px-4 py-3 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => submitComment(newContent)}
            className="mt-2 flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-bg-main hover:bg-accent-light"
          >
            <Send className="h-4 w-4" />
            Post
          </button>
        </div>
      ) : (
        <p className="mt-2 text-sm text-text-secondary">
          Sign in to comment.
        </p>
      )}
      <ul className="mt-8 space-y-6">
        {comments.map((c) => (
          <li key={c.id} className="rounded-lg border border-accent-secondary/10 bg-bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary text-sm font-medium">
                {(c.user?.name ?? c.user?.email ?? "?").slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-main">{c.user?.name ?? "Anonymous"}</p>
                <p className="mt-1 text-sm text-text-secondary">{c.content}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-text-secondary">
                  <time>{new Date(c.createdAt).toLocaleDateString()}</time>
                  {session?.user && (
                    <button
                      type="button"
                      onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                      className="hover:text-accent-primary"
                    >
                      Reply
                    </button>
                  )}
                </div>
                {replyTo === c.id && (
                  <div className="mt-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      rows={2}
                      className="w-full rounded-lg border border-accent-secondary/30 bg-bg-main px-3 py-2 text-sm text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => submitComment(replyContent, c.id)}
                        className="rounded bg-accent-primary px-3 py-1 text-xs font-medium text-bg-main hover:bg-accent-light"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => { setReplyTo(null); setReplyContent(""); }}
                        className="text-xs text-text-secondary hover:text-text-main"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {c.replies?.length > 0 && (
                  <ul className="mt-4 ml-4 space-y-3 border-l border-accent-secondary/20 pl-4">
                    {c.replies.map((r) => (
                      <li key={r.id}>
                        <p className="text-sm font-medium text-text-main">{r.user?.name ?? "Anonymous"}</p>
                        <p className="text-sm text-text-secondary">{r.content}</p>
                        <time className="text-xs text-text-secondary">{new Date(r.createdAt).toLocaleDateString()}</time>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {comments.length === 0 && (
        <p className="mt-4 text-sm text-text-secondary">No comments yet. Be the first to comment.</p>
      )}
    </section>
  );
}
