import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import { NewsPostComments } from "./NewsPostComments";

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, image: true } }, _count: { select: { comments: true } } },
  });

  if (!post || !post.publishedAt) notFound();

  return (
    <div className="min-h-screen">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/newspaper"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:text-accent-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Newspaper
        </Link>
        <header className="mt-6">
          <h1 className="text-3xl font-bold text-text-main sm:text-4xl">{post.title}</h1>
          <p className="mt-3 flex items-center gap-3 text-sm text-text-secondary">
            <span>{post.author?.name ?? "Editorial"}</span>
            <span>·</span>
            <time dateTime={post.publishedAt.toISOString()}>
              {post.publishedAt.toLocaleDateString()}
            </time>
            {post._count.comments > 0 && (
              <>
                <span>·</span>
                <span>{post._count.comments} comment{post._count.comments !== 1 ? "s" : ""}</span>
              </>
            )}
          </p>
        </header>
        {post.imageUrl && (
          <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl bg-bg-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="mt-8 whitespace-pre-wrap text-text-secondary">
          {post.content}
        </div>
        <hr className="my-12 border-accent-secondary/20" />
        <NewsPostComments postSlug={post.slug} initialCount={post._count.comments} />
      </article>
    </div>
  );
}
