"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import type { EventLikesResponse } from "@/types";
import type { APIResponse } from "@/types/api";

type Props = {
  eventId: string;
  initialLikeCount: number;
  initialDislikeCount: number;
  initialUserLike: "LIKE" | "DISLIKE" | null;
  isLoggedIn: boolean;
};

export function EventLikeDislike({
  eventId,
  initialLikeCount,
  initialDislikeCount,
  initialUserLike,
  isLoggedIn,
}: Props) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [userLike, setUserLike] = useState<"LIKE" | "DISLIKE" | null>(initialUserLike);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && eventId) {
      fetch(`/api/events/${eventId}/likes`)
        .then((res) => res.json())
        .then((data: APIResponse<EventLikesResponse>) => {
          if (data.success && data.data) {
            setLikeCount(data.data.likeCount);
            setDislikeCount(data.data.dislikeCount);
            setUserLike(data.data.userLike);
          }
        });
    }
  }, [eventId, isLoggedIn]);

  const fetchCounts = async () => {
    const res = await fetch(`/api/events/${eventId}/likes`);
    const data: APIResponse<EventLikesResponse> = await res.json();
    if (data.success && data.data) {
      setLikeCount(data.data.likeCount);
      setDislikeCount(data.data.dislikeCount);
      setUserLike(data.data.userLike);
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "LIKE" }),
      });
      const data: APIResponse<EventLikesResponse> = await res.json();
      if (data.success && data.data) {
        setLikeCount(data.data.likeCount);
        setDislikeCount(data.data.dislikeCount);
        setUserLike(data.data.userLike);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!isLoggedIn || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "DISLIKE" }),
      });
      const data: APIResponse<EventLikesResponse> = await res.json();
      if (data.success && data.data) {
        setLikeCount(data.data.likeCount);
        setDislikeCount(data.data.dislikeCount);
        setUserLike(data.data.userLike);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleLike}
        disabled={!isLoggedIn || loading}
        title={isLoggedIn ? "Like" : "Sign in to like"}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
          userLike === "LIKE"
            ? "border-accent-primary bg-accent-primary/20 text-accent-primary"
            : "border-accent-secondary/30 bg-bg-card text-text-secondary hover:border-accent-primary/50"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <ThumbsUp className="h-4 w-4" />
        {likeCount}
      </button>
      <button
        type="button"
        onClick={handleDislike}
        disabled={!isLoggedIn || loading}
        title={isLoggedIn ? "Dislike" : "Sign in to dislike"}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
          userLike === "DISLIKE"
            ? "border-red-400/50 bg-red-400/20 text-red-400"
            : "border-accent-secondary/30 bg-bg-card text-text-secondary hover:border-red-400/30"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <ThumbsDown className="h-4 w-4" />
        {dislikeCount}
      </button>
    </div>
  );
}
