import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SUPER_ADMIN_EMAIL = "priyanshugour1@gmail.com";
const CLUB_ADMIN_EMAIL = "devanshugour74@gmail.com";

const EVENTS = [
  {
    title: "Tech Fest 2025",
    slug: "tech-fest-2025",
    description: "Annual technical festival with coding competitions, workshops, and guest talks from industry leaders. Join us for hackathons, CTF, and keynote sessions.",
    shortDescription: "Annual tech festival with competitions and workshops.",
    date: new Date("2025-04-15T09:00:00Z"),
    endDate: new Date("2025-04-17T18:00:00Z"),
    venue: "Main Auditorium & Labs",
    imageUrl: "https://picsum.photos/seed/evt1/800/400",
    pdfUrl: "/pdfs/tech-fest-2025.pdf",
    tags: ["tech", "fest", "workshop", "coding"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Cultural Night",
    slug: "cultural-night",
    description: "An evening of music, dance, and drama showcasing the diverse culture of our college. Performances from all departments.",
    shortDescription: "Music, dance and drama night.",
    date: new Date("2025-03-22T18:00:00Z"),
    venue: "Open Amphitheatre",
    imageUrl: "https://picsum.photos/seed/evt2/800/400",
    tags: ["cultural", "music", "dance", "drama"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Career Fair",
    slug: "career-fair",
    description: "Connect with top recruiters and attend sessions on resume building and interview skills. Over 50 companies expected.",
    shortDescription: "Meet recruiters and boost your career.",
    date: new Date("2025-05-10T10:00:00Z"),
    venue: "Convention Hall",
    imageUrl: "https://picsum.photos/seed/evt3/800/400",
    pdfUrl: "/pdfs/career-fair-brochure.pdf",
    tags: ["career", "placement", "recruitment"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Startup Workshop",
    slug: "startup-workshop",
    description: "Learn the basics of building a startup from industry experts. Ideation, validation, and pitching.",
    shortDescription: "Hands-on startup and pitching workshop.",
    date: new Date("2025-06-01T10:00:00Z"),
    endDate: new Date("2025-06-02T17:00:00Z"),
    venue: "Innovation Lab",
    imageUrl: "https://picsum.photos/seed/evt4/800/400",
    tags: ["startup", "workshop", "entrepreneurship"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Sports Day",
    slug: "sports-day",
    description: "Annual inter-department sports meet. Cricket, football, basketball, athletics, and more.",
    shortDescription: "Inter-department sports meet.",
    date: new Date("2025-04-25T08:00:00Z"),
    venue: "College Grounds",
    imageUrl: "https://picsum.photos/seed/evt5/800/400",
    tags: ["sports", "athletics", "cricket", "football"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Alumni Meet",
    slug: "alumni-meet",
    description: "Annual alumni reunion. Network with graduates and share experiences. Dinner and awards.",
    shortDescription: "Reunion and networking with alumni.",
    date: new Date("2025-07-12T17:00:00Z"),
    venue: "Grand Hall",
    imageUrl: "https://picsum.photos/seed/evt6/800/400",
    tags: ["alumni", "networking", "reunion"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Robotics Workshop",
    slug: "robotics-workshop",
    description: "Two-day hands-on workshop on robotics and automation. Build a simple robot from scratch.",
    shortDescription: "Hands-on robotics and automation.",
    date: new Date("2025-05-20T09:00:00Z"),
    endDate: new Date("2025-05-21T16:00:00Z"),
    venue: "ECE Lab Block",
    imageUrl: "https://picsum.photos/seed/evt7/800/400",
    tags: ["robotics", "workshop", "tech"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Literary Fest",
    slug: "literary-fest",
    description: "Poetry, debate, creative writing, and quiz. Celebrating words and ideas.",
    shortDescription: "Poetry, debate, and creative writing.",
    date: new Date("2025-06-15T10:00:00Z"),
    venue: "Central Library & Auditorium",
    imageUrl: "https://picsum.photos/seed/evt8/800/400",
    tags: ["literary", "debate", "poetry", "quiz"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Placement Prep Bootcamp",
    slug: "placement-prep-bootcamp",
    description: "Intensive 5-day bootcamp on aptitude, coding, and interview skills. Mock interviews included.",
    shortDescription: "Aptitude, coding, and interview prep.",
    date: new Date("2025-08-01T09:00:00Z"),
    endDate: new Date("2025-08-05T18:00:00Z"),
    venue: "Training Centre",
    imageUrl: "https://picsum.photos/seed/evt9/800/400",
    tags: ["placement", "career", "interview", "coding"],
    status: "PUBLISHED" as const,
  },
  {
    title: "Freshers Welcome",
    slug: "freshers-welcome",
    description: "Welcome event for new batch. Ice breakers, campus tour, and introduction to clubs.",
    shortDescription: "Welcome and orientation for freshers.",
    date: new Date("2025-09-01T14:00:00Z"),
    venue: "Main Auditorium",
    imageUrl: "https://picsum.photos/seed/evt10/800/400",
    tags: ["freshers", "welcome", "orientation"],
    status: "PUBLISHED" as const,
  },
];

const PARTICIPANT_NAMES = [
  "Rahul Verma", "Anita Singh", "Vikram Patel", "Priya Sharma", "Arjun Mehta",
  "Sneha Reddy", "Karan Joshi", "Neha Gupta", "Rohan Desai", "Pooja Nair",
  "Amit Kumar", "Divya Iyer", "Suresh Rao", "Kavita Menon", "Rajesh Pillai",
  "Meera Krishnan", "Aditya Saxena", "Lakshmi Venkat", "Sanjay Malhotra", "Anjali Bose",
  "Vivek Choudhury", "Shruti Agarwal", "Nitin Tiwari", "Preeti Singh", "Manoj Dubey",
];

const CONTACT_SUBMISSIONS = [
  { name: "Student Query", email: "query@example.com", subject: "Event registration help", message: "How do I register for Tech Fest? I could not find the link." },
  { name: "Parent", email: "parent@example.com", subject: "Fee structure", message: "Please share the fee structure for the new academic year." },
  { name: "Alumni", email: "alumni@example.com", subject: "Alumni meet 2025", message: "I would like to attend the alumni meet. Please send the registration form." },
  { name: "Partner College", email: "partner@college.edu", subject: "MoU and collaboration", message: "We are interested in signing an MoU for student exchange. Whom should we contact?" },
  { name: "Sponsor", email: "sponsor@company.com", subject: "Tech Fest sponsorship", message: "We would like to sponsor the tech fest. Please share the sponsorship brochure." },
  { name: "Media", email: "media@news.com", subject: "Press coverage", message: "Requesting press passes for the cultural night and tech fest." },
  { name: "Faculty", email: "faculty@college.edu", subject: "Lab access", message: "Request for extended lab access for final year project students." },
  { name: "Visitor", email: "visitor@gmail.com", subject: "Campus visit", message: "I want to visit the campus next week. Is there a guided tour available?" },
  { name: "Startup", email: "founder@startup.io", subject: "Incubation program", message: "We are a student startup looking for incubation support." },
  { name: "Recruiter", email: "hr@company.com", subject: "Placement drive", message: "We would like to conduct a placement drive in October. Please share the calendar." },
];

async function main() {
  console.log("Seeding users (Super Admin & Club Admin)...");
  const superAdmin = await prisma.user.upsert({
    where: { email: SUPER_ADMIN_EMAIL },
    create: { email: SUPER_ADMIN_EMAIL, name: "Priyanshu Gour", role: "SUPER_ADMIN" },
    update: { role: "SUPER_ADMIN", name: "Priyanshu Gour" },
  });
  const clubAdmin = await prisma.user.upsert({
    where: { email: CLUB_ADMIN_EMAIL },
    create: { email: CLUB_ADMIN_EMAIL, name: "Devanshu Gour", role: "CLUB_ADMIN" },
    update: { role: "CLUB_ADMIN", name: "Devanshu Gour" },
  });
  console.log("Super Admin:", superAdmin.email);
  console.log("Club Admin:", clubAdmin.email);

  console.log("Seeding events...");
  for (const e of EVENTS) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      create: { ...e, createdById: superAdmin.id },
      update: {},
    });
  }

  const events = await prisma.event.findMany({ select: { id: true, slug: true } });
  console.log("Seeding participants...");
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const count = 3 + (i % 8);
    for (let j = 0; j < count && j < PARTICIPANT_NAMES.length; j++) {
      const name = PARTICIPANT_NAMES[(i + j) % PARTICIPANT_NAMES.length];
      const email = `p-${event.slug}-${j}@example.com`;
      await prisma.eventParticipant.upsert({
        where: { eventId_email: { eventId: event.id, email } },
        create: {
          eventId: event.id,
          name,
          email,
          rollNo: `CS${1000 + i * 10 + j}`,
          registeredAt: new Date(Date.now() - (i + j) * 86400000),
        },
        update: {},
      });
    }
  }

  console.log("Seeding contact submissions...");
  for (let i = 0; i < CONTACT_SUBMISSIONS.length; i++) {
    const c = CONTACT_SUBMISSIONS[i];
    await prisma.contactSubmission.create({
      data: {
        ...c,
        createdAt: new Date(Date.now() - (CONTACT_SUBMISSIONS.length - i) * 3600000),
      },
    });
  }

  console.log("Seeding news posts...");
  const NEWS_POSTS = [
    { title: "College Annual Day Highlights", slug: "annual-day-highlights", excerpt: "A look back at the most memorable moments from this year's annual day.", content: "The annual day was a grand success with performances from all departments. We celebrated achievements in academics, sports, and culture. Thanks to everyone who made it possible.", imageUrl: "https://picsum.photos/seed/np1/800/400", publishedAt: new Date("2025-02-01") },
    { title: "New Lab Facilities Inaugurated", slug: "new-lab-facilities", excerpt: "State-of-the-art labs opened for CSE and IT students.", content: "The new lab block includes dedicated spaces for AI, IoT, and cloud computing. Students can now access the latest tools and infrastructure for projects and research.", imageUrl: "https://picsum.photos/seed/np2/800/400", publishedAt: new Date("2025-01-15") },
    { title: "Placement Season Round-Up", slug: "placement-round-up", excerpt: "Record placements this year with top companies visiting campus.", content: "Over 90% of eligible students received offers in the ongoing placement drive. We thank the CDC and all recruiters for their support.", imageUrl: "https://picsum.photos/seed/np3/800/400", publishedAt: new Date("2025-01-10") },
  ];
  for (const p of NEWS_POSTS) {
    await prisma.newsPost.upsert({
      where: { slug: p.slug },
      create: { ...p, authorId: superAdmin.id },
      update: {},
    });
  }

  console.log("Seeding sample likes and comments...");
  const techFest = await prisma.event.findFirst({ where: { slug: "tech-fest-2025" } });
  if (techFest) {
    await prisma.eventLike.upsert({
      where: { eventId_userId: { eventId: techFest.id, userId: superAdmin.id } },
      create: { eventId: techFest.id, userId: superAdmin.id, type: "LIKE" },
      update: {},
    });
    await prisma.eventLike.upsert({
      where: { eventId_userId: { eventId: techFest.id, userId: clubAdmin.id } },
      create: { eventId: techFest.id, userId: clubAdmin.id, type: "LIKE" },
      update: {},
    });
    await prisma.comment.createMany({
      data: [
        { eventId: techFest.id, userId: superAdmin.id, content: "Looking forward to this! Great initiative." },
        { eventId: techFest.id, userId: clubAdmin.id, content: "Please register early. Limited seats for workshops." },
      ],
      skipDuplicates: true,
    });
  }

  console.log("Seed done. Events:", EVENTS.length, "| Participants seeded per event | Contacts:", CONTACT_SUBMISSIONS.length);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
