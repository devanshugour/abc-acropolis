import Link from "next/link";
import {
  Calendar,
  Image as ImageIcon,
  Newspaper,
  Users,
  Trophy,
  PartyPopper,
  Mic2,
  Code2,
  Heart,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const [featuredEvents, eventsCount, publishedEvents] = await Promise.all([
    prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "asc" },
      take: 3,
    }),
    prisma.event.count({ where: { status: "PUBLISHED" } }),
    prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { date: "desc" },
      take: 6,
    }),
  ]);

  const stats = [
    { label: "Events organised", value: eventsCount, icon: Calendar },
    { label: "Active members", value: "500+", icon: Users },
    { label: "Campus activities", value: "50+", icon: Sparkles },
  ];

  const activities = [
    {
      title: "Tech fests & hackathons",
      description: "Code, build, and compete. From workshops to 24-hour hackathons.",
      icon: Code2,
      href: "/events",
    },
    {
      title: "Cultural & sports",
      description: "Annual days, sports meets, dance, music, and cultural nights.",
      icon: PartyPopper,
      href: "/events",
    },
    {
      title: "Seminars & talks",
      description: "Industry experts, alumni, and faculty share insights and career guidance.",
      icon: Mic2,
      href: "/events",
    },
    {
      title: "Placements & CDC",
      description: "Career Development Cell drives internships, CV prep, and placement support.",
      icon: GraduationCap,
      href: "/about",
    },
    {
      title: "Clubs & cells",
      description: "NSS, E-Cell, Women Cell, Sports, Yavnika Hobby Club, and more.",
      icon: Heart,
      href: "/about",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-pad-lg relative border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container">
          <div className="text-center">
            <h1 className="hero-title">
              Welcome to <span className="text-accent-primary">ABC Acropolis</span>
            </h1>
            <p className="section-subtitle mx-auto mt-6 max-w-2xl">
              Your college cloud — one place for events, news, gallery, and community. 
              Discover, register, and participate in everything that shapes campus life.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/events" className="btn-primary">
                View events
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/join-club" className="btn-secondary">
                Join the club
                <Users className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="card flex flex-col items-center py-8 text-center"
              >
                <Icon className="h-10 w-10 text-accent-primary" />
                <p className="mt-3 text-3xl font-bold text-text-main">{value}</p>
                <p className="mt-1 text-sm text-text-secondary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do / Activities */}
      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <h2 className="section-title text-center">What we do</h2>
          <p className="section-subtitle mx-auto mt-4 max-w-2xl text-center">
            From tech fests to cultural nights, placements to clubs — we bring the campus together.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map(({ title, description, icon: Icon, href }) => (
              <Link
                key={title}
                href={href}
                className="card group flex flex-col p-6"
              >
                <Icon className="h-10 w-10 text-accent-primary" />
                <h3 className="mt-4 font-semibold text-text-main group-hover:text-accent-primary">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-text-secondary">
                  {description}
                </p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-accent-primary">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <h2 className="section-title text-center">Explore</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/events"
              className="card flex flex-col items-center p-8"
            >
              <Calendar className="h-12 w-12 text-accent-primary" />
              <h3 className="mt-4 font-semibold text-text-main">Events</h3>
              <p className="mt-1 text-center text-sm text-text-secondary">
                Upcoming events and registrations
              </p>
            </Link>
            <Link
              href="/gallery"
              className="card flex flex-col items-center p-8"
            >
              <ImageIcon className="h-12 w-12 text-accent-primary" />
              <h3 className="mt-4 font-semibold text-text-main">Gallery</h3>
              <p className="mt-1 text-center text-sm text-text-secondary">
                Photos from campus and events
              </p>
            </Link>
            <Link
              href="/newspaper"
              className="card flex flex-col items-center p-8"
            >
              <Newspaper className="h-12 w-12 text-accent-primary" />
              <h3 className="mt-4 font-semibold text-text-main">Newspaper</h3>
              <p className="mt-1 text-center text-sm text-text-secondary">
                Latest news and articles
              </p>
            </Link>
            <Link
              href="/team"
              className="card flex flex-col items-center p-8"
            >
              <Users className="h-12 w-12 text-accent-primary" />
              <h3 className="mt-4 font-semibold text-text-main">Team</h3>
              <p className="mt-1 text-center text-sm text-text-secondary">
                Meet our team
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="section-title">Upcoming events</h2>
              <p className="section-subtitle mt-2">
                Register and be part of the next big thing on campus.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-accent-primary/50 px-5 py-2.5 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary/10"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((evt) => (
              <Link
                key={evt.id}
                href={`/events/${evt.slug}`}
                className="card group overflow-hidden"
              >
                <div className="aspect-video w-full bg-bg-main">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evt.imageUrl ?? ""}
                    alt={evt.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text-main">{evt.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                    {evt.shortDescription}
                  </p>
                  <p className="mt-2 text-xs text-accent-primary">
                    {evt.venue} · {evt.date.toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {featuredEvents.length === 0 && (
            <p className="mt-6 text-center text-text-secondary">
              No upcoming events right now. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* Past events / Winners */}
      {publishedEvents.length > 0 && (
        <section className="section-pad border-b border-accent-secondary/10">
          <div className="page-container">
            <h2 className="section-title">Recent events</h2>
            <p className="mt-2 text-text-secondary">
              Look back at completed events, participants, and highlights.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {publishedEvents.slice(0, 6).map((evt) => (
                <Link
                  key={evt.id}
                  href={`/events/${evt.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-accent-secondary/20 bg-bg-card px-4 py-3 text-sm font-medium text-text-main transition-colors hover:border-accent-primary/40"
                >
                  <Trophy className="h-4 w-4 text-accent-primary" />
                  {evt.title}
                </Link>
              ))}
            </div>
            <Link
              href="/events"
              className="mt-6 inline-block text-sm font-medium text-accent-primary hover:text-accent-light"
            >
              See all events →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-pad-lg">
        <div className="page-container">
          <div className="card rounded-2xl px-6 py-16 text-center sm:px-12">
            <h2 className="section-title sm:text-3xl">Ready to get involved?</h2>
            <p className="section-subtitle mx-auto mt-4 max-w-xl">
              Join the club, volunteer for events, or stay in the loop with news and gallery updates.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/join-club" className="btn-primary">Join Club</Link>
              <Link href="/contact" className="btn-secondary">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
