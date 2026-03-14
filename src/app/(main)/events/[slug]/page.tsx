"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Calendar,
  MapPin,
  FileText,
  Users,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
} from "lucide-react";
import type { EventDetailResponse, EventComment, EventLikesResponse } from "@/types";
import type { APIResponse } from "@/types/api";
import { EventComments } from "./EventComments";
import { EventLikeDislike } from "./EventLikeDislike";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: session, status } = useSession();
  const [event, setEvent] = useState<EventDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data: APIResponse<EventDetailResponse>) => {
        if (data.success && data.data) setEvent(data.data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center text-text-secondary">
        Loading event...
      </div>
    );
  }
  if (!event) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center text-text-secondary">
        Event not found.
      </div>
    );
  }

  const participants = event.participants ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/events"
        className="text-sm font-medium text-accent-primary hover:text-accent-light"
      >
        ← Back to Events
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border border-accent-secondary/20 bg-bg-card">
        <div className="aspect-video w-full bg-bg-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imageUrl ?? ""}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* Tags */}
          {(event.tags ?? []).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {(event.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-primary/20 px-3 py-1 text-xs font-medium text-accent-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold text-text-main">{event.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleString()}
              {event.endDate && ` – ${new Date(event.endDate).toLocaleString()}`}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {event.venue}
            </span>
          </div>

          {/* Like, Comment, Share bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-accent-secondary/20 py-4">
            <EventLikeDislike
              eventId={event.id}
              initialLikeCount={event.likeCount ?? 0}
              initialDislikeCount={event.dislikeCount ?? 0}
              initialUserLike={null}
              isLoggedIn={status === "authenticated"}
            />
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <MessageCircle className="h-4 w-4" />
              {event.commentCount ?? 0} comments
            </span>
            <ShareButton eventId={event.id} title={event.title} shareCount={event.shareCount ?? 0} />
          </div>

          <p className="mt-6 text-text-secondary">{event.description}</p>

          {event.pdfUrl && (
            <a
              href={event.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent-secondary/50 bg-bg-main px-4 py-2 text-accent-primary hover:border-accent-primary"
            >
              <FileText className="h-4 w-4" />
              Download PDF
            </a>
          )}

          {/* Participants - public list */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-main">
              <Users className="h-5 w-5 text-accent-primary" />
              Participants ({participants.length})
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Public list of registered participants for this event.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {participants.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-accent-secondary/20 bg-bg-main/50 px-4 py-3"
                >
                  <div>
                    <span className="font-medium text-text-main">{p.name}</span>
                    {p.rollNo && (
                      <span className="ml-2 text-xs text-text-secondary">({p.rollNo})</span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary">{p.email}</span>
                </li>
              ))}
            </ul>
            {participants.length === 0 && (
              <p className="mt-4 rounded-xl border border-accent-secondary/20 bg-bg-main/30 px-4 py-6 text-center text-text-secondary">
                No participants yet. Be the first to register!
              </p>
            )}
          </section>

          {/* Comments */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text-main">
              <MessageCircle className="h-5 w-5 text-accent-primary" />
              Comments
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {status === "authenticated"
                ? "Add a comment or reply below."
                : "Sign in to like, comment, or reply."}
            </p>
            <EventComments eventId={event.id} isLoggedIn={status === "authenticated"} />
          </section>
        </div>
      </div>
    </div>
  );
}

function ShareButton({
  eventId,
  title,
  shareCount,
}: {
  eventId: string;
  title: string;
  shareCount: number;
}) {
  const [count, setCount] = useState(shareCount);
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
          text: `Check out this event: ${title}`,
        });
        setLoading(true);
        await fetch(`/api/events/${eventId}/share`, { method: "POST" });
        setCount((c) => c + 1);
      } catch {
        // User cancelled or error
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        await fetch(`/api/events/${eventId}/share`, { method: "POST" });
        setCount((c) => c + 1);
        await navigator.clipboard?.writeText(window.location.href);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-accent-secondary/30 bg-bg-card px-4 py-2 text-sm text-text-main transition-colors hover:border-accent-primary hover:bg-accent-primary/10 disabled:opacity-50"
    >
      <Share2 className="h-4 w-4" />
      Share {count > 0 && `(${count})`}
    </button>
  );
}
