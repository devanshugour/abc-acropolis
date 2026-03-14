import type { Event } from "@/types";

export const EVENTS_DATA: Event[] = [
  {
    id: "evt-1",
    title: "Tech Fest 2025",
    slug: "tech-fest-2025",
    description:
      "Annual technical festival with coding competitions, workshops, and guest talks from industry leaders.",
    shortDescription: "Annual tech festival with competitions and workshops.",
    date: "2025-04-15T09:00:00Z",
    endDate: "2025-04-17T18:00:00Z",
    venue: "Main Auditorium & Labs",
    imageUrl: "https://picsum.photos/seed/evt1/800/400",
    pdfUrl: "/pdfs/tech-fest-2025.pdf",
    participantIds: ["p1", "p2", "p3"],
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "evt-2",
    title: "Cultural Night",
    slug: "cultural-night",
    description:
      "An evening of music, dance, and drama showcasing the diverse culture of our college.",
    shortDescription: "Music, dance and drama night.",
    date: "2025-03-22T18:00:00Z",
    venue: "Open Amphitheatre",
    imageUrl: "https://picsum.photos/seed/evt2/800/400",
    participantIds: ["p4", "p5"],
    createdAt: "2025-02-01T00:00:00Z",
    updatedAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "evt-3",
    title: "Career Fair",
    slug: "career-fair",
    description:
      "Connect with top recruiters and attend sessions on resume building and interview skills.",
    shortDescription: "Meet recruiters and boost your career.",
    date: "2025-05-10T10:00:00Z",
    venue: "Convention Hall",
    imageUrl: "https://picsum.photos/seed/evt3/800/400",
    pdfUrl: "/pdfs/career-fair-brochure.pdf",
    participantIds: [],
    createdAt: "2025-02-15T00:00:00Z",
    updatedAt: "2025-02-15T00:00:00Z",
  },
];
