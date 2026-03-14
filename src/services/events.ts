import type { Event, EventParticipant, EventFilters } from "@/types";
import { EVENTS_DATA } from "@/data/events";
import { PARTICIPANTS_DATA } from "@/data/participants";

export function getEvents(filters?: EventFilters): Event[] {
  let list = [...EVENTS_DATA];
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }
  if (filters?.fromDate) {
    list = list.filter(e => e.date >= filters.fromDate!);
  }
  if (filters?.toDate) {
    list = list.filter(e => e.date <= filters.toDate!);
  }
  const limit = filters?.limit ?? list.length;
  const page = (filters?.page ?? 1) - 1;
  return list.slice(page * limit, (page + 1) * limit);
}

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS_DATA.find((e) => e.slug === slug);
}

export function getEventById(id: string): Event | undefined {
  return EVENTS_DATA.find((e) => e.id === id);
}

export function getParticipantsByEventId(eventId: string): EventParticipant[] {
  return PARTICIPANTS_DATA.filter((p) => p.eventId === eventId);
}

export function getParticipantsForEvent(event: Event): EventParticipant[] {
  return getParticipantsByEventId(event.id);
}
