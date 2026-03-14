import { Header, Footer } from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main text-text-main">
      <div className="pointer-events-none absolute inset-0 h-1/2 bg-bg-gradient/20" aria-hidden />
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
