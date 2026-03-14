"use client";

import { useEffect, useState } from "react";
import type { Event } from "@/types";
import type { APIResponse } from "@/types/api";

export function useEventsApi() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data: APIResponse<Event[]>) => {
        if (data.success && data.data) setEvents(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
}
