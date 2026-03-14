import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

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
  if (!user) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "User not found"), { status: 401 });
  }

  const comment = await prisma.newsComment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });
  if (!comment) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Comment not found"), { status: 404 });
  }
  if (comment.userId !== user.id) {
    return NextResponse.json(errorResponse(ErrorCodes.FORBIDDEN, "You can only delete your own comment"), { status: 403 });
  }

  await prisma.newsComment.delete({ where: { id: commentId } });
  return NextResponse.json(successResponse({ deleted: true }));
}
