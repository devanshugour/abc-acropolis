import { TEAM_DATA } from "@/data/team";

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <section className="section-pad border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container">
          <h1 className="hero-title">Our Team</h1>
          <p className="section-subtitle mt-4">Meet the people behind ABC Acropolis.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="page-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_DATA.map((member) => (
              <div key={member.id} className="card overflow-hidden">
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
      </section>
    </div>
  );
}
