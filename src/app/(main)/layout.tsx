import { Header, Footer } from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main text-text-main">
      <div className="pointer-events-none fixed inset-0 h-full bg-gradient-to-b from-bg-gradient/15 via-transparent to-transparent" aria-hidden />
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
