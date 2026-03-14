import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";

  const posts = await prisma.newsPost.findMany({
    where: all ? undefined : { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { id: true, name: true, image: true, email: true } },
      _count: { select: { comments: true } },
    },
  });

  const list = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: all ? p.content : undefined,
    imageUrl: p.imageUrl,
    authorId: p.authorId,
    author: p.author ? { id: p.author.id, name: p.author.name, image: p.author.image, email: p.author.email } : null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    commentCount: p._count.comments,
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
    const excerpt = String(body.excerpt ?? "").trim();
    const content = String(body.content ?? "").trim();
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() || undefined : undefined;
    const publish = body.publish === true;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        errorResponse(ErrorCodes.VALIDATION_ERROR, "title, excerpt, and content are required"),
        { status: 400 }
      );
    }

    const baseSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const slug = `${baseSlug}-${Date.now()}`;

    const user = await prisma.user.findFirst({ where: { email: session.user.email } });
    const post = await prisma.newsPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt.slice(0, 500),
        content,
        imageUrl: imageUrl ?? "https://picsum.photos/seed/news/800/400",
        authorId: user?.id,
        publishedAt: publish ? new Date() : null,
      },
    });

    return NextResponse.json(
      successResponse({
        id: post.id,
        slug: post.slug,
        title: post.title,
        publishedAt: post.publishedAt?.toISOString() ?? null,
      }),
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to create post"),
      { status: 500 }
    );
  }
}
