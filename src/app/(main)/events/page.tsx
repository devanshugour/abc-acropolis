"use client";

import Link from "next/link";
import { useEventsApi } from "@/hooks";
import { useState, useMemo } from "react";
import { Calendar, Search, Users, ArrowRight, Trophy } from "lucide-react";

const today = new Date();
today.setHours(0, 0, 0, 0);

function isUpcoming(dateStr: string) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return d >= today;
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const { events: allEvents, loading } = useEventsApi();

  const { upcoming, past } = useMemo(() => {
    const up: typeof allEvents = [];
    const pa: typeof allEvents = [];
    allEvents.forEach((e) => {
      if (isUpcoming(e.date)) up.push(e);
      else pa.push(e);
    });
    up.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    pa.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { upcoming: up, past: pa };
  }, [allEvents]);

  const filter = (list: typeof allEvents) =>
    search
      ? list.filter(
          (e) =>
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.description?.toLowerCase().includes(search.toLowerCase())
        )
      : list;

  const upcomingFiltered = filter(upcoming);
  const pastFiltered = filter(past);
  const displayList = tab === "upcoming" ? upcomingFiltered : pastFiltered;

  return (
    <div className="min-h-screen">
      <section className="section-pad border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="hero-title">Events</h1>
              <p className="section-subtitle mt-4 max-w-xl">
                Discover, register, and participate. From tech fests to cultural nights — 
                find upcoming events and relive past ones with participants and highlights.
              </p>
            </div>
            <Link href="/join-club" className="btn-secondary shrink-0">
              Join club to participate
            </Link>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-10 border-b border-accent-secondary/10 bg-bg-main/98 py-4 backdrop-blur-md">
        <div className="page-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="search"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-accent-secondary/30 bg-bg-card py-2.5 pl-10 pr-4 text-text-main placeholder:text-text-secondary focus:border-accent-primary focus:outline-none"
              />
            </div>
            <div className="flex rounded-lg border border-accent-secondary/20 bg-bg-card p-1">
              <button
                type="button"
                onClick={() => setTab("upcoming")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  tab === "upcoming"
                    ? "bg-accent-primary/20 text-accent-primary"
                    : "text-text-secondary hover:text-text-main"
                }`}
              >
                Upcoming
              </button>
              <button
                type="button"
                onClick={() => setTab("past")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  tab === "past"
                    ? "bg-accent-primary/20 text-accent-primary"
                    : "text-text-secondary hover:text-text-main"
                }`}
              >
                Past
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-container">
        {loading && (
          <p className="text-text-secondary">Loading events...</p>
        )}
        {!loading && (
          <>
            <p className="mb-8 text-sm text-text-secondary">
              {tab === "upcoming"
                ? `${upcomingFiltered.length} upcoming event${upcomingFiltered.length !== 1 ? "s" : ""}`
                : `${pastFiltered.length} past event${pastFiltered.length !== 1 ? "s" : ""}`}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayList.map((evt) => (
                <Link
                  key={evt.id}
                  href={`/events/${evt.slug}`}
                  className="card group overflow-hidden"
                >
                  <div className="aspect-video w-full bg-bg-main">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={evt.imageUrl ?? ""}
                      alt={evt.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-main">{evt.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                      {evt.shortDescription}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-accent-primary">
                      <Calendar className="h-3.5 w-3.5" />
                      {evt.venue} · {new Date(evt.date).toLocaleDateString()}
                    </p>
                    {tab === "past" && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-text-secondary">
                        <Users className="h-3.5 w-3.5" />
                        View participants & highlights
                        <ArrowRight className="h-3.5 w-3.5" />
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {displayList.length === 0 && (
              <div className="card py-16 text-center">
                <Trophy className="mx-auto h-12 w-12 text-text-secondary" />
                <p className="mt-4 text-text-secondary">
                  {tab === "upcoming"
                    ? "No upcoming events match your search."
                    : "No past events match your search."}
                </p>
              </div>
            )}
          </>
        )}
        </div>
      </section>
    </div>
  );
}
