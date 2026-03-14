"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AddEventForm } from "../AddEventForm";

export default function CreateEventPage() {
  const router = useRouter();
  return (
    <div>
      <Link
        href="/dashboard/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-light"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-text-main">Create event</h1>
      <p className="mt-2 text-text-secondary">Add a new event. You can publish it from the events list.</p>
      <div className="mt-8 max-w-2xl">
        <AddEventForm onSuccess={() => router.push("/dashboard/events")} />
      </div>
    </div>
  );
}
