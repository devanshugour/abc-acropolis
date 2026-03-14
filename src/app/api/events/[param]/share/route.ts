import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

async function resolveEvent(param: string) {
  return prisma.event.findFirst({
    where: { OR: [{ id: param }, { slug: param }] },
  });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const { param } = await params;
  const event = await resolveEvent(param);
  if (!event) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Event not found"), { status: 404 });
  }

  const updated = await prisma.event.update({
    where: { id: event.id },
    data: { shareCount: { increment: 1 } },
  });

  return NextResponse.json(successResponse({ shareCount: updated.shareCount }));
}
