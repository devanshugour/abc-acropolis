import Link from "next/link";
import { prisma } from "@/lib/db";
import { Newspaper, ArrowRight } from "lucide-react";

export default async function NewspaperPage() {
  const posts = await prisma.newsPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });

  return (
    <div className="min-h-screen">
      <section className="border-b border-accent-secondary/10 bg-bg-card/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-text-main sm:text-5xl">
            Newspaper
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Latest news and articles from the campus. Read, comment, and stay updated.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="space-y-8">
          {posts.map((article) => (
            <article
              key={article.id}
              className="overflow-hidden rounded-2xl border border-accent-secondary/20 bg-bg-card transition-colors hover:border-accent-primary/40"
            >
              <Link href={`/newspaper/${article.slug}`} className="flex flex-col sm:flex-row">
                <div className="h-48 w-full shrink-0 bg-bg-main sm:h-56 sm:w-72">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.imageUrl ?? ""}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6">
                  <h2 className="text-xl font-semibold text-text-main">{article.title}</h2>
                  <p className="mt-2 line-clamp-2 text-text-secondary">{article.excerpt}</p>
                  <p className="mt-3 flex items-center gap-3 text-xs text-text-secondary">
                    <span>{article.author?.name ?? "Editorial"}</span>
                    <span>·</span>
                    <time dateTime={article.publishedAt!.toISOString()}>
                      {article.publishedAt!.toLocaleDateString()}
                    </time>
                    {article._count.comments > 0 && (
                      <>
                        <span>·</span>
                        <span>{article._count.comments} comment{article._count.comments !== 1 ? "s" : ""}</span>
                      </>
                    )}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-accent-primary">
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="rounded-2xl border border-accent-secondary/20 bg-bg-card py-16 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-text-secondary" />
            <p className="mt-4 text-text-secondary">No articles yet. Check back soon.</p>
          </div>
        )}
      </section>
    </div>
  );
}
