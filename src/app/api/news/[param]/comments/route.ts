import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const { param } = await params;
  const isId = param.length === 25 && !param.includes("-");
  const post = await prisma.newsPost.findFirst({
    where: isId ? { id: param } : { slug: param },
    select: { id: true, publishedAt: true },
  });
  if (!post || !post.publishedAt) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Post not found"), { status: 404 });
  }

  const comments = await prisma.newsComment.findMany({
    where: { postId: post.id, parentId: null },
    orderBy: { createdAt: "asc" },
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

  const serialize = (c: { id: string; content: string; createdAt: Date; updatedAt: Date; user: { id: string; name: string | null; image: string | null; email: string | null } | null; replies?: Array<{ id: string; content: string; createdAt: Date; updatedAt: Date; user: { id: string; name: string | null; image: string | null; email: string | null } | null }> }) => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    user: c.user ? { id: c.user.id, name: c.user.name, image: c.user.image, email: c.user.email } : null,
    replies: (c.replies ?? []).map((r) => ({
      id: r.id,
      content: r.content,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      user: r.user ? { id: r.user.id, name: r.user.name, image: r.user.image, email: r.user.email } : null,
    })),
  });

  return NextResponse.json(successResponse(comments.map(serialize)));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Sign in required"), { status: 401 });
  }

  const { param } = await params;
  const isId = param.length === 25 && !param.includes("-");
  const post = await prisma.newsPost.findFirst({
    where: isId ? { id: param } : { slug: param },
    select: { id: true, publishedAt: true },
  });
  if (!post || !post.publishedAt) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Post not found"), { status: 404 });
  }

  try {
    const body = (await request.json()) as { content?: string; parentId?: string };
    const content = String(body.content ?? "").trim();
    const parentId = typeof body.parentId === "string" && body.parentId ? body.parentId : null;

    if (!content) {
      return NextResponse.json(errorResponse(ErrorCodes.VALIDATION_ERROR, "content is required"), { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "User not found"), { status: 401 });
    }

    const comment = await prisma.newsComment.create({
      data: { postId: post.id, userId: user.id, content, parentId },
      include: { user: { select: { id: true, name: true, image: true, email: true } } },
    });

    return NextResponse.json(
      successResponse({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
        user: comment.user ? { id: comment.user.id, name: comment.user.name, image: comment.user.image, email: comment.user.email } : null,
        replies: [],
      }),
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to add comment"),
      { status: 500 }
    );
  }
}
