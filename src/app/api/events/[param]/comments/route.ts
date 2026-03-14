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

  const comments = await prisma.comment.findMany({
    where: { eventId: event.id, parentId: null },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, image: true, email: true } },
      replies: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true, image: true, email: true } },
        },
      },
    },
  });

  const list = comments.map((c) => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    user: c.user
      ? { id: c.user.id, name: c.user.name, image: c.user.image, email: c.user.email }
      : null,
    replies: c.replies.map((r) => ({
      id: r.id,
      content: r.content,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      user: r.user
        ? { id: r.user.id, name: r.user.name, image: r.user.image, email: r.user.email }
        : null,
    })),
  }));

  return NextResponse.json(successResponse(list));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Sign in to comment"), { status: 401 });
  }

  const { param } = await params;
  const event = await resolveEvent(param);
  if (!event) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Event not found"), { status: 404 });
  }

  const body = (await request.json()) as { content?: string; parentId?: string };
  const content = String(body.content ?? "").trim();
  if (!content) {
    return NextResponse.json(errorResponse(ErrorCodes.VALIDATION_ERROR, "Content required"), { status: 400 });
  }

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "User not found"), { status: 401 });
  }

  const parentId = body.parentId ? String(body.parentId) : null;
  const comment = await prisma.comment.create({
    data: { eventId: event.id, userId: user.id, content, parentId },
    include: { user: { select: { id: true, name: true, image: true, email: true } } },
  });

  return NextResponse.json(
    successResponse({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      user: comment.user
        ? { id: comment.user.id, name: comment.user.name, image: comment.user.image, email: comment.user.email }
        : null,
      replies: [],
    }),
    { status: 201 }
  );
}
