import type { NewspaperArticle } from "@/types";

export const NEWSPAPER_DATA: NewspaperArticle[] = [
  {
    id: "np-1",
    title: "College Annual Day Highlights",
    slug: "annual-day-highlights",
    excerpt: "A look back at the most memorable moments from this year's annual day.",
    content:
      "The annual day was a grand success with performances from all departments...",
    imageUrl: "https://picsum.photos/seed/np1/800/400",
    publishedAt: "2025-02-01T00:00:00Z",
    author: "Editorial Team",
  },
  {
    id: "np-2",
    title: "New Lab Facilities Inaugurated",
    slug: "new-lab-facilities",
    excerpt: "State-of-the-art labs opened for CSE and IT students.",
    content:
      "The new lab block includes dedicated spaces for AI, IoT, and cloud computing...",
    imageUrl: "https://picsum.photos/seed/np2/800/400",
    publishedAt: "2025-01-15T00:00:00Z",
    author: "News Desk",
  },
  {
    id: "np-3",
    title: "Placement Season Round-Up",
    slug: "placement-round-up",
    excerpt: "Record placements this year with top companies visiting campus.",
    content:
      "Over 90% of eligible students received offers in the ongoing placement drive...",
    imageUrl: "https://picsum.photos/seed/np3/800/400",
    publishedAt: "2025-01-10T00:00:00Z",
    author: "Placement Cell",
  },
];
