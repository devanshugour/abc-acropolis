import Link from "next/link";
import {
  GraduationCap,
  Users,
  Target,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="section-pad-lg border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container">
          <h1 className="hero-title">
            About <span className="text-accent-primary">ABC Acropolis</span>
          </h1>
          <p className="section-subtitle mt-6 max-w-2xl">
            Your college cloud — a single place for events, news, gallery, and community. 
            We bring together students, faculty, and clubs under one platform.
          </p>
        </div>
      </section>

      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-8">
              <Target className="h-10 w-10 text-accent-primary" />
              <h2 className="mt-4 text-xl font-semibold text-text-main">Our mission</h2>
              <p className="mt-3 text-text-secondary">
                To connect every student with opportunities, information, and the wider college 
                community through one reliable, easy-to-use platform. We enable discovery, 
                participation, and growth — from tech fests to cultural nights, placements to clubs.
              </p>
            </div>
            <div className="card p-8">
              <BookOpen className="h-10 w-10 text-accent-primary" />
              <h2 className="mt-4 text-xl font-semibold text-text-main">Our vision</h2>
              <p className="mt-3 text-text-secondary">
                A campus where every student can find their place — whether through events, 
                news, gallery, or community. ABC Acropolis is the digital heartbeat of college life, 
                aligned with the Acropolis Group of Institutions&apos; commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <h2 className="section-title">Part of Acropolis Group of Institutions</h2>
          <p className="section-subtitle mt-4 max-w-3xl">
            Acropolis Group of Institutions is dedicated to fostering excellence across engineering, 
            management, pharmacy, and computer applications. With a comprehensive range of institutes 
            and a strong focus on quality education, the group empowers students for a successful future.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card rounded-xl p-6">
              <GraduationCap className="h-8 w-8 text-accent-primary" />
              <h3 className="mt-3 font-semibold text-text-main">Education</h3>
              <p className="mt-1 text-sm text-text-secondary">
                Exceptional courses in engineering, management, pharmacy, and computer applications.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <Users className="h-8 w-8 text-accent-primary" />
              <h3 className="mt-3 font-semibold text-text-main">Clubs & cells</h3>
              <p className="mt-1 text-sm text-text-secondary">
                NSS, Yavnika Hobby Club, Women Cell, Sports and Cultural, E-Cell, Acrocare, IIPC.
              </p>
            </div>
            <div className="card rounded-xl p-6">
              <Award className="h-8 w-8 text-accent-primary" />
              <h3 className="mt-3 font-semibold text-text-main">Career development</h3>
              <p className="mt-1 text-sm text-text-secondary">
                CDC programs on employability, entrepreneurship, CV prep, internships, and placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-accent-secondary/10">
        <div className="page-container">
          <h2 className="section-title">What we offer on ABC Acropolis</h2>
          <ul className="mt-8 space-y-4 text-text-secondary">
            <li className="flex gap-3">
              <span className="text-accent-primary">·</span>
              <span>Events — discover, register, and participate in fests, workshops, seminars, and cultural events.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-primary">·</span>
              <span>Newspaper — stay updated with campus news, articles, and announcements.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-primary">·</span>
              <span>Gallery — relive moments from campus and events through photos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-primary">·</span>
              <span>Team — meet the people behind the club and the platform.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-primary">·</span>
              <span>Join club — become a member, volunteer, and shape campus life.</span>
            </li>
          </ul>
          <div className="mt-10">
            <Link href="/events" className="btn-secondary">
              Explore events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-container">
          <h2 className="section-title">Get in touch</h2>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-10">
            <div className="flex items-start gap-3 text-text-secondary">
              <MapPin className="h-5 w-5 shrink-0 text-accent-primary" />
              <div>
                <p className="font-medium text-text-main">Campus</p>
                <p className="mt-1 text-sm">
                  Acropolis Group of Institutions, Bypass Road, Manglia Square, Manglia, 
                  Indore, Madhya Pradesh — 453771, India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-text-secondary">
              <Mail className="h-5 w-5 shrink-0 text-accent-primary" />
              <div>
                <p className="font-medium text-text-main">Email</p>
                <a href="mailto:info@acropolis.in" className="mt-1 block text-sm text-accent-primary hover:text-accent-light">
                  info@acropolis.in
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 text-text-secondary">
              <Phone className="h-5 w-5 shrink-0 text-accent-primary" />
              <div>
                <p className="font-medium text-text-main">Phone</p>
                <p className="mt-1 text-sm">0731-4730000 / 4730001</p>
              </div>
            </div>
          </div>
          <Link href="/contact" className="btn-primary mt-8">
            Contact form
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
