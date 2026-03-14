import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

async function resolveEvent(param: string) {
  return prisma.event.findFirst({
    where: { OR: [{ id: param }, { slug: param }] },
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const { param } = await params;
  const event = await resolveEvent(param);
  if (!event) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Event not found"), { status: 404 });
  }

  const [likeCount, dislikeCount] = await Promise.all([
    prisma.eventLike.count({ where: { eventId: event.id, type: "LIKE" } }),
    prisma.eventLike.count({ where: { eventId: event.id, type: "DISLIKE" } }),
  ]);

  const session = await getServerSession(authOptions);
  let userLike: "LIKE" | "DISLIKE" | null = null;
  if (session?.user?.email) {
    const user = await prisma.user.findFirst({ where: { email: session.user.email } });
    if (user) {
      const like = await prisma.eventLike.findUnique({
        where: { eventId_userId: { eventId: event.id, userId: user.id } },
      });
      if (like) userLike = like.type;
    }
  }

  return NextResponse.json(
    successResponse({ likeCount, dislikeCount, userLike })
  );
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Sign in to like"), { status: 401 });
  }

  const { param } = await params;
  const event = await resolveEvent(param);
  if (!event) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Event not found"), { status: 404 });
  }

  const body = (await request.json()) as { type?: string };
  const type = body.type === "DISLIKE" ? "DISLIKE" : "LIKE";

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "User not found"), { status: 401 });
  }

  await prisma.eventLike.upsert({
    where: { eventId_userId: { eventId: event.id, userId: user.id } },
    create: { eventId: event.id, userId: user.id, type },
    update: { type },
  });

  const [likeCount, dislikeCount] = await Promise.all([
    prisma.eventLike.count({ where: { eventId: event.id, type: "LIKE" } }),
    prisma.eventLike.count({ where: { eventId: event.id, type: "DISLIKE" } }),
  ]);

  return NextResponse.json(
    successResponse({ likeCount, dislikeCount, userLike: type })
  );
}
