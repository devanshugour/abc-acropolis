export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  date: string;
  endDate?: string;
  venue: string;
  imageUrl: string;
  pdfUrl?: string;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  name: string;
  email: string;
  rollNo?: string;
  registeredAt: string;
}

export type EventFilters = {
  search?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  page?: number;
};

export interface EventDetailResponse extends Omit<Event, "participantIds"> {
  tags?: string[];
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  participantCount: number;
  shareCount: number;
  participants: EventParticipant[];
}

export interface EventComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: { id: string; name: string | null; image: string | null; email: string | null } | null;
  replies: EventComment[];
}

export interface EventLikesResponse {
  likeCount: number;
  dislikeCount: number;
  userLike: "LIKE" | "DISLIKE" | null;
}
