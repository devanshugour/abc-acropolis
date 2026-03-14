import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const { param } = await params;
  const event = await prisma.event.findFirst({
    where: { OR: [{ slug: param }, { id: param }], status: "PUBLISHED" },
    include: {
      _count: { select: { likes: true, comments: true, participants: true } },
      participants: {
        select: { id: true, name: true, email: true, rollNo: true, registeredAt: true },
        orderBy: { registeredAt: "desc" },
      },
    },
  });

  if (!event) {
    return NextResponse.json(
      errorResponse(ErrorCodes.NOT_FOUND, "Event not found"),
      { status: 404 }
    );
  }

  const likeCount = await prisma.eventLike.count({ where: { eventId: event.id, type: "LIKE" } });
  const dislikeCount = await prisma.eventLike.count({ where: { eventId: event.id, type: "DISLIKE" } });

  return NextResponse.json(
    successResponse({
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      shortDescription: event.shortDescription,
      date: event.date.toISOString(),
      endDate: event.endDate?.toISOString() ?? null,
      venue: event.venue,
      imageUrl: event.imageUrl,
      pdfUrl: event.pdfUrl,
      tags: event.tags,
      status: event.status,
      maxParticipants: event.maxParticipants,
      shareCount: event.shareCount,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
      likeCount,
      dislikeCount,
      commentCount: event._count.comments,
      participantCount: event._count.participants,
      participants: event.participants.map((p) => ({
        id: p.id,
        name: p.name,
        email: p.email,
        rollNo: p.rollNo,
        registeredAt: p.registeredAt.toISOString(),
      })),
    })
  );
}
