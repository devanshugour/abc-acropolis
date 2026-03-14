"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Event } from "@/types";
import type { APIResponse } from "@/types/api";
import { AddEventForm } from "./AddEventForm";
import { LayoutGrid, List } from "lucide-react";

export default function DashboardEventsPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "grid" ? "grid" : "list";
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-text-main">All events</h2>
          <div className="flex gap-2">
            <Link
              href="/dashboard/events"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${view === "list" ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary hover:bg-bg-card"}`}
            >
              <List className="h-4 w-4" />
              List
            </Link>
            <Link
              href="/dashboard/events?view=grid"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${view === "grid" ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary hover:bg-bg-card"}`}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </Link>
          </div>
        </div>
        {loading ? (
          <p className="mt-4 text-text-secondary">Loading...</p>
        ) : view === "grid" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="overflow-hidden rounded-xl border border-accent-secondary/20 bg-bg-card"
              >
                <div className="aspect-video w-full bg-bg-main">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={evt.imageUrl ?? ""} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-medium text-text-main">{evt.title}</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    {new Date(evt.date).toLocaleDateString()} · {(evt as { participantCount?: number }).participantCount ?? 0} participants
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/events/${evt.slug}`} className="text-sm text-accent-primary hover:text-accent-light">View</Link>
                    <Link href={`/dashboard/events/${evt.id}/participants`} className="text-sm text-accent-primary hover:text-accent-light">Participants</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  <Link href={`/events/${evt.slug}`} className="text-sm text-accent-primary hover:text-accent-light">View</Link>
                  <Link href={`/dashboard/events/${evt.id}/participants`} className="text-sm text-accent-primary hover:text-accent-light">Participants</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
