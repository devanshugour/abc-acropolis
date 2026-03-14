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
    include: {
      author: { select: { id: true, name: true, image: true, email: true } },
      _count: { select: { comments: true } },
    },
  });

  if (!post) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Post not found"), { status: 404 });
  }

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.email
    ? await prisma.user.findFirst({ where: { email: session.user.email }, select: { role: true } }).then((u) =>
        u?.role === "CLUB_ADMIN" || u?.role === "SUPER_ADMIN"
      )
    : false;

  if (!post.publishedAt && !isAdmin) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Post not found"), { status: 404 });
  }

  return NextResponse.json(
    successResponse({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      author: post.author ? { id: post.author.id, name: post.author.name, image: post.author.image, email: post.author.email } : null,
      publishedAt: post.publishedAt?.toISOString() ?? null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      commentCount: post._count.comments,
    })
  );
}

export async function PUT(
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
  });
  if (!post) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Post not found"), { status: 404 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = body.title != null ? String(body.title).trim() : post.title;
    const excerpt = body.excerpt != null ? String(body.excerpt).trim().slice(0, 500) : post.excerpt;
    const content = body.content != null ? String(body.content) : post.content;
    const imageUrl = body.imageUrl !== undefined ? (typeof body.imageUrl === "string" ? body.imageUrl.trim() || null : null) : post.imageUrl;
    const publish = body.publish as boolean | undefined;

    const update: { publishedAt?: Date | null } = {};
    if (publish === true && !post.publishedAt) update.publishedAt = new Date();
    if (publish === false) update.publishedAt = null;

    const updated = await prisma.newsPost.update({
      where: { id: post.id },
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        ...update,
      },
    });

    return NextResponse.json(
      successResponse({
        id: updated.id,
        slug: updated.slug,
        title: updated.title,
        publishedAt: updated.publishedAt?.toISOString() ?? null,
      })
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to update post"),
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
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
  });
  if (!post) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "Post not found"), { status: 404 });
  }

  await prisma.newsPost.delete({ where: { id: post.id } });
  return NextResponse.json(successResponse({ deleted: true }));
}
