import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";
import type { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? undefined;
  const statusParam = searchParams.get("status");
  const all = searchParams.get("all") === "true";
  const tags = searchParams.get("tags")?.split(",").filter(Boolean);

  const where: Prisma.EventWhereInput = {};
  if (!all) {
    if (statusParam) where.status = statusParam as "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
    else where.status = "PUBLISHED";
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }
  if (tags?.length) where.tags = { hasSome: tags };

  const events = await prisma.event.findMany({
    where,
    orderBy: { date: "asc" },
    include: {
      _count: { select: { likes: true, comments: true, participants: true } },
    },
  });

  const list = events.map((e) => ({
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: e.description,
    shortDescription: e.shortDescription,
    date: e.date.toISOString(),
    endDate: e.endDate?.toISOString() ?? null,
    venue: e.venue,
    imageUrl: e.imageUrl,
    pdfUrl: e.pdfUrl,
    tags: e.tags,
    status: e.status,
    maxParticipants: e.maxParticipants,
    shareCount: e.shareCount,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
    likeCount: e._count.likes,
    commentCount: e._count.comments,
    participantCount: e._count.participants,
  }));

  return NextResponse.json(successResponse(list));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Sign in required"), { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const venue = String(body.venue ?? "").trim();
    const date = body.date;
    const tags = Array.isArray(body.tags) ? body.tags.map(String) : [];

    if (!title || !description || !venue || !date) {
      return NextResponse.json(
        errorResponse(ErrorCodes.VALIDATION_ERROR, "title, description, venue, and date are required"),
        { status: 400 }
      );
    }

    const baseSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const slug = `${baseSlug}-${Date.now()}`;

    const user = await prisma.user.findFirst({ where: { email: session.user.email } });
    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        shortDescription: description.slice(0, 200) + (description.length > 200 ? "..." : ""),
        date: new Date(date as string),
        venue,
        imageUrl: (body.imageUrl as string) || "https://picsum.photos/seed/event/800/400",
        pdfUrl: (body.pdfUrl as string) || undefined,
        tags,
        status: "DRAFT",
        maxParticipants: typeof body.maxParticipants === "number" ? body.maxParticipants : undefined,
        createdById: user?.id,
      },
    });

    return NextResponse.json(
      successResponse({
        id: event.id,
        slug: event.slug,
        title: event.title,
        date: event.date.toISOString(),
      }),
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to create event"),
      { status: 500 }
    );
  }
}
