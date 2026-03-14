import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { roleLabel } from "@/lib/rbac";
import {
  Users,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Newspaper,
  Activity,
  TrendingUp,
  LogIn,
  Image as ImageIcon,
} from "lucide-react";
import { SessionActivityList } from "./SessionActivityList";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin?callbackUrl=/dashboard");

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });
  if (!user) redirect("/auth/signin?callbackUrl=/dashboard");

  const [
    totalUsers,
    totalEvents,
    publishedEvents,
    totalLikes,
    totalDislikes,
    totalComments,
    totalNewsPosts,
    sessionCount,
    recentSessions,
    myActivities,
    usersWithMultipleSessions,
    eventLikesBreakdown,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.event.count({ where: { status: "PUBLISHED" } }),
    prisma.eventLike.count({ where: { type: "LIKE" } }),
    prisma.eventLike.count({ where: { type: "DISLIKE" } }),
    prisma.comment.count(),
    prisma.newsPost.count({ where: { publishedAt: { not: null } } }),
    prisma.sessionActivity.count(),
    prisma.sessionActivity.findMany({
      orderBy: { loggedInAt: "desc" },
      take: 8,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.sessionActivity.findMany({
      where: { userId: user.id },
      orderBy: { lastActivityAt: "desc" },
      take: 10,
    }),
    prisma.user.findMany({
      where: {
        sessionActivity: {
          some: {},
        },
      },
      include: {
        _count: { select: { sessionActivity: true } },
      },
    }).then((users) => users.filter((u) => u._count.sessionActivity > 1)),
    prisma.event.findMany({
      where: { status: "PUBLISHED" },
      include: { _count: { select: { likes: true } } },
      orderBy: { date: "desc" },
      take: 5,
    }),
  ]);

  const totalEngagement = totalLikes + totalDislikes + totalComments;
  const likeRatio = totalLikes + totalDislikes > 0 ? (totalLikes / (totalLikes + totalDislikes)) * 100 : 0;

  const stats = [
    { label: "Total users", value: totalUsers, icon: Users, href: "#" },
    { label: "Published events", value: publishedEvents, icon: Calendar, href: "/dashboard/events" },
    { label: "Session logins", value: sessionCount, icon: LogIn, href: "#" },
    { label: "News articles", value: totalNewsPosts, icon: Newspaper, href: "/dashboard/newspaper" },
    { label: "Total comments", value: totalComments, icon: MessageCircle, href: "#" },
    { label: "Total engagement", value: totalEngagement, icon: Activity, href: "#" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Dashboard</h1>
        <p className="mt-1 text-text-secondary">
          Overview of platform stats, sessions, and engagement.
        </p>
      </div>

      {/* Current user card */}
      <section className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
        <h2 className="text-lg font-semibold text-text-main">Logged in as</h2>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <span className="font-medium text-accent-primary">{user.name ?? user.email}</span>
          <span className="text-sm text-text-secondary">{user.email}</span>
          <span className="rounded-full bg-accent-primary/20 px-3 py-1 text-xs font-medium text-accent-primary">
            {roleLabel(user.role)}
          </span>
        </div>
      </section>

      {/* Stat cards */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-text-main">Platform stats</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-4 rounded-xl border border-accent-secondary/20 bg-bg-card p-5 transition-colors hover:border-accent-primary/40"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/20 text-accent-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-text-main">{value}</p>
                <p className="text-sm text-text-secondary">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Likes vs Dislikes bar chart */}
      <section className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
          <TrendingUp className="h-5 w-5 text-accent-primary" />
          Event engagement (likes vs dislikes)
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {totalLikes} likes · {totalDislikes} dislikes
        </p>
        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Likes</span>
              <span>{totalLikes}</span>
            </div>
            <div className="mt-1 h-4 overflow-hidden rounded-full bg-bg-main">
              <div
                className="h-full rounded-full bg-accent-primary transition-all duration-500"
                style={{ width: `${likeRatio}%` }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Dislikes</span>
              <span>{totalDislikes}</span>
            </div>
            <div className="mt-1 h-4 overflow-hidden rounded-full bg-bg-main">
              <div
                className="h-full rounded-full bg-red-500/60 transition-all duration-500"
                style={{ width: `${100 - likeRatio}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two columns: Recent logins + Multiple sessions */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
            <LogIn className="h-5 w-5 text-accent-primary" />
            Recent logins
          </h2>
          <p className="mt-1 text-sm text-text-secondary">Latest session activity across the platform.</p>
          <ul className="mt-4 space-y-2">
            {recentSessions.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-lg border border-accent-secondary/10 bg-bg-main/50 px-4 py-2 text-sm"
              >
                <span className="text-text-main">{s.user.name ?? s.user.email ?? "—"}</span>
                <span className="text-text-secondary">
                  {new Date(s.loggedInAt).toLocaleDateString()} {new Date(s.loggedInAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </li>
            ))}
          </ul>
          {recentSessions.length === 0 && (
            <p className="mt-4 text-sm text-text-secondary">No recent sessions.</p>
          )}
        </section>

        <section className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
            <Users className="h-5 w-5 text-accent-primary" />
            Users with multiple sessions
          </h2>
          <p className="mt-1 text-sm text-text-secondary">Users who have logged in more than once.</p>
          <ul className="mt-4 space-y-2">
            {usersWithMultipleSessions.slice(0, 6).map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between rounded-lg border border-accent-secondary/10 bg-bg-main/50 px-4 py-2 text-sm"
              >
                <span className="text-text-main">{u.name ?? u.email ?? "—"}</span>
                <span className="rounded-full bg-accent-primary/20 px-2 py-0.5 text-xs font-medium text-accent-primary">
                  {u._count.sessionActivity} sessions
                </span>
              </li>
            ))}
          </ul>
          {usersWithMultipleSessions.length === 0 && (
            <p className="mt-4 text-sm text-text-secondary">No users with multiple sessions yet.</p>
          )}
        </section>
      </div>

      {/* Top events by likes */}
      <section className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-text-main">
          <ThumbsUp className="h-5 w-5 text-accent-primary" />
          Top events by likes
        </h2>
        <p className="mt-1 text-sm text-text-secondary">Most liked published events.</p>
        <div className="mt-4 space-y-3">
          {eventLikesBreakdown.map((evt) => {
            const maxLikes = Math.max(...eventLikesBreakdown.map((e) => e._count.likes), 1);
            const pct = (evt._count.likes / maxLikes) * 100;
            return (
              <div key={evt.id}>
                <div className="flex justify-between text-sm">
                  <Link href={`/events/${evt.slug}`} className="font-medium text-text-main hover:text-accent-primary">
                    {evt.title}
                  </Link>
                  <span className="text-text-secondary">{evt._count.likes} likes</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-main">
                  <div
                    className="h-full rounded-full bg-accent-primary/80 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {eventLikesBreakdown.length === 0 && (
          <p className="mt-4 text-sm text-text-secondary">No event likes yet.</p>
        )}
      </section>

      {/* Your session activity */}
      <SessionActivityList activities={myActivities} />

      {/* Quick links */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/dashboard/events"
          className="flex items-center gap-4 rounded-xl border border-accent-secondary/20 bg-bg-card p-4 transition-colors hover:border-accent-primary/40"
        >
          <Calendar className="h-8 w-8 text-accent-primary" />
          <span className="font-medium text-text-main">Events</span>
        </Link>
        <Link
          href="/dashboard/newspaper"
          className="flex items-center gap-4 rounded-xl border border-accent-secondary/20 bg-bg-card p-4 transition-colors hover:border-accent-primary/40"
        >
          <Newspaper className="h-8 w-8 text-accent-primary" />
          <span className="font-medium text-text-main">Newspaper</span>
        </Link>
        <Link
          href="/dashboard/gallery"
          className="flex items-center gap-4 rounded-xl border border-accent-secondary/20 bg-bg-card p-4 transition-colors hover:border-accent-primary/40"
        >
          <ImageIcon className="h-8 w-8 text-accent-primary" />
          <span className="font-medium text-text-main">Gallery</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-4 rounded-xl border border-accent-secondary/20 bg-bg-card p-4 transition-colors hover:border-accent-primary/40"
        >
          <Activity className="h-8 w-8 text-accent-primary" />
          <span className="font-medium text-text-main">Settings</span>
        </Link>
      </section>
    </div>
  );
}
