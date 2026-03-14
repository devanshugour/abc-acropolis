import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SessionActivityTracker } from "@/components/SessionActivityTracker";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ABC Acropolis — Your College Cloud",
  description: "Events, gallery, newspaper, and community for ABC Acropolis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <SessionActivityTracker />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
