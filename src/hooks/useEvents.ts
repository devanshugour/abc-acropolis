"use client";

import { useMemo } from "react";
import type { EventFilters } from "@/types";
import { getEvents } from "@/services/events";

export function useEvents(filters?: EventFilters) {
  return useMemo(() => getEvents(filters), [filters?.search, filters?.fromDate, filters?.toDate, filters?.page, filters?.limit]);
}
