"use client";

import { Clock, RefreshCw } from "lucide-react";

type Activity = {
  id: string;
  loggedInAt: Date;
  lastActivityAt: Date;
  refreshCount: number;
};

export function SessionActivityList({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return null;

  return (
    <section className="mt-6 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
        <Clock className="h-5 w-5 text-accent-primary" />
        Session activity
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        When you logged in and last activity (refreshes).
      </p>
      <ul className="mt-4 space-y-3">
        {activities.map((a) => (
          <li
            key={a.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent-secondary/20 bg-bg-main/30 px-4 py-3 text-sm"
          >
            <span className="text-text-secondary">
              Logged in: {new Date(a.loggedInAt).toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-text-secondary">
              <RefreshCw className="h-3.5 w-3.5" />
              {a.refreshCount} refresh{a.refreshCount !== 1 ? "es" : ""}
            </span>
            <span className="w-full text-xs text-text-secondary">
              Last activity: {new Date(a.lastActivityAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
