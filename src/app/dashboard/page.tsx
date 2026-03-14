import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { roleLabel } from "@/lib/rbac";
import { SessionActivityList } from "./SessionActivityList";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/signin?callbackUrl=/dashboard");

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });
  if (!user) redirect("/auth/signin?callbackUrl=/dashboard");

  const activities = await prisma.sessionActivity.findMany({
    where: { userId: user.id },
    orderBy: { lastActivityAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main">Dashboard</h1>
      <p className="mt-2 text-text-secondary">
        Manage events and view participants.
      </p>

      <section className="mt-8 rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
        <h2 className="text-lg font-semibold text-text-main">Logged in as</h2>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span className="font-medium text-accent-primary">{user.name ?? user.email}</span>
          <span className="text-sm text-text-secondary">{user.email}</span>
          <span className="rounded-full bg-accent-primary/20 px-3 py-1 text-xs font-medium text-accent-primary">
            {roleLabel(user.role)}
          </span>
        </div>
      </section>

      <SessionActivityList activities={activities} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/events"
          className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6 transition-colors hover:border-accent-primary/40"
        >
          <h2 className="font-semibold text-text-main">Events</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Add events and see participant lists.
          </p>
        </Link>
      </div>
    </div>
  );
}
