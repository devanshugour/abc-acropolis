import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ParticipantsPage({ params }: PageProps) {
  const { id } = await params;
  const event = await prisma.event.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: {
      participants: { orderBy: { registeredAt: "desc" } },
    },
  });
  if (!event) notFound();
  const participants = event.participants;

  return (
    <div>
      <Link href="/dashboard/events" className="text-sm text-accent-primary hover:text-accent-light">
        ← Back to Events
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-text-main">{event.title}</h1>
      <p className="mt-2 text-text-secondary">Participants ({participants.length})</p>
      <ul className="mt-6 space-y-2">
        {participants.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded-lg border border-accent-secondary/20 bg-bg-card px-4 py-3"
          >
            <div>
              <span className="font-medium text-text-main">{p.name}</span>
              <span className="ml-2 text-sm text-text-secondary">{p.email}</span>
            </div>
            {p.rollNo && (
              <span className="text-sm text-text-secondary">{p.rollNo}</span>
            )}
          </li>
        ))}
      </ul>
      {participants.length === 0 && (
        <p className="mt-6 text-text-secondary">No participants yet.</p>
      )}
    </div>
  );
}
