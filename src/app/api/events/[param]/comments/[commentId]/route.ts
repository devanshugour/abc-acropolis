import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ param: string; commentId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Sign in required"), { status: 401 });
  }

  const { commentId } = await params;
  const body = (await request.json()) as { content?: string };
  const content = String(body.content ?? "").trim();
  if (!content) {
    return NextResponse.json(errorResponse(ErrorCodes.VALIDATION_ERROR, "Content required"), { status: 400 });
  }

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user) return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "User not found"), { status: 401 });

  const comment = await prisma.comment.findFirst({
    where: { id: commentId, userId: user.id },
  });
  if (!comment) {
    return NextResponse.json(errorResponse(ErrorCodes.FORBIDDEN, "Not your comment"), { status: 403 });
  }

  const updated = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
    include: { user: { select: { id: true, name: true, image: true, email: true } } },
  });

  return NextResponse.json(
    successResponse({
      id: updated.id,
      content: updated.content,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      user: updated.user
        ? { id: updated.user.id, name: updated.user.name, image: updated.user.image, email: updated.user.email }
        : null,
    })
  );
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ param: string; commentId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Sign in required"), { status: 401 });
  }

  const { commentId } = await params;
  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user) return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "User not found"), { status: 401 });

  const comment = await prisma.comment.findFirst({
    where: { id: commentId, userId: user.id },
  });
  if (!comment) {
    return NextResponse.json(errorResponse(ErrorCodes.FORBIDDEN, "Not your comment"), { status: 403 });
  }

  await prisma.comment.delete({ where: { id: commentId } });
  return NextResponse.json(successResponse({ deleted: true }));
}
