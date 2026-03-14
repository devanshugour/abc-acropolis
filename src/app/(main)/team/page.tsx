import { TEAM_DATA } from "@/data/team";

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-text-main">Our Team</h1>
      <p className="mt-4 text-lg text-text-secondary">
        Meet the people behind ABC Acropolis.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_DATA.map((member) => (
          <div
            key={member.id}
            className="overflow-hidden rounded-2xl border border-accent-secondary/20 bg-bg-card"
          >
            <div className="relative aspect-square w-full bg-bg-main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.imageUrl}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text-main">{member.name}</h3>
              <p className="text-sm text-accent-primary">{member.role}</p>
              {member.bio && (
                <p className="mt-2 text-sm text-text-secondary">{member.bio}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
