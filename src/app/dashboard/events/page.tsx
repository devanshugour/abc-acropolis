"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Event } from "@/types";
import type { APIResponse } from "@/types/api";
import { AddEventForm } from "./AddEventForm";

export default function DashboardEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const res = await fetch("/api/events?all=true");
    const data: APIResponse<Event[] & { participantCount?: number }[]> = await res.json();
    if (data.success && data.data) setEvents(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main">Events</h1>
      <p className="mt-2 text-text-secondary">Add events and view participants.</p>

      <AddEventForm onSuccess={fetchEvents} />

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-text-main">All events</h2>
        {loading ? (
          <p className="mt-4 text-text-secondary">Loading...</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {events.map((evt) => (
              <li
                key={evt.id}
                className="flex items-center justify-between rounded-xl border border-accent-secondary/20 bg-bg-card px-4 py-3"
              >
                <div>
                  <span className="font-medium text-text-main">{evt.title}</span>
                  <span className="ml-2 text-sm text-text-secondary">
                    {new Date(evt.date).toLocaleDateString()} · {(evt as { participantCount?: number }).participantCount ?? 0} participants
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/events/${evt.slug}`}
                    className="text-sm text-accent-primary hover:text-accent-light"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/events/${evt.id}/participants`}
                    className="text-sm text-accent-primary hover:text-accent-light"
                  >
                    Participants
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
